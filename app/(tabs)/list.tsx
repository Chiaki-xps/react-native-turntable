import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { setSelectedTurntable } from "@/store/turntableSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TurntableListScreen() {
  const turntables = useSelector((state: RootState) => state.turntable.list);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerWrap}>
        <ThemedText type="title" style={styles.headerTitle}>
          转盘列表
        </ThemedText>
      </View>
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => router.push("/create")}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={20} color="#1890ff" />
        <ThemedText style={styles.createBtnText}>创建转盘</ThemedText>
      </TouchableOpacity>
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
                onPress={() =>
                  router.push({ pathname: "/edit", params: { id: item.id } })
                }
              >
                <MaterialIcons name="edit" size={22} color="#1890ff" />
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
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1890ff",
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 20,
    paddingVertical: 8,
    backgroundColor: "#fff",
    minHeight: 36,
    shadowColor: "#1890ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  createBtnText: {
    color: "#1890ff",
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
    padding: 4,
  },
});
