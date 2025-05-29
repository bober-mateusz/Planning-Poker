package com.planning.poker.backend.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@Getter
@Setter
public class Room {

    private Map<User, WebSocketSession> userSessions;
    private Map<String, String> UserVotes;
    private String roomname;
    private final UUID roomID;
    private boolean isRevealed = false;

    // Constructor to initialize the room with an empty map
    public Room(UUID roomID, String roomname) {
        this.userSessions = new HashMap<>();
        this.roomID = roomID;
        this.roomname = roomname;
        this.UserVotes = new HashMap<>();
    }

    public String getRoomID() {
        return this.roomID.toString();
    }

    // Add a user and their WebSocket session to the room
    public void addUser(User user, WebSocketSession session) {
        userSessions.put(user, session);
    }

    public void addRoomName(String roomname){
        this.roomname = roomname;
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

    public void submitVote(String userID, String vote) {
        UserVotes.put(userID, vote);
    }
}
