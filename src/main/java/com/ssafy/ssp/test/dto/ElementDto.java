package com.ssafy.ssp.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ElementDto {
    private String id;
    private String type;
    private double x;
    private double y;
    private double width;
    private double height;
    private double angle;
    private String strokeColor;
    private String backgroundColor;
    private String fillStyle;
    private int strokeWidth;
    private String strokeStyle;
    private int roughness;
    private int opacity;
    private List<String> groupIds;
    private String frameId;
    private String roundness;
    private long seed;
    private int version;
    private int versionNonce;
    private boolean isDeleted;
    private List<List<Double>> points;
    private List<Double> pressures;
    private boolean simulatePressure;
    private List<Double> lastCommittedPoint;

    // 기본 생성자
    public ElementDto() {}
}