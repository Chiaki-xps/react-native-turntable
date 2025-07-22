import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTurntable } from "../store/turntableSlice";

function genOption(color = "#f87171") {
  return {
    id: Math.random().toString(36).slice(2),
    text: "",
    color,
    weight: 1,
  };
}

export default function CreateTurntableScreen() {
  const [name, setName] = useState("");
  const [options, setOptions] = useState([
    genOption("#f87171"),
    genOption("#86efac"),
  ]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOptionChange = (id: string, text: string) => {
    setOptions((opts) => opts.map((o) => (o.id === id ? { ...o, text } : o)));
  };
  const handleRemoveOption = (id: string) => {
    setOptions((opts) =>
      opts.length > 1 ? opts.filter((o) => o.id !== id) : opts
    );
  };
  const handleAddOption = () => {
    setOptions((opts) => [...opts, genOption()]);
  };
  const handleSave = () => {
    if (!name.trim() || options.some((o) => !o.text.trim())) return;
    dispatch(
      addTurntable({
        name: name.trim(),
        options: options.map(({ id, text }) => ({ id, text })),
      })
    );
    router.replace("/list");
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/list")}
          style={styles.backBtn}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1890ff" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          创建转盘
        </ThemedText>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText style={styles.label}>转盘标题</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="请输入转盘名称"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa"
        />
        <ThemedText style={styles.label}>转盘选项</ThemedText>
        {options.map((option, idx) => (
          <View key={option.id} style={styles.optionRow}>
            <TouchableOpacity
              onPress={() => handleRemoveOption(option.id)}
              style={styles.optionRemove}
            >
              <MaterialIcons name="remove-circle" size={28} color="#f87171" />
            </TouchableOpacity>
            <TextInput
              style={styles.optionInput}
              placeholder="请输入选项名称"
              value={option.text}
              onChangeText={(text) => handleOptionChange(option.id, text)}
              placeholderTextColor="#aaa"
            />
            <View
              style={[styles.optionColor, { backgroundColor: option.color }]}
            />
            <ThemedText style={styles.optionWeight}>1</ThemedText>
          </View>
        ))}
        <TouchableOpacity style={styles.addOption} onPress={handleAddOption}>
          <MaterialIcons name="add-circle" size={24} color="#1890ff" />
          <ThemedText style={styles.addOptionText}>添加新选项</ThemedText>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.saveBtnText}>保存</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 15,
    color: "#888",
    marginBottom: 8,
    marginTop: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderRadius: 16,
    padding: 18,
    fontSize: 20,
    marginBottom: 18,
    color: "#444",
    backgroundColor: "#f5f6fa",
    fontWeight: "bold",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  optionRemove: {
    marginRight: 8,
  },
  optionInput: {
    flex: 1,
    fontSize: 18,
    color: "#444",
    backgroundColor: "transparent",
    borderWidth: 0,
    marginRight: 10,
  },
  optionColor: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 10,
    backgroundColor: "#f87171",
  },
  optionWeight: {
    fontSize: 16,
    color: "#888",
    fontWeight: "bold",
    minWidth: 18,
    textAlign: "center",
  },
  addOption: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: "#f5f6fa",
    borderRadius: 12,
    padding: 12,
  },
  addOptionText: {
    color: "#1890ff",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "bold",
  },
  saveBtn: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#428dff",
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 32,
    marginTop: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
