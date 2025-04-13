package com.planning.poker.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.planning.poker.backend.Controllers.RoomController;
import com.planning.poker.backend.Controllers.UserController;
import com.planning.poker.backend.entities.User;
import com.planning.poker.backend.entities.Room;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class PokerWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<Room> rooms = RoomController.getRooms(); // Rooms list from RoomController

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
            case "vote":
                handleVote(session, data);
                break;
            default:
                System.out.println("Unknown action: " + action);
        }
    }

    private void handleJoinRoom(WebSocketSession session, Map<String, String> data) throws IOException {
        String userID = data.get("userID");
        String roomID = data.get("roomID");
        System.out.println(roomID);

        // Get room and user objects from RoomController and UserController
        Room room = RoomController.getRoomById(roomID);
        User user = UserController.getUserById(userID);
        System.out.println(room.getRoomID() + user.userID.toString());

        // Add the user to the room
        if (room != null) {
            room.addUser(user, session);  // Adds user to room and associates WebSocket session
            room.getUserSessions().put(user, session); // Store the WebSocket session by userID
            System.out.println(userID + " joined room " + roomID);
            System.out.println(userID + " has Session " + session);
        } else {
            System.out.println("Invalid roomID or userID for joining.");
        }
    }

    private void handlePing(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomID = data.get("roomID");
        String userName = data.get("userName");
        String roomName = data.get("roomName");
        String userID = data.get("userID");

        Map<String,String> response = Map.of("action", "ping", "users", RoomController.getRoomById(roomID).toString());
        System.out.println(response);
        broadcastToRoom(roomID, response);
    }

    private void handleVote(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomID = data.get("roomID");
        String userID = data.get("userID");
        String vote = data.get("vote");

        // Process the vote (you can store it in a map or other data structure)
        broadcastToRoom(roomID, Map.of("action", "vote-update", "userID", userID, "vote", vote));
    }


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


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // This method is called when the WebSocket connection is established
        System.out.println("New WebSocket connection established: " + session.getId());
    }
}
