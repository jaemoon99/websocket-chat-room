package com.ssafy.ssp.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JsonDto {
    private String version;
    private List<ObjectData> objects;
    private String background;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ObjectData {
        private String type;
        private String version;
        private String originX;
        private String originY;
        private double left;
        private double top;
        private double width;
        private double height;
        private String fill;
        private String stroke;
        private double strokeWidth;
        private List<Double> strokeDashArray;
        private String strokeLineCap;
        private double strokeDashOffset;
        private String strokeLineJoin;
        private boolean strokeUniform;
        private int strokeMiterLimit;
        private double scaleX;
        private double scaleY;
        private double angle;
        private boolean flipX;
        private boolean flipY;
        private double opacity;
        private Object shadow;
        private boolean visible;
        private String backgroundColor;
        private String fillRule;
        private String paintFirst;
        private String globalCompositeOperation;
        private double skewX;
        private double skewY;
        private List<List<Object>> path;
    }
}
