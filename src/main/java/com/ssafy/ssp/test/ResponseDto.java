package com.ssafy.ssp.test;

import lombok.Data;
import java.util.List;
import java.time.LocalDateTime;

@Data
public class ResponseDto {
    private ExcalidrawDto message;

    public ResponseDto(ExcalidrawDto message) {
        this.message = message;
    }
}
