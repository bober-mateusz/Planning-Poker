package com.planning.poker.backend.entities;

import lombok.*;

@NoArgsConstructor
@ToString
@Setter
@Getter
@EqualsAndHashCode
public class CreateRoomRequest {
    private String username;
    private String userID;
    private String roomname;
}
