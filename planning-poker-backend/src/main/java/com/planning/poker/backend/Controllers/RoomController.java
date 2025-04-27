package com.planning.poker.backend.Controllers;

import com.planning.poker.backend.entities.CreateRoomRequest;
import com.planning.poker.backend.entities.Room;
import com.planning.poker.backend.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;


@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private static final List<Room> rooms = new CopyOnWriteArrayList<>();

    public static List<Room> getRooms(){
        return rooms;
    }

    public static Room getRoomById(String roomID){
        return rooms.stream()
                .filter(room -> room.getRoomID().equals(roomID))
                .findFirst()
                .orElse(null);
    }

    // Create a new room
    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestBody CreateRoomRequest request) {
        try {
            System.out.println(request.toString());
            // Validate inputs
            if (request.getUsername() == null || request.getUserID() == null || request.getRoomname() == null) {
                return ResponseEntity.status(400).body(Map.of(
                        "status", "error",
                        "message", "Invalid Input"
                ));
            }

            // Create a new room
            UUID roomID = UUID.randomUUID();
            Room room = new Room(roomID, request.getRoomname());  // Create a new room
            System.out.println("New room created: " + roomID);
            System.out.println(request.getUsername() + " " + request.getUserID() + " " + request.getRoomname());

            // Create a new user and add them to the room
            User getUser = UserController.getUserById(request.getUserID());
            getUser.username = request.getUsername();
            room.addRoomName(request.getRoomname());
            room.addUser(getUser, null);  // WebSocket session can be added later

            // Add the room to the rooms list (assuming rooms is a static list of rooms)
            rooms.add(room);

            // Return the response with roomID and success message

            return ResponseEntity.ok(Map.of(
                    "roomID", roomID.toString(),
                    "roomname", request.getRoomname(),
                    "message", "Room successfully created and user added",
                    "userID", request.getUserID(),
                    "status", "success"
            ));
        }
        catch (IllegalArgumentException ex) {
            return ResponseEntity.status(400).body(Map.of(
                    "status", "error",
                    "message", "Invalid room ID format"
            ));
        }
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUserToRoom(
            @RequestParam String roomID,
            @RequestParam String userID
    ) {
        // Convert UUIDs
        UUID roomUUID = UUID.fromString(roomID);

        // Your logic to retrieve the Room and User
        Room room = RoomController.getRoomById(roomUUID.toString());
        if (room == null) throw new NoSuchElementException("Room not found");

        // Dummy placeholder for user retrieval
        User user = UserController.getUserById(userID); // Replace with actual lookup

        // Add user to room with dummy WebSocketSession (you'll replace this part)
        room.addUser(user, null);

        return ResponseEntity.ok(Map.of("roomID", room.getRoomID(), "userID", user.userID.toString()));
    }

    // Get the number of users in a room
    @GetMapping("/{roomID}/size")
    public ResponseEntity<?> getRoomSize(@PathVariable String roomID) {
        UUID roomUUID = UUID.fromString(roomID);
        Room room = RoomController.getRoomById(roomUUID.toString());

        if (room == null) {
            throw new NoSuchElementException("Room not found");
        }

        return ResponseEntity.ok(Map.of("size", room.getRoomSize()));
    }

    // Optionally, expose the whole Room object (not recommended in production)
    @GetMapping("/{roomID}")
    public ResponseEntity<?> getRoom(@PathVariable String roomID) {
        UUID roomUUID = UUID.fromString(roomID);
        Room room = RoomController.getRoomById(roomUUID.toString());

        if (room == null) {
//            throw new NoSuchElementException("Room not found");
            ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(room);
    }

    // Optional: delete room
    @DeleteMapping("/{roomID}")
    public ResponseEntity<?> deleteRoom(@PathVariable String roomID) {
        UUID roomUUID = UUID.fromString(roomID);
        rooms.remove(roomUUID);
        return ResponseEntity.ok(Map.of("status", "deleted"));
    }
}
