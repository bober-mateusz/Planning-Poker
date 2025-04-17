package com.planning.poker.backend.Controllers;

import com.planning.poker.backend.entities.CreateRoomRequest;
import com.planning.poker.backend.entities.Room;
import com.planning.poker.backend.entities.User;
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
    public Map<String, String> createRoom(@RequestBody CreateRoomRequest request) {
        // Validate inputs
        if (request.getUserName() == null || request.getUserID() == null || request.getRoomName() == null) {
            return Map.of(
                    "status", "error",
                    "message", "Invalid input, all fields are required."
            );
        }

        // Create a new room
        UUID roomID = UUID.randomUUID();
        Room room = new Room(roomID, request.getRoomName());  // Create a new room
        System.out.println("New room created: " + roomID);
        System.out.println(request.getUserName() + " " + request.getUserID() + " " + request.getRoomName());

        // Create a new user and add them to the room
        User getUser = UserController.getUserById(request.getUserID());
        getUser.userName = request.getUserName();
        getUser.roomID = roomID;
        room.addRoomName(request.getRoomName());
        room.addUser(getUser, null);  // WebSocket session can be added later

        // Add the room to the rooms list (assuming rooms is a static list of rooms)
        rooms.add(room);

        // Return the response with roomID and success message
        return Map.of(
                "roomID", roomID.toString(),
                "roomName", request.getRoomName(),
                "message", "Room successfully created and user added",
                "userID", request.getUserID(),
                "status", "success"
        );
    }

    @GetMapping("/{roomID}/add-user")
    public Map<String, String> addUserToRoom(
            @PathVariable String roomID,
            @RequestParam String userID
    ) {
        // Convert UUIDs
        UUID roomUUID = UUID.fromString(roomID);
        UUID userUUID = UUID.fromString(userID);

        // Your logic to retrieve the Room and User
        Room room = RoomController.getRoomById(roomUUID.toString());
        if (room == null) throw new NoSuchElementException("Room not found");

        // Dummy placeholder for user retrieval
        User user = new User(userUUID, roomUUID); // Replace with actual lookup

        // Add user to room with dummy WebSocketSession (you'll replace this part)
        room.addUser(user, null);

        return Map.of("status", "user added");
    }

    // Get the number of users in a room
    @GetMapping("/{roomID}/size")
    public Map<String, Integer> getRoomSize(@PathVariable String roomID) {
        UUID roomUUID = UUID.fromString(roomID);
        Room room = RoomController.getRoomById(roomUUID.toString());

        if (room == null) {
            throw new NoSuchElementException("Room not found");
        }

        return Map.of("size", room.getRoomSize());
    }

    // Optionally, expose the whole Room object (not recommended in production)
    @GetMapping("/{roomID}")
    public Room getRoom(@PathVariable String roomID) {
        UUID roomUUID = UUID.fromString(roomID);
        Room room = RoomController.getRoomById(roomUUID.toString());

        if (room == null) {
            throw new NoSuchElementException("Room not found");
        }

        return room;
    }

    // Optional: delete room
    @DeleteMapping("/{roomID}")
    public Map<String, String> deleteRoom(@PathVariable String roomID) {
        UUID roomUUID = UUID.fromString(roomID);
        rooms.remove(roomUUID);
        return Map.of("status", "deleted");
    }
}
