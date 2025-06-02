import { useUser } from '@/context/UserContext';
import { Club } from '@/models/enums/club.enum';
import { UserRole } from '@/models/enums/user-role.enum';
import { UserServiceAsyncStorage } from '@/services/UserServiceAsyncStorage';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../ui/Button';

interface WelcomeModalProps {
  visible: boolean;
  onFinish: () => void;
}

export default function WelcomeModal({ visible, onFinish }: WelcomeModalProps) {
  const [name, setName] = useState('');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const {refreshUser} = useUser();
  const handleStart = async () => {
    if (!name || !selectedClub) return;
    const newUser = { name, club: selectedClub, role: UserRole.Leader };
    await UserServiceAsyncStorage.saveUser(newUser).then(() => refreshUser());
    onFinish();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>🎉 ¡Bienvenido a OANSA!</Text>
          <View>
            <Text style={styles.label}>Tu nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu nombre"
                value={name}
                onChangeText={setName}
                />
          </View>
          <View>
              <Text style={styles.label}>Selecciona tu club</Text>
              <View style={styles.clubContainer}>
                {Object.values(Club).map((club) => (
                  <TouchableOpacity
                    key={club}
                    style={[
                      styles.clubButton,
                      selectedClub === club && styles.clubButtonSelected,
                    ]}
                    onPress={() => setSelectedClub(club as Club)}
                  >
                    <Text style={[styles.clubText, selectedClub === club && styles.clubButtonTextSelected,]}>{club}</Text>
                  </TouchableOpacity>
                ))}
              </View>
          </View>
          <Button title='Comenzar' severity='success' icon='rocket-outline' onPress={handleStart} disabled={!name || !selectedClub} ></Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    elevation: 4,
    gap: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  clubContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  clubButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 4,
  },
  clubButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
	clubButtonTextSelected: {
    color: '#fff',
		fontWeight: '600',
  },
  clubText: {
    color: '#000',
  },
});
