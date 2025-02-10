package com.ssafy.ssp.test.controller;

import com.ssafy.ssp.test.service.LiveSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
public class LiveSessionController {
    private final LiveSessionService liveSessionService;

    @PostMapping("/{roomId}/join/{userId}")
    public ResponseEntity<String> joinLive(@PathVariable String roomId, @PathVariable String userId) {
        liveSessionService.joinLive(roomId, userId);
        return ResponseEntity.ok("User " + userId + " joined room " + roomId);
    }

    @PostMapping("/{roomId}/leave/{userId}")
    public ResponseEntity<String> leaveLive(@PathVariable String roomId, @PathVariable String userId) {
        liveSessionService.leaveLive(roomId, userId);
        return ResponseEntity.ok("User " + userId + " left room " + roomId);
    }

    @GetMapping("/{roomId}/count")
    public ResponseEntity<Long> getLiveCount(@PathVariable String roomId) {
        Long count = liveSessionService.getLiveCount(roomId);
        return ResponseEntity.ok(count);
    }
}

