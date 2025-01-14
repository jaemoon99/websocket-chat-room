package com.ssafy.ssp.test;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public ResponseDto greeting(ChatDto message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new ResponseDto(message);
    }

}