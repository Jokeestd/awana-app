// components/Button.tsx
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  icon?: string;
  onPress: () => void;
};

export function Button({ title, icon, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.inner}>
        {icon && <Ionicons name={icon as any} size={20} color="white" style={{ marginRight: 8 }} />}
        <Text style={styles.label}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3478f6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
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
