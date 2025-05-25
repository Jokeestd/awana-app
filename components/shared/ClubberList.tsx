// components/ClubberList.tsx
import { Clubber } from '@/models/clubber';
import { ClubberRecord } from '@/models/clubber-record';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface ClubberListProps {
  clubbers: Clubber[];
  records: ClubberRecord[];
  onSelect: (clubber: Clubber) => void;
}

export default function ClubberList({ clubbers, records, onSelect }: ClubberListProps) {

  const getClubberRecordData = (clubberId: string): { total: number; color: string } => {
    const clubberRecord = records.find((record) => record.clubberId === clubberId);
    console.log('clubberRecord', clubberRecord);
    if (clubberRecord) {
      return {
        total: getTotal(clubberRecord),
        color: clubberRecord.teamColor,
      };
    }
    return {
      total: 0,
      color: '',
    };
  }

  const getTotal = (record : ClubberRecord) => {
    return (record.sectionsCompleted * 200) + (record.bible ? 200 : 0) + (record.church ? 200 : 0) + (record.extraPoints ?? 0) + (record.guests ?? 0) * 400;
  }

  return (
    <ScrollView>
      <View style={styles.list}>
        {clubbers.map((clubber) => {
          const {total, color} = getClubberRecordData(clubber.id);
          return (
          <TouchableOpacity key={clubber.id} style={styles.card} onPress={() => onSelect(clubber)}>
            <View>
              <Text style={styles.name}>{clubber.name}</Text>
              <Text style={styles.team}>{clubber.team}</Text>
            </View>
            <View style={styles.metaRow}>
              {!!color && <View style={[styles.dot, { backgroundColor: color }]} /> }
              {total > 0 && (
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsText}>+{total}pt</Text>
                </View>
              )}
            </View>
            <Ionicons
              name={clubber.gender === 'male' ? 'male' : 'female'}
              size={24}
              color={clubber.gender === 'male' ? '#3B82F6' : '#EC4899'}
            />
          </TouchableOpacity>
        )})}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    width: 170,
  },
  team: {
    fontSize: 14,
    color: '#6B7280',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
    marginTop: 4,
    width: 100,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pointsBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
});
