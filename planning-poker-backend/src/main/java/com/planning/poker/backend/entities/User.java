package com.planning.poker.backend.entities;

import java.util.UUID;

public class User {

    public UUID userID;
    public UUID roomID;
    public String userName;

    // Constructor where userName is optional
    public User(UUID userID, UUID roomID) {
        this(userID, roomID, null); // Default userName to null if not provided
    }

    // Constructor allowing userName to be set
    public User(UUID userID, UUID roomID, String userName) {
        this.userID = userID;
        this.roomID = roomID;
        this.userName = userName; // Can be null if not provided
    }
    public User(UUID userID, String userName) {
        this.userID = userID;
        this.roomID = null;
        this.userName = userName; // Can be null if not provided
    }
}
