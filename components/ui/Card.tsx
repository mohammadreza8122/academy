import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'small' | 'medium' | 'large';
  padded?: boolean;
}

export default function Card({
  children,
  style,
  elevation = 'medium',
  padded = true,
}: CardProps) {
  const cardStyles = [
    styles.card,
    padded && styles.padded,
    elevation === 'small' && styles.smallElevation,
    elevation === 'medium' && styles.mediumElevation,
    elevation === 'large' && styles.largeElevation,
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  padded: {
    padding: 16,
  },
  smallElevation: {
    shadowColor: Colors.card.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  mediumElevation: {
    shadowColor: Colors.card.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  largeElevation: {
    shadowColor: Colors.card.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});