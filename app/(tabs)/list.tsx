import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addTurntable } from "../../store/turntableSlice";

export default function TurntableListScreen() {
  const turntables = useSelector((state: RootState) => state.turntable.list);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 顶部标题 */}
      <View style={styles.headerWrap}>
        <ThemedText type="title" style={styles.headerTitle}>
          转盘列表
        </ThemedText>
      </View>
      {/* 创建转盘按钮 */}
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => {
          if (newName.trim()) {
            dispatch(addTurntable({ name: newName.trim() }));
            setNewName("");
          }
        }}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={20} color="#1890ff" />
        <ThemedText style={styles.createBtnText}>创建转盘</ThemedText>
      </TouchableOpacity>
      {/* 转盘列表 */}
      <FlatList
        data={turntables}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                <MaterialIcons name="share" size={22} color="#1890ff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                <MaterialIcons name="edit" size={22} color="#1890ff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <ThemedText
            style={{ color: "#888", textAlign: "center", marginTop: 32 }}
          >
            暂无转盘，请先创建
          </ThemedText>
        }
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
  tabBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tabActive: {
    color: "#1890ff",
    fontWeight: "bold",
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: "#1890ff",
    paddingBottom: 4,
  },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1890ff",
    borderRadius: 10, // 更小圆角
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 20,
    paddingVertical: 8, // 更小高度
    backgroundColor: "#fff",
    minHeight: 36, // 更小最小高度
    shadowColor: "#1890ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  createBtnText: {
    color: "#1890ff",
    fontSize: 16, // 更小字号
    fontWeight: "bold",
    marginLeft: 10, // 更小间距
    letterSpacing: 1,
  },
  createInput: {
    color: "#1890ff",
    fontSize: 16,
    marginLeft: 4,
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
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
    padding: 4,
  },
});
