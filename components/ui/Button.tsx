// components/Button.tsx
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  icon?: string;
  disabled?: boolean;
  onPress: () => void;
  severity?: "primary" | "secondary" | "info" | "success" | "danger";
};

export function Button({ title, icon, disabled, onPress, severity }: Props) {
  const getSeverityStyle = () => {
    switch (severity) {
      case "primary":
        return { backgroundColor: "#3478f6" };
      case "secondary":
        return { backgroundColor: "#374151" };
      case "info":
        return { backgroundColor: "#fbbf24" };
      case "success":
        return { backgroundColor: "#16a34a" };
      case "danger":
        return { backgroundColor: "#dc2626" };
      default:
        return {};
    }
  };

  const severityStyle = getSeverityStyle();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, severityStyle, disabled && styles.disabled]}
      onPress={onPress}
    >
      <View style={styles.inner}>
        {icon && <Ionicons name={icon as any} size={20} color="white" style={{ marginRight: 8 }} />}
        <Text style={styles.label}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    backgroundColor: '#3478f6',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#a1c4fd',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
