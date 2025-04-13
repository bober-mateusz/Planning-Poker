package com.planning.poker.backend.entities;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Room {

    private Map<User, WebSocketSession> userSessions;
    private String roomName;
    private final UUID roomID;

    // Constructor to initialize the room with an empty map
    public Room(UUID roomID, String roomName) {
        this.userSessions = new HashMap<>();
        this.roomID = roomID;
        this.roomName = roomName;
    }
    public String getRoomID() {
        return this.roomID.toString();
    }

    // Add a user and their WebSocket session to the room
    public void addUser(User user, WebSocketSession session) {
        userSessions.put(user, session);
    }

    public void addRoomName(String roomName){
        this.roomName = roomName;
    }

    // Remove a user from the room
    public void removeUser(User user) {
        userSessions.remove(user);
    }

    // Get the WebSocket session for a specific user
    public WebSocketSession getSession(User user) {
        return userSessions.get(user);
    }

    // Get all the users in the room
    public Map<User, WebSocketSession> getUserSessions() {
        return userSessions;
    }

    // Optionally, get the size of the room
    public int getRoomSize() {
        return userSessions.size();
    }
}
