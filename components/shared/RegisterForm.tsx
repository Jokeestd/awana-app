import { ThemedText } from "@/components/ThemedText";
import { YesNoToggle } from "@/components/ui/YesNoToggle";
import { Clubber } from "@/models/clubber";
import { ClubberRecord } from "@/models/clubber-record";
import { addRecord } from "@/services/ClubberServiceAsyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
interface Props {
  clubber: Clubber;
  record?: ClubberRecord;
  onSubmit: (record: ClubberRecord) => void;
  onCancel: () => void;
}

export default function RegisterForm({ clubber, record, onSubmit, onCancel }: Props) {
  const [sectionsCompleted, setSectionsCompleted] = useState(record?.sectionsCompleted ?? 0);
  const [bible, setBible] = useState(record?.bible ?? false);
  const [church, setChurch] = useState(record?.church ?? false);
  const [guests, setGuests] = useState<number | undefined>(record?.guests);
  const [teamColor, setTeamColor] = useState<string>(record?.teamColor ?? '');
  const [extraPoints, setExtraPoints] = useState<number | undefined>(record?.extraPoints);

  const increment = () => setSectionsCompleted((prev) => prev + 1);
  const decrement = () => setSectionsCompleted((prev) => (prev > 0 ? prev - 1 : 0));

  const handleSave = async () => {
    // If record is not null, we are editing an existing record
    if (record) {
      const updatedRecord: ClubberRecord = {
        ...record,
        sectionsCompleted,
        bible,
        church,
        teamColor,
        guests,
        extraPoints: extraPoints ? extraPoints : undefined,
      };
      console.log("Updating record", updatedRecord);
      await addRecord(updatedRecord);
      onSubmit(updatedRecord);
    }
    else {
    // If record is null, we are creating a new record
      const newRecord: ClubberRecord = {
        id: Date.now().toString(),
        clubberId: clubber.id,
        date: new Date().toISOString(),
        sectionsCompleted,
        bible,
        church,
        teamColor,
        guests,
        extraPoints: extraPoints ? extraPoints : undefined,
      };
      console.log("Saving record", newRecord);
      await addRecord(newRecord);
      onSubmit(newRecord);
    }
  };

  const COLORS = [
    { name: 'Rojo', value: 'red', hex: '#ef4444' },
    { name: 'Azul', value: 'blue', hex: '#3b82f6' },
    { name: 'Verde', value: 'green', hex: '#10b981' },
    { name: 'Amarillo', value: 'yellow', hex: '#facc15' },
  ];
  return (
    <>
      <ThemedText type="title">Registro de {clubber.name}</ThemedText>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Ionicons name={'bookmark-outline'} size={20} color="#6B7280" />
              <ThemedText style={styles.label}>Secciones</ThemedText>
            </View>
            <View style={styles.counterContainer}>
              <TouchableOpacity style={styles.counterButton} onPress={decrement}>
                <Text style={styles.counterText}>–</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.counterValue}
                keyboardType="numeric"
                value={sectionsCompleted.toString()}
                onChangeText={(text) => setSectionsCompleted(parseInt(text) || 0)}
              />
              <TouchableOpacity style={styles.counterButton} onPress={increment}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <YesNoToggle label="Biblia" icon="book-outline" value={bible} onChange={setBible} />
          <YesNoToggle label="Iglesia" icon="home-outline" value={church} onChange={setChurch} />
          <View style={styles.row}>
            <Ionicons name="color-palette-outline" size={20} color="#6B7280" />
            <ThemedText style={styles.label}>Color del equipo</ThemedText>
          </View>
          <View style={styles.colorRow}>
            {COLORS.map(color => (
              <TouchableOpacity
                key={color.value}
                style={[
                  styles.colorButton,
                  { backgroundColor: color.hex },
                  teamColor === color.value && styles.colorButtonActive,
                ]}
                onPress={() => setTeamColor(color.value)}
              >
                {teamColor === color.value && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.iconRow}>
            <View style={styles.iconInput}>
              <Ionicons name="people-outline" size={24} color="#6B7280" />
              <TextInput
                style={styles.iconTextInput}
                placeholder="Invitados"
                keyboardType="numeric"
                value={guests?.toString() || ""}
                onChangeText={(text) => {
                  const value = parseInt(text);
                  setGuests(isNaN(value) ? undefined : value);
                }
                }
              />
            </View>
            <View style={styles.iconInput}>
              <Ionicons name="star-outline" size={24} color="#6B7280" />
              <TextInput
                style={styles.iconTextInput}
                placeholder="Puntos Extra"
                keyboardType="numeric"
                value={extraPoints?.toString() || ""}
                onChangeText={(text) => {
                  const value = parseInt(text);
                  setExtraPoints(isNaN(value) ? undefined : value);
                }}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <Button title="Cancel" onPress={onCancel} color="#6B7280" />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconInput: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    flex: 1,
  },
  iconTextInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: "#6B7280",
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    //width: 280,
    justifyContent: "space-between",
  },
  counterButton: {
    padding: 10,
    backgroundColor: "#f3f4f6",
  },
  counterText: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 26,
  },
  counterValue: {
    paddingHorizontal: 16,
    fontSize: 22,
    color: "#6B7280",
    fontWeight: "bold",
    width: 50,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
  },
  colorButtonActive: {
    borderColor: '#000',
    borderWidth: 3,
  },
});
