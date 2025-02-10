package com.ssafy.ssp.test;

import java.util.List;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    @MessageMapping("/send/{roomId}")
    @SendTo("/pub/receive/{roomId}")
    public ResponseDto greeting(
            @DestinationVariable(value = "roomId") String roomId,
            ExcalidrawDto message) throws Exception {
        return new ResponseDto(message);
    }

}