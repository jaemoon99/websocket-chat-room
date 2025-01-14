package com.ssafy.ssp.test;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseDto {
    private Object message;
    private LocalDateTime timestamp;

    public ResponseDto(JsonDto message) {
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
