package com.planning.poker.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.planning.poker.backend.entities.User;
import com.planning.poker.backend.entities.Room;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class PokerWebSocketHandler extends TextWebSocketHandler {

    private static final Set<String> ALLOWED_ACTIONS = new HashSet<>();
    //For validating websocket call
    static {
        // Initialize the allowed actions
        ALLOWED_ACTIONS.add("create-room");
        ALLOWED_ACTIONS.add("join-room");
        ALLOWED_ACTIONS.add("vote");
        // Add more actions here as needed
    }
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final Map<String, Map<String, String>> votes = new ConcurrentHashMap<>();
    private final List<User> globalUserList = new CopyOnWriteArrayList<>();
    private final List<Room> globalRoomList = new CopyOnWriteArrayList<>()

    @Override
    public void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws IOException {
        Map<String, String> data = objectMapper.readValue(message.getPayload(), Map.class);

        String action = data.get("action");

        switch (action) {
            case "join-room":
                handleJoinRoom(session, data);
                break;
            case "vote":
                handleVote(session, data);
                break;
        }
    }

    private void handleJoinRoom(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomId = String.valueOf(data.get("roomId"));
        System.out.println(roomId + " joined");
        rooms.computeIfAbsent(roomId, k -> new HashSet<>()).add(session);
        sendRoomUpdate(roomId);
    }

    private void handleVote(WebSocketSession session, Map<String, String> data) throws IOException {
        String roomId = data.get("roomId");
        String userId = data.get("userId");
        String vote = data.get("vote");

        votes.computeIfAbsent(roomId, k -> new HashMap<>()).put(userId, vote);
        broadcastToRoom(roomId, Map.of("action", "vote-update", "votes", votes.get(roomId)));
    }

    private void sendRoomUpdate(String roomId) throws IOException {
        broadcastToRoom(roomId, Map.of("action", "update-room", "users", rooms.get(roomId).size()));
    }

    private void broadcastToRoom(String roomId, Map<String, ?> message) throws IOException {
        String jsonMessage = objectMapper.writeValueAsString(message);
        for (WebSocketSession session : rooms.getOrDefault(roomId, Collections.emptySet())) {
            session.sendMessage(new TextMessage(jsonMessage));
        }
    }
}
