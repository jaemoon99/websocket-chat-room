package com.ssafy.ssp.test;

import java.util.List;

public class ExcalidrawDto {
    private String type;
    private String boardType;
    private List<ElementDto> elements;
    private String sender;

    // 기본 생성자
    public ExcalidrawDto() {}

    // 생성자
    public ExcalidrawDto(String type, String boardType, List<ElementDto> elements, String sender) {
        this.type = type;
        this.boardType = boardType;
        this.elements = elements;
        this.sender = sender;
    }

    // Getter 및 Setter
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBoardType() {
        return boardType;
    }

    public void setBoardType(String boardType) {
        this.boardType = boardType;
    }

    public List<ElementDto> getElements() {
        return elements;
    }

    public void setElements(List<ElementDto> elements) {
        this.elements = elements;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public static class ElementDto {
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

    // Getter 및 Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getAngle() {
        return angle;
    }

    public void setAngle(double angle) {
        this.angle = angle;
    }

    public String getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    public String getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    public String getFillStyle() {
        return fillStyle;
    }

    public void setFillStyle(String fillStyle) {
        this.fillStyle = fillStyle;
    }

    public int getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(int strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public String getStrokeStyle() {
        return strokeStyle;
    }

    public void setStrokeStyle(String strokeStyle) {
        this.strokeStyle = strokeStyle;
    }

    public int getRoughness() {
        return roughness;
    }

    public void setRoughness(int roughness) {
        this.roughness = roughness;
    }

    public int getOpacity() {
        return opacity;
    }

    public void setOpacity(int opacity) {
        this.opacity = opacity;
    }

    public List<String> getGroupIds() {
        return groupIds;
    }

    public void setGroupIds(List<String> groupIds) {
        this.groupIds = groupIds;
    }

    public String getFrameId() {
        return frameId;
    }

    public void setFrameId(String frameId) {
        this.frameId = frameId;
    }

    public String getRoundness() {
        return roundness;
    }

    public void setRoundness(String roundness) {
        this.roundness = roundness;
    }

    public long getSeed() {
        return seed;
    }

    public void setSeed(long seed) {
        this.seed = seed;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public int getVersionNonce() {
        return versionNonce;
    }

    public void setVersionNonce(int versionNonce) {
        this.versionNonce = versionNonce;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public List<List<Double>> getPoints() {
        return points;
    }

    public void setPoints(List<List<Double>> points) {
        this.points = points;
    }

    public List<Double> getPressures() {
        return pressures;
    }

    public void setPressures(List<Double> pressures) {
        this.pressures = pressures;
    }

    public boolean isSimulatePressure() {
        return simulatePressure;
    }

    public void setSimulatePressure(boolean simulatePressure) {
        this.simulatePressure = simulatePressure;
    }

    public List<Double> getLastCommittedPoint() {
        return lastCommittedPoint;
    }

    public void setLastCommittedPoint(List<Double> lastCommittedPoint) {
        this.lastCommittedPoint = lastCommittedPoint;
    }
}
}

