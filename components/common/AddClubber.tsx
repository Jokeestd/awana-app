import { ThemedText } from '@/components/ThemedText';
import { Clubber, Gender } from '@/models/clubber';
import { getClubbers, saveClubbers } from '@/services/ClubberServiceAsyncStorage';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ThemedView } from '../ThemedView';
import { Button } from '../ui/Button';
import { ThemedPicker } from '../ui/ThemedPicker';

interface Props {
  onClose: () => void;
}

export default function AddClubberScreen({ onClose }: Props) {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [clubbers, setClubbers] = useState<Clubber[]>([]);

  useEffect(() => {
    getClubbers().then(setClubbers);
  }, []);

  const handleAdd = async () => {
    if (!name.trim() || !team.trim()) {
    Alert.alert('Falta información', 'Por favor ingrese nombre y equipo.');
      return;
    }

    const newClubber: Clubber = {
      id: uuid.v4().toString(),
      name,
      team,
      gender,
    };

    const updated = [...clubbers, newClubber];
    await saveClubbers(updated);
    setClubbers(updated);
    setName('');
    setTeam('');
    setGender('male');
    Alert.alert('Éxito', '¡Oansista añadido!');
    onClose();
  };

  return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title} >Añadir Oansista</ThemedText>
            <ThemedView style={styles.field}>
              <ThemedText style={styles.label}>Nombre</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ingrese nombre completo"
                value={name}
                onChangeText={setName}
              />
            </ThemedView>
            <ThemedView style={styles.field}>
              <ThemedText style={styles.label}>Club</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Nombre del club"
                value={team}
                onChangeText={setTeam}
              />
            </ThemedView>
            <ThemedView style={styles.field}>
                <ThemedText style={styles.label}>Sexo</ThemedText>
                <ThemedPicker
                  selectedValue={gender}
                  onValueChange={(value) => setGender(value as Gender)}
                >
                  <Picker.Item
                      label="Masculino"
                      value="male"
                  />
                  <Picker.Item
                      label="Femenino"
                      value="female"
                  />
                </ThemedPicker>
              </ThemedView>
            <ThemedView style={styles.buttonRow}>
              <Button title="Cancelar" onPress={onClose} severity="secondary" />
              <Button title="Añadir" onPress={handleAdd} severity="primary" />
            </ThemedView>
          </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#6B7280',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    //backgroundColor: '#f9fafb',
    fontSize: 16,
    color: '#6B7280',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});