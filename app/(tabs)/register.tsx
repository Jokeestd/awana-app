import { ThemedText } from '@/components/ThemedText';
import { Clubber } from '@/models/clubber';
import { ClubberRecord } from '@/models/clubber-record';
import { getClubbers, saveClubbers } from '@/services/ClubberServiceAsyncStorage';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import AddClubber from '@/components/shared/AddClubber';
import ClubberList from '@/components/shared/ClubberList';
import RegisterForm from '@/components/shared/RegisterForm';
import { ThemedModal } from '@/components/ThemedModal';
import { Ionicons } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();

  const [clubbers, setClubbers] = useState<Clubber[]>([]);
  const [selectedClubber, setSelectedClubber] = useState<Clubber | null>(null);
  const [records, setRecords] = useState<ClubberRecord[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const loadClubbersList = async () => {
    const stored = await getClubbers();
    setClubbers(stored);
  };

  useEffect(() => {
    loadClubbersList();
  }, []);

  useEffect(() => {
    saveClubbers(clubbers);
  }, [clubbers]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    loadClubbersList();
  };

  const handleSubmitRecord = (record: ClubberRecord) => {
    // if record exists, update it
    if (records.some((r) => r.clubberId === record.clubberId)) {
      setRecords((prev) =>
        prev.map((r) => (r.clubberId === record.clubberId ? record : r))
      );
    }
    else {
    setRecords((prev) => [...prev, record]);
    }
    setSelectedClubber(null); // reset form
  };

  const filteredClubbers = clubbers.filter((clubber) =>
    clubber.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10}]}>
      {!selectedClubber ? (
        <>
          <View style={styles.header}>
            <ThemedText type="title">Registrar</ThemedText>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Ionicons name="person-add" size={28} color="#2563eb" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={26} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              placeholder="Buscar Oansista..."
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={26} color="#9ca3af" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>
          <ClubberList clubbers={filteredClubbers} records={records} onSelect={setSelectedClubber} />
        </>
      ) : (
        <RegisterForm
          clubber={selectedClubber}
          record={records.find((record) => record.clubberId === selectedClubber.id) ?? undefined}
          onSubmit={handleSubmitRecord}
          onCancel={() => setSelectedClubber(null)}
        /> 
      )}
      
      <ThemedModal visible={isModalVisible}>
        <AddClubber onClose={handleCloseModal} />
      </ThemedModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
  },
   header: {
    alignItems: 'flex-end',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  clearIcon: {
    marginLeft: 8,
  },
});
