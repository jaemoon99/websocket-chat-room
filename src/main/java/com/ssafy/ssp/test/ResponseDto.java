package com.ssafy.ssp.test;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseDto {
    private ChatDto message;
    private LocalDateTime timestamp;

    public ResponseDto(ChatDto message) {
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
