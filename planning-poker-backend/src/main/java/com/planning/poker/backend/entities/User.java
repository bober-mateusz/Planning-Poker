package com.planning.poker.backend.entities;

import java.util.UUID;

public class User {

    public UUID userID;
//    public UUID roomID;
    public String userName;

    // Constructor where userName is optional
    public User(UUID userID) {
        this(userID, null); // Default userName to null if not provided
    }

    // Constructor allowing userName to be set
    public User(UUID userID, String userName) {
        this.userID = userID;
        this.userName = userName; // Can be null if not provided
    }
}
