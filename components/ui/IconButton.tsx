import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";

export function IconButton({ label, icon, active, onPress}: { label: string; icon: any; active: boolean; onPress: () => void;}) {
  return (
    <TouchableOpacity style={[styles.iconButton, active && styles.active]} onPress={onPress}>
      <Ionicons name={icon} size={24} color={active ? "#fff" : "#6B7280"} />
      <ThemedText style={[styles.iconLabel, active && { color: "#fff" }]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = {
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
  },
  active: {
    backgroundColor: "#2563eb",
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
};