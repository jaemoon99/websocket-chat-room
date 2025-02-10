package com.ssafy.ssp.test.controller;

import com.ssafy.ssp.test.dto.ResponseDto;
import com.ssafy.ssp.test.dto.ExcalidrawDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ExcalidrawController {

    @MessageMapping("/send/{roomId}")
    @SendTo("/pub/receive/{roomId}")
    public ResponseDto greeting(
            @DestinationVariable(value = "roomId") String roomId,
            ExcalidrawDto message) throws Exception {
        return new ResponseDto(message);
    }

}