package com.planning.poker.backend.entities;

import lombok.*;

import java.util.UUID;

@ToString
@Setter
@Getter
@EqualsAndHashCode
public class User {

    public UUID userID;
//    public UUID roomID;
    public String username;

    // Constructor where username is optional
    public User(UUID userID) {
        this(userID, null); // Default username to null if not provided
    }

    // Constructor allowing username to be set
    public User(UUID userID, String username) {
        this.userID = userID;
        this.username = username; // Can be null if not provided
    }
}
