package com.ssafy.ssp.test.dto;

import lombok.Data;

@Data
public class ResponseDto {
    private ExcalidrawDto message;

    public ResponseDto(ExcalidrawDto message) {
        this.message = message;
    }
}
