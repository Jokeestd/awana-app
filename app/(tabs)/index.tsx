import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { UserServiceAsyncStorage } from '@/services/UserServiceAsyncStorage';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserName = async () => {
      const user = await UserServiceAsyncStorage.getUser();
      const firstName = user?.name?.split(' ')[0];
      setUserName(firstName ?? 'Líder');
    };
    loadUserName();
  }, []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/oansa.jpeg')}
          style={styles.homeLogo}
        />
      }
    >
      <View style={styles.switchRoleContainer}>
        <Ionicons
          name="person-circle-outline"
          size={28}
          color="white"
          onPress={() => console.log('Switch role tapped')}
        />
      </View>
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
    </ParallaxScrollView>
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
    width: 380,
    bottom: 0,
    left: 0,
    //position: 'absolute',
  },
  switchRoleContainer: {
    position: 'absolute',
    top: 32,
    right: 16,
    zIndex: 10,
  }
});
