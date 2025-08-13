import { ThemedText } from "@/components/ThemedText";
import { Turntable } from "@/store/turntableSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Camera, CameraView } from "expo-camera";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  onScanSuccess: (turntable: Omit<Turntable, "id">) => void;
}

export default function ScanModal({
  visible,
  onClose,
  onScanSuccess,
}: ScanModalProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = (result: any) => {
    const { data } = result;
    try {
      const turntableData = JSON.parse(data);

      if (
        !turntableData.name ||
        !turntableData.options ||
        !Array.isArray(turntableData.options)
      ) {
        return;
      }

      const validOptions = turntableData.options.every(
        (option: any) =>
          option && typeof option.text === "string" && option.text.trim() !== ""
      );

      if (!validOptions) {
        return;
      }

      const newTurntable: Omit<Turntable, "id"> = {
        name: turntableData.name,
        options: turntableData.options.map((option: any) => ({
          id: Math.random().toString(36).slice(2),
          text: option.text,
        })),
      };

      onScanSuccess(newTurntable);
      onClose();
    } catch {
      // 解析失败，继续扫描
    }
  };

  if (hasPermission === null) {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <ThemedText style={styles.loadingText}>
              请求相机权限中...
            </ThemedText>
          </View>
        </View>
      </Modal>
    );
  }

  if (hasPermission === false) {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <ThemedText style={styles.errorText}>
              需要相机权限才能扫描二维码
            </ThemedText>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>关闭</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>扫描二维码</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
          />
          <View style={styles.scanOverlay}>
            <View style={styles.scanFrame} />
            <ThemedText style={styles.scanText}>
              将二维码放入框内，自动扫描
            </ThemedText>
          </View>
        </View>

        <View style={styles.controls}>
          <ThemedText style={styles.scanningText}>
            持续扫描中，请将二维码对准框内
          </ThemedText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  closeBtn: {
    padding: 4,
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  scanText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  controls: {
    padding: 20,
    backgroundColor: "#000",
    alignItems: "center",
  },
  rescanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1890ff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  rescanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    margin: 20,
    alignItems: "center",
    minWidth: 280,
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ff4d4f",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#1890ff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  scanningText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
