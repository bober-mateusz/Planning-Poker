package com.planning.poker.backend.entities;

public class CreateRoomRequest {
    private String username;
    private String userID;
    private String roomName;

    // Getters and Setters
    public String getUserName() {
        return this.username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
