import { ClubColors } from '@/constants/Colors';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';

interface ClubBadgeProps {
  readonly showName?: boolean;
  readonly showIcon?: boolean;
  readonly size?: number;
  readonly noBackground?: boolean;
  readonly showAnimation?: boolean;
}

const CLUBS = {
  chispas: {
    icon: 'sparkles-sharp',
    color: ClubColors.chispas.dark,
  },
  llamas: {
    icon: 'flame-sharp',
    color: ClubColors.llamas.dark,
  },
  antorchas: {
    icon: 'bonfire-sharp',
    color: ClubColors.antorchas.dark,
  },
};

export default function ClubBadge({
  showName = false,
  showIcon = true,
  size = 28,
  noBackground = false,
  showAnimation = false,
}: ClubBadgeProps) {
  const { user } = useUser();
  const clubKey = user?.club?.toLowerCase();
  const club = CLUBS[clubKey as keyof typeof CLUBS];

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showAnimation) {
        Animated.loop(
        Animated.sequence([
            Animated.timing(scaleAnim, {
            toValue: 1.15,
            duration: 1000,
            useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            }),
        ])
        ).start();
    }
  }, [showAnimation]);

  if (!club) return null;

  return (
    <View style={[styles.container, { backgroundColor: noBackground ? 'transparent' : club.color }]}>
      {showIcon && (
        <Animated.View
          style={[
            {
              transform: [{ scale: showAnimation ? scaleAnim : 1 }],
              marginRight: showName ? 6 : 0,
            },
            getGlowStyle(noBackground ? 'white' : 'black'),
          ]}
        >
          <Ionicons name={club.icon as any} size={size} color={noBackground ? club.color : "white" }/>
        </Animated.View>
      )}
      {showName && <Text style={styles.text}>{user?.club}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 80,
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});

function getGlowStyle(color: string) {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    android: {
      elevation: 10,
    },
  });
}
