import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

export function YesNoToggle({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: any;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.toggleGroup}>
      <View style={styles.toggleLabel}>
        <Ionicons name={icon} size={20} color="#6B7280" />
        <ThemedText style={styles.toggleText}>{label}</ThemedText>
      </View>
      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[styles.toggleButton, value && styles.active]}
          onPress={() => onChange(true)}
        >
          <Text style={[styles.toggleOption, value && styles.activeText]}>
            Sí
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !value && styles.active]}
          onPress={() => onChange(false)}
        >
          <Text style={[styles.toggleOption, !value && styles.activeText]}>
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleGroup: {
    marginBottom: 0,
  },
  toggleLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  toggleButtons: {
    flexDirection: "row",
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    alignItems: "center",
  },
  toggleOption: {
    fontSize: 16,
    color: "#374151",
  },
  active: {
    backgroundColor: "#2563eb",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
