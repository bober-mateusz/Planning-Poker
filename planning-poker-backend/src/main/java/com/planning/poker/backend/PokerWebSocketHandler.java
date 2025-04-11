package com.planning.poker.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class PokerWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final Map<String, Map<String, String>> votes = new ConcurrentHashMap<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
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
