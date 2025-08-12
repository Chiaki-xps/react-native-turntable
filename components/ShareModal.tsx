import { ThemedText } from "@/components/ThemedText";
import { Turntable } from "@/store/turntableSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  turntable: Turntable;
}

export default function ShareModal({
  visible,
  onClose,
  turntable,
}: ShareModalProps) {
  const [qrRef, setQrRef] = useState<any>(null);

  // 生成转盘数据的 JSON 字符串
  const turntableData = JSON.stringify({
    name: turntable.name,
    options: turntable.options,
    version: "1.0.0",
    timestamp: Date.now(),
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>分享转盘</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <ThemedText style={styles.turntableName}>
              {turntable.name}
            </ThemedText>
            <ThemedText style={styles.description}>
              扫描二维码即可导入此转盘
            </ThemedText>

            <View style={styles.qrContainer}>
              <QRCode
                value={turntableData}
                size={200}
                color="#000"
                backgroundColor="#fff"
                getRef={(ref) => setQrRef(ref)}
              />
            </View>

            <View style={styles.optionsList}>
              <ThemedText style={styles.optionsTitle}>转盘选项：</ThemedText>
              {turntable.options.map((option, index) => (
                <ThemedText key={option.id} style={styles.optionItem}>
                  {index + 1}. {option.text}
                </ThemedText>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 20,
    maxWidth: 350,
    width: "100%",
    ...(typeof window !== "undefined"
      ? { boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 8,
        }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  turntableName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  qrContainer: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 20,
  },
  optionsList: {
    width: "100%",
    alignItems: "flex-start",
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  optionItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 20,
  },
});
