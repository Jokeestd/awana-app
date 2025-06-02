import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ClubBadge from '@/components/common/ClubBadge';
import WelcomeModal from '@/components/common/WelcomeModal';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/context/UserContext';
import { UserServiceAsyncStorage } from '@/services/UserServiceAsyncStorage';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  //const [userName, setUserName] = useState<string | null>(null);
  //const [club, setClub] = useState<Club>();
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();

  const loadUser = async () => {
    const user = await UserServiceAsyncStorage.getUser();
    if (!user) {
      setShowModal(true); // show modal if no user
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
      {user && (
        <View style={styles.clubBadgeContainer}>
          <ClubBadge size={45}/>
          <ThemedText type="title" style={{ color: 'white' }}>
            {user?.club}
          </ThemedText>
        </View>
     )}

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
          <ThemedText type="title">Hola, {user?.name?.split(' ')[0]}!</ThemedText>
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
  },
  clubBadgeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 1,
    top: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    paddingLeft: 20,
    width: '100%',
    gap: 16,
  },
});
