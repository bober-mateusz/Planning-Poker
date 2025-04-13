package com.planning.poker.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

import static org.mockito.Mockito.*;

class PokerWebSocketHandlerTest {

    private PokerWebSocketHandler handler;
    private WebSocketSession session;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        handler = new PokerWebSocketHandler();
        session = mock(WebSocketSession.class);
        objectMapper = new ObjectMapper();
    }

    @Test
    void testJoinRoom() throws Exception {
        Map<String, String> message = Map.of(
                "action", "join-room",
                "roomID", "1"
        );

        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(message));

        handler.handleTextMessage(session, textMessage);

        verify(session, atLeastOnce()).sendMessage(argThat(msg ->
                ((String) msg.getPayload()).contains("update-room")
        ));
    }

    @Test
    void testVote() throws Exception {
        // Join the room first
        handler.handleTextMessage(session, new TextMessage(objectMapper.writeValueAsString(
                Map.of("action", "join-room", "roomID", "room1")
        )));

        // Send vote
        handler.handleTextMessage(session, new TextMessage(objectMapper.writeValueAsString(
                Map.of("action", "vote", "roomID", "room1", "userID", "user123", "vote", "5")
        )));

        verify(session, atLeastOnce()).sendMessage(argThat(msg ->
                ((String) msg.getPayload()).contains("vote-update")
        ));
    }
}
