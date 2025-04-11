package com.planning.poker.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class UserController {

    private final Map<String, Map<String, String>> users = new ConcurrentHashMap<>();

    @GetMapping("/api/create-user")
    public Map<String, String> createUser() {
        String userId = UUID.randomUUID().toString();
        Map<String, String> userData = Map.of("userId", userId);
        users.put(userId, userData);
        return userData;
    }

    @GetMapping("/api/users")
    public Collection<Map<String, String>> getAllUsers() {
        return users.values();
    }
}
