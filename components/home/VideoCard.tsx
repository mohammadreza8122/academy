import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Play } from 'lucide-react-native';

export default function VideoCard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <TouchableOpacity 
      style={[styles.container, isDesktop && styles.containerDesktop]}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={require('@/assets/images/video-thumbnail.jpg')}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Play size={24} color={Colors.text.inverse} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          قانون هیک
        </Text>
        <Text style={styles.duration}>۱۲:۳۰ دقیقه</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    marginHorizontal: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containerDesktop: {
    width: 280,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 135,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'right',
  },
  duration: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'right',
  },
}); 