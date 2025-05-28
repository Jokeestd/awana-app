import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Button } from '@/components/ui/Button';
import { ThemedPicker } from '@/components/ui/ThemedPicker';
import { Club } from '@/models/enums/club.enum';
import { UserRole } from '@/models/enums/user-role.enum';
import { User } from '@/models/user';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { UserServiceAsyncStorage } from '../../services/UserServiceAsyncStorage';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<UserRole | ''>('');
  const router = useRouter();

  const userMock: User = {
    name: 'Juan Pérez',
    club: Club.Sparks,
    role: UserRole.Leader,
  };
  useEffect(() => {
    const load = async () => {
      const loadedUser = await UserServiceAsyncStorage.getUser() || userMock;
      setUser(loadedUser);
      setEditedUser(loadedUser ? { ...loadedUser } : null);
    };
    load();
  }, []);

  const handleSave = async () => {
    if (editedUser) {
      await UserServiceAsyncStorage.saveUser(editedUser);
      setUser(editedUser);
      Alert.alert('Perfil actualizado');
    }
  };

  const handleChangeRole = async () => {
    if (!newRole) return;
    await UserServiceAsyncStorage.setRole(newRole);
    setUser((prev) => prev ? { ...prev, role: newRole } : null);
    router.replace('/'); // Reload tabs
  };

  const isUserEdited = editedUser && (editedUser.name !== user?.name || editedUser.club !== user?.club);

  if (!editedUser) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChangeRole} style={styles.changeRoleBtn}>
        <ThemedText type='link'>Cambiar Rol</ThemedText>
      </TouchableOpacity>

      <View style={styles.avatarWrapper}>
        <Ionicons name="person-circle" size={150} color="#ffe6b3" />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>Nombre</ThemedText>
        <ThemedTextInput
          value={editedUser.name}
          onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        />
      </View>

        <View style={styles.field}>
          <ThemedText style={styles.label}>Club</ThemedText>
          <ThemedPicker
            selectedValue={editedUser.club}
            onValueChange={(value) => setEditedUser({ ...editedUser, club: value as Club })}
          >
            <Picker.Item label="Chispas" value={Club.Sparks} />
            <Picker.Item label="Llamas" value={Club.Flames} />
            <Picker.Item label="Antorchas" value={Club.Torches} />
          </ThemedPicker>
        </View>

        <Button title='Guardar cambios' onPress={handleSave} disabled={!isUserEdited} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingHorizontal: 20,
    gap: 20,
  },
  changeRoleBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
    color: '#6B7280',
  },
  field: {
    gap: 6,
  }
});

