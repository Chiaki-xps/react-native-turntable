import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.85;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2 - 8;

function getPiePath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const rad = (angle: number) => (angle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startAngle));
  const y1 = cy + r * Math.sin(rad(startAngle));
  const x2 = cx + r * Math.cos(rad(endAngle));
  const y2 = cy + r * Math.sin(rad(endAngle));
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
}

const COLORS = [
  "#f87171",
  "#86efac",
  "#fbbf24",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#34d399",
  "#facc15",
];

export default function HomeScreen() {
  const turntables = useSelector((state: RootState) => state.turntable.list);
  const selectedId = useSelector(
    (state: RootState) => state.turntable.selectedId
  );
  const turntable = selectedId
    ? turntables.find((t) => t.id === selectedId)
    : turntables[0];
  const options = turntable?.options || [];
  const angleStep = options.length > 0 ? 360 / options.length : 360;

  // ================== 转盘旋转核心逻辑 ==================
  // 动画相关
  const rotate = useSharedValue(0); // 记录当前转盘的旋转角度（动画值）
  const [resultIdx, setResultIdx] = useState<number | null>(null); // 记录抽中的选项索引

  // 绑定动画样式，使转盘随 rotate 变化旋转
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  // 点击 GO 按钮时触发转盘旋转
  const handleGo = () => {
    if (options.length === 0) return;
    // 随机抽取一个选项索引
    const idx = Math.floor(Math.random() * options.length);
    setResultIdx(null); // 动画开始时隐藏结果
    // 计算目标角度：多转5圈再停到目标选项（idx），0.5是让指针指向扇区中间
    const targetAngle = 360 * 5 + (360 - (idx + 0.5) * angleStep);
    // 启动动画，3秒内转到目标角度
    rotate.value = withTiming(targetAngle, { duration: 3000 }, () => {
      // 动画结束后，角度归一化到0-360
      rotate.value = targetAngle % 360;
      // 显示抽中的结果
      runOnJS(setResultIdx)(idx);
    });
  };
  // ================== 转盘旋转核心逻辑 END ==================

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ThemedText type="title" style={{ marginBottom: 16 }}>
          {turntable?.name || "转盘"}
        </ThemedText>
        <View style={styles.wheelWrap}>
          {/* GO按钮绝对居中，三角形箭头紧贴上方 */}
          <TouchableOpacity
            style={styles.goBtn}
            onPress={handleGo}
            activeOpacity={0.8}
          >
            <Text style={styles.goBtnText}>GO</Text>
          </TouchableOpacity>
          <Svg
            width={44}
            height={24}
            style={{
              position: "absolute",
              left: WHEEL_SIZE / 2 - 22,
              top: WHEEL_SIZE / 2 - 38 + 7,
              zIndex: 3,
            }}
          >
            <Path
              d="M22,0 L38,18 Q22,10 6,18 Z"
              fill="#428dff"
              stroke="#428dff"
              strokeWidth={2}
            />
          </Svg>
          <Animated.View style={[{ position: "absolute" }, animatedStyle]}>
            <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
              <G>
                {options.length === 0 ? (
                  <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#eee" />
                ) : (
                  options.map((opt, i) => {
                    const startAngle = i * angleStep - 90;
                    const endAngle = (i + 1) * angleStep - 90;
                    return (
                      <Path
                        key={opt.id}
                        d={getPiePath(
                          CENTER,
                          CENTER,
                          RADIUS,
                          startAngle,
                          endAngle
                        )}
                        fill={COLORS[i % COLORS.length]}
                      />
                    );
                  })
                )}
                {/* 文字 */}
                {options.map((opt, i) => {
                  const angle = (i + 0.5) * angleStep - 90;
                  const rad = (angle * Math.PI) / 180;
                  const rx = CENTER + RADIUS * 0.65 * Math.cos(rad);
                  const ry = CENTER + RADIUS * 0.65 * Math.sin(rad) + 8;
                  return (
                    <SvgText
                      key={opt.id}
                      x={rx}
                      y={ry}
                      fontSize={24}
                      fill="#fff"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {opt.text}
                    </SvgText>
                  );
                })}
              </G>
            </Svg>
          </Animated.View>
        </View>
      </View>
      {/* 结果展示，绝对定位在底部 */}
      {resultIdx !== null && options[resultIdx] && (
        <View style={styles.resultAbsolute}>
          <Text style={styles.resultText}>{options[resultIdx].text}</Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wheelWrap: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE + 44,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  goBtn: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#428dff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 2,
    ...(typeof window !== "undefined"
      ? { boxShadow: "0px 2px 8px rgba(66, 141, 255, 0.12)" }
      : {}),
    marginTop: 0,
    transform: [{ translateX: -38 }, { translateY: -38 }],
  },
  goBtnText: {
    color: "#428dff",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  resultWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 0,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1890ff",
    letterSpacing: 4,
    ...(typeof window !== "undefined"
      ? { textShadow: "0px 2px 8px #e0eaff" }
      : {}),
    bottom: 50,
  },
  resultAbsolute: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 48,
    alignItems: "center",
    zIndex: 10,
  },
});
