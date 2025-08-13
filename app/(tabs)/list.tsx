import ScanModal from "@/components/ScanModal";
import ShareModal from "@/components/ShareModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  deleteTurntable,
  importTurntable,
  setSelectedTurntable,
} from "@/store/turntableSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TurntableListScreen() {
  const turntables = useSelector((state: RootState) => state.turntable.list);
  const dispatch = useDispatch();
  const router = useRouter();

  // 确认删除状态
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    id: string;
    name: string;
  }>({ show: false, id: "", name: "" });

  // 分享模态框状态
  const [shareModal, setShareModal] = useState<{
    show: boolean;
    turntable: any;
  }>({ show: false, turntable: null });

  // 扫描模态框状态
  const [scanModal, setScanModal] = useState(false);

  const handleDelete = (id: string, name: string) => {
    // 显示确认对话框
    setDeleteConfirm({ show: true, id, name });
  };

  const handleShare = (turntable: any) => {
    setShareModal({ show: true, turntable });
  };

  const handleScanSuccess = (turntable: any) => {
    dispatch(importTurntable(turntable));
    router.push("/");
  };

  const confirmDelete = () => {
    dispatch(deleteTurntable(deleteConfirm.id));
    setDeleteConfirm({ show: false, id: "", name: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, id: "", name: "" });
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerWrap}>
        <ThemedText type="title" style={styles.headerTitle}>
          转盘列表
        </ThemedText>
      </View>

      {/* 确认删除对话框 */}
      {deleteConfirm.show && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmDialog}>
            <ThemedText style={styles.confirmTitle}>确认删除</ThemedText>
            <ThemedText style={styles.confirmMessage}>
              确定要删除转盘&quot;{deleteConfirm.name}&quot;吗？
            </ThemedText>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmBtn, styles.cancelBtn]}
                onPress={cancelDelete}
              >
                <ThemedText style={styles.cancelBtnText}>取消</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, styles.deleteBtn]}
                onPress={confirmDelete}
              >
                <ThemedText style={styles.deleteBtnText}>删除</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push("/create")}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={20} color="#1890ff" />
          <ThemedText style={styles.createBtnText}>创建转盘</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => setScanModal(true)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="qr-code-scanner" size={20} color="#52c41a" />
          <ThemedText style={styles.scanBtnText}>扫描导入</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={turntables}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              dispatch(setSelectedTurntable(item.id));
              router.push("/");
            }}
            activeOpacity={0.85}
          >
            <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  handleShare(item);
                }}
              >
                <MaterialIcons name="share" size={22} color="#722ed1" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  router.push({ pathname: "/edit", params: { id: item.id } });
                }}
              >
                <MaterialIcons name="edit" size={22} color="#1890ff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id, item.name);
                }}
              >
                <MaterialIcons name="delete" size={22} color="#ff4d4f" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <ThemedText
            style={{ color: "#888", textAlign: "center", marginTop: 32 }}
          >
            暂无转盘，请先创建
          </ThemedText>
        }
      />

      {/* 分享模态框 */}
      {shareModal.show && shareModal.turntable && (
        <ShareModal
          visible={shareModal.show}
          onClose={() => setShareModal({ show: false, turntable: null })}
          turntable={shareModal.turntable}
        />
      )}

      {/* 扫描模态框 */}
      <ScanModal
        visible={scanModal}
        onClose={() => setScanModal(false)}
        onScanSuccess={handleScanSuccess}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingTop: 40,
    paddingBottom: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 20,
    gap: 12,
  },
  createBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1890ff",
    borderRadius: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    minHeight: 36,
    ...(typeof window !== "undefined"
      ? { boxShadow: "0px 2px 8px rgba(24, 144, 255, 0.08)" }
      : {
          shadowColor: "#1890ff",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }),
  },
  scanBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#52c41a",
    borderRadius: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    minHeight: 36,
    ...(typeof window !== "undefined"
      ? { boxShadow: "0px 2px 8px rgba(82, 196, 26, 0.08)" }
      : {
          shadowColor: "#52c41a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }),
  },
  createBtnText: {
    color: "#1890ff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    letterSpacing: 1,
  },
  scanBtnText: {
    color: "#52c41a",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6fa",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 17,
    color: "#222",
    fontWeight: "500",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 12,
    padding: 8,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  confirmDialog: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    margin: 20,
    minWidth: 280,
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  confirmMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  confirmButtons: {
    flexDirection: "row",
    gap: 12,
  },
  confirmBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#f5f5f5",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4f",
  },
  cancelBtnText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  deleteBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
