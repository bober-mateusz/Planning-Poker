package com.planning.poker.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.planning.poker.backend.Controllers.RoomController;
import com.planning.poker.backend.Controllers.UserController;
import com.planning.poker.backend.entities.User;
import com.planning.poker.backend.entities.Room;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;

public class PokerWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<Room> rooms = RoomController.getRooms(); // Rooms list from RoomController

    /**
     * Handles incoming text messages from WebSocket clients.
     * This method processes different actions such as joining a room, voting, and pinging.
     *
     * @param session The WebSocket session of the client
     * @param message The incoming message from the client
     * @throws IOException If there is an error processing the message
     */
    @Override
    public void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws IOException {
        Map<String, String> data = objectMapper.readValue(message.getPayload(), Map.class);
        String action = data.get("action");

        switch (action) {
            case "ping":
                handlePing(session,data);
            case "join-room":
                handleJoinRoom(session, data);
                break;
            case "vote-submitted":
            case "vote-removed":
                handleVote(session, data);
                break;
            case "reveal-votes":
            case "hide-votes":
                handleVoteVisibility(session, data);
            case "get-room-state":
                handleGetRoomState(session, data);
                break;
            default:
                System.out.println("Unknown action: " + action);
        }
    }

    /**
     * Handles the action of a user joining a room.
     * This method retrieves the user and room information, adds the user to the room,
     * and broadcasts the updated list of users in the room.
     *
     * @param session The WebSocket session of the user who is joining
     * @param data    The data containing the user and room information
     * @throws IOException If there is an error sending the WebSocket message
     */
    private void handleJoinRoom(WebSocketSession session, Map<String, String> data) throws IOException {
        String userID = data.get("userID");
        String roomID = data.get("roomID");
        System.out.println(roomID);

        // Get room and user objects from RoomController and UserController
        Room room = RoomController.getRoomById(roomID);
        User user = UserController.getUserById(userID);
        System.out.println(room.getRoomID() + user.userID.toString());

        if (user != null && room != null) {
            if (room.getUserSessions().containsKey(user)) {
                room.updateUserSession(user, session);
                System.out.println("User " + userID + " already in room " + roomID + ", updating session.");
            }
        }
        // Add the user to the room
        if (room != null) {
            room.addUser(user, session);  // Adds user to room and associates WebSocket session
            room.getUserSessions().put(user, session); // Store the WebSocket session by userID
            System.out.println(userID + " joined room " + roomID);
            System.out.println(userID + " has Session " + session);
            broadcastUsersToRoom(roomID);
        } else {
            System.out.println("Invalid roomID or userID for joining.");
        }
    }

    /**
     * Handles the ping action from a user.
     * This method is used to check the connection status and broadcast the current users in the room.
     *
     * @param session The WebSocket session of the user who sent the ping
     * @param data    The data containing the room information
     * @throws IOException If there is an error sending the WebSocket message
     */
    private void handlePing(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomID = data.get("roomID");
        String username = data.get("username");
        String roomname = data.get("roomname");
        String userID = data.get("userID");

        Map<String,String> response = Map.of("action", "ping", "users", RoomController.getRoomById(roomID).toString());
        System.out.println(response);
        broadcastToRoom(roomID, response);
    }

    /**
     * Handles the voting action from a user.
     * This method processes the vote and broadcasts the updated vote status to all users in the room.
     *
     * @param session The WebSocket session of the user who voted
     * @param data    The data containing the vote information
     * @throws IOException If there is an error sending the WebSocket message
     */
    private void handleVote(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomID = data.get("roomID");
        String userID = data.get("userID");
        String action = data.get("action");

        Room room = RoomController.getRoomById(roomID);
        if (room == null) {
            System.out.println("Invalid roomID for voting.");
            return;
        }
        boolean userInRoom = room.getUserSessions().keySet().stream()
                .anyMatch(u -> u.getUserID().toString().equals(userID));

        if (!userInRoom) {
            System.out.println("User not found in room.");
            return;
        }

        if ("vote-submitted".equals(action)) {
            String vote = data.get("vote");
            room.submitVote(userID, vote);
        } else if ("vote-removed".equals(action)) {
            room.getUserVotes().remove(userID);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("action", "vote-submitted");
        response.put("votes", room.getUserVotes());

        broadcastToRoom(roomID, response);

    }
    /**
     * Handles the visibility state of votes in a room.
     * This method processes reveal/hide vote actions and broadcasts the updated visibility state to all users in the room.
     *
     * @param session The WebSocket session of the user who triggered the visibility change
     * @param data    The data containing the room information and visibility action
     * @throws IOException If there is an error sending the WebSocket message
     */
    private void handleVoteVisibility(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomID = data.get("roomID");
        String action = data.get("action");

        Room room = RoomController.getRoomById(roomID);
        if (room == null) {
            System.out.println("Invalid roomID for voting.");
            return;
        }

        if ("reveal-votes".equals(action)) {
            room.setRevealed(true);
        } else if ("hide-votes".equals(action)) {
            room.setRevealed(false);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("action", "visibility-updated");
        response.put("isRevealed", room.isRevealed());

        broadcastToRoom(roomID, response);

    }

    private void handleGetRoomState(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomID = data.get("roomID");
        Room room = RoomController.getRoomById(roomID);

        if (room != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("action", "room-state");
            response.put("users", room.getUserSessions().keySet());
            response.put("votes", room.getUserVotes());
            response.put("isRevealed", room.isRevealed());

            String jsonMessage = objectMapper.writeValueAsString(response);
            session.sendMessage(new TextMessage(jsonMessage));
        }
    }

    /**
     * Broadcasts a message to all users in a specific room.
     * This method is used to send updates or notifications to all participants in the room.
     *
     * @param roomID The unique identifier of the room to broadcast to
     * @param message The message to be sent, represented as a Map
     * @throws IOException If there is an error sending the WebSocket message
     */
    private void broadcastToRoom(String roomID, Map<String, ?> message) throws IOException {
        String jsonMessage = objectMapper.writeValueAsString(message);
        Room room = RoomController.getRoomById(roomID);
        if (room != null) {
            for (WebSocketSession session : room.getUserSessions().values()) {
                if (session != null && session.isOpen()) {
                    session.sendMessage(new TextMessage(jsonMessage));
                }
            }
        } else {
            System.out.println("Room not found for broadcasting: " + roomID);
        }
    }

    /**
     * Broadcasts an updated list of usernames to all connected clients in a specific room.
     * This method is called when users join or leave the room to keep all clients synchronized
     * with the current list of participants.
     *
     * @param roomID The unique identifier of the room to broadcast to
     * @throws IOException If there is an error sending the WebSocket message
     */
    private void broadcastUsersToRoom(String roomID) throws IOException {

        Room room = RoomController.getRoomById(roomID);

        if(room == null){
            System.out.println("Room not found for broadcasting: " + roomID);
            return;
        }

        Map<String, Object> message = new HashMap<>();
        message.put("action", "users-updated");
        message.put("users", room.getUserSessions().keySet());

        String jsonMessage = objectMapper.writeValueAsString(message);
        room.getUserSessions().values().forEach(session -> {
            try {
                session.sendMessage(new TextMessage(jsonMessage));
            } catch (IOException e) {
                System.out.println("Error sending socket message");
                throw new RuntimeException(e);
            }
        });
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // This method is called when the WebSocket connection is established
        System.out.println("New WebSocket connection established: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        for (Room room : rooms) {
            boolean removed = room.getUserSessions().values().removeIf(existingSession -> existingSession.equals(session));
            if(removed) {
                broadcastUsersToRoom(room.getRoomID());
            }
        }
        System.out.println("WebSocket connection closed: " + session.getId());
    }
}
