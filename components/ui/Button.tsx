import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  icon?: string;
  disabled?: boolean;
  onPress: () => void;
  severity?: "primary" | "secondary" | "info" | "success" | "danger";
};

/**
 * A custom button component for React Native, supporting optional icons, disabled state,
 * and multiple severity styles (primary, secondary, info, success, danger).
 *
 * @param {string} title - The text label displayed on the button.
 * @param {string} [icon] - Optional Ionicons icon name to display to the left of the label.
 * @param {boolean} [disabled] - If true, disables the button and applies a disabled style.
 * @param {() => void} onPress - Callback function invoked when the button is pressed.
 * @param {"primary" | "secondary" | "info" | "success" | "danger"} [severity] - Optional severity type to determine button color.
 *
 * @returns {JSX.Element} The rendered button component.
 */
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
        return { backgroundColor: "#22C55E" };
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
    opacity: 0.5,
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
