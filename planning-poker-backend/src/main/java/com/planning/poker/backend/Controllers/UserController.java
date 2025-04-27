package com.planning.poker.backend.Controllers;

import com.planning.poker.backend.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
public class UserController {

    // Thread-safe list of users
    private static final List<User> users = new CopyOnWriteArrayList<>();

    public static User getUserById(String userID){
        return users.stream()
                .filter(user -> user.userID.toString().equals(userID))
                .findFirst()
                .orElse(null);
    }

    @GetMapping("/api/create-user")
    public User createUser(@RequestParam(required = false) String username) {
        UUID userID = UUID.randomUUID();

        String checkedUsername = username != null ? username : "User-" + userID.toString().substring(0, 5);
        System.out.println(checkedUsername);
        User user = new User(userID, checkedUsername);
        users.add(user);

        System.out.println("Created User: " + user.toString());
        return user;
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        List<User> result = new ArrayList<>();
        for (User user : users) {
            result.add(new User(user.userID, user.username
            ));
        }
        return result;
    }

    @GetMapping("/api/user")
    public ResponseEntity<?> getUser(@RequestParam String userID) {
        UUID userUUID = UUID.fromString(userID);

        for (User user : users) {
            if (user.userID.equals(userUUID)) {
                return ResponseEntity.ok(new User(user.userID, user.username));
            }
        }
//        throw new NoSuchElementException("User not found");
        return ResponseEntity.notFound().build();
    }
}
