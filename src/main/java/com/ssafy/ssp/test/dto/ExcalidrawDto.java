package com.ssafy.ssp.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ExcalidrawDto {
    private String type;
    private String boardType;
    private List<ElementDto> elements;
    private String sender;

    // 기본 생성자
    public ExcalidrawDto() {}


}

