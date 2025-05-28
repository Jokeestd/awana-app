import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { Platform, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

type Props = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedPicker({ selectedValue, onValueChange, children, lightColor, darkColor }: Props) {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, "border");
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <ThemedView style={[styles.pickerWrapper, { borderColor }]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, { color: '#6B7280' }]}
        dropdownIconColor={textColor}
        mode="dropdown" // solo para android?
      >
        {children}
      </Picker>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    overflow: "hidden",
    height: Platform.OS === "ios" ? 120 : 50,
  },
  picker: {
    height: Platform.OS === "ios" ? 120 : 50,
    width: "100%",
    borderColor: "transparent",
    backgroundColor: "transparent",
    padding: 10,
    fontSize: 16,
    fontFamily: "System",
    ...(Platform.OS === "ios" && { 
      marginTop: -30,
    }),
  },
});
