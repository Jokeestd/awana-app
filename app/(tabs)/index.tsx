import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import WelcomeModal from '@/components/common/WelcomeModal';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Club } from '@/models/enums/club.enum';
import { UserServiceAsyncStorage } from '@/services/UserServiceAsyncStorage';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [club, setClub] = useState<Club>();
  const [showModal, setShowModal] = useState(false);

  const loadUser = async () => {
    const user = await UserServiceAsyncStorage.getUser();
    if (!user) {
      setShowModal(true); // show modal if no user
    } else {
      const firstName = user?.name?.split(' ')[0];
      setUserName(firstName ?? 'Líder');
      setClub(user.club);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleFinishWelcome = async () => {
    setShowModal(false);
    await loadUser(); // refresh user data after welcome
  };

  return (
    <>
      <WelcomeModal visible={showModal} onFinish={handleFinishWelcome} />
      
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/oansa.jpeg')}
            style={styles.homeLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Bienvenido, {userName}!</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Button
            title="Registrar Puntos"
            icon="create-outline"
            onPress={() => router.push('/register')}
          />
          <Button
            title="Ver Resumen"
            icon="analytics-outline"
            onPress={() => router.push('/summary')}
          />
        </ThemedView>

        <View style={styles.ClubContainer}>
          <Ionicons
            name="bonfire-sharp"
            size={32}
            color="white"
            onPress={() => console.log('Switch role tapped')}
          />
          <ThemedText type="subtitle" style={{ color: 'white' }}>
            {club}
          </ThemedText>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  homeLogo: {
    height: 258,
    width: 390,
    bottom: 0,
    left: 0,
  },
  ClubContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  }
});
