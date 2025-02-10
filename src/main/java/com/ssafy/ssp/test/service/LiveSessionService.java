package com.ssafy.ssp.test.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LiveSessionService {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String ROOM_PREFIX = "live_users:";

    // 라이브 참여 (유저 추가)
    public void joinLive(String roomId, String userId) {
        redisTemplate.opsForSet().add(ROOM_PREFIX + roomId, userId);
    }

    // 라이브 퇴장 (유저 제거)
    public void leaveLive(String roomId, String userId) {
        redisTemplate.opsForSet().remove(ROOM_PREFIX + roomId, userId);
    }

    // 현재 라이브 참여 인원 조회
    public Long getLiveCount(String roomId) {
        return redisTemplate.opsForSet().size(ROOM_PREFIX + roomId);
    }
}
