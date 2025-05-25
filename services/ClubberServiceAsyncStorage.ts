import AsyncStorage from '@react-native-async-storage/async-storage';
import { Clubber } from '../models/clubber';
import { ClubberRecord } from '../models/clubber-record';

// Keys
const CLUBBERS_KEY = 'clubbers';
const RECORDS_KEY = 'clubberRecords';

// Clubber methods
export const getClubbers = async (): Promise<Clubber[]> => {
  const data = await AsyncStorage.getItem(CLUBBERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveClubbers = async (clubbers: Clubber[]) => {
  await AsyncStorage.setItem(CLUBBERS_KEY, JSON.stringify(clubbers));
};

// ClubberRecord methods
export const getRecords = async (): Promise<ClubberRecord[]> => {
  const data = await AsyncStorage.getItem(RECORDS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecords = async (records: ClubberRecord[]) => {
  await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

// Add a single record
export const addRecord = async (record: ClubberRecord) => {
  const existing = await getRecords();
  await saveRecords([...existing, record]);
};
