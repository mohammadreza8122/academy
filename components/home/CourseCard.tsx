import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

export default function CourseCard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <TouchableOpacity 
      style={[styles.container, isDesktop && styles.containerDesktop]}
      activeOpacity={0.8}
    >
      <Image
        source={require('@/assets/images/course-thumbnail.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>دوره جامع بیزینس کوچینگ</Text>
        <Text style={styles.instructor}>بیزینس کوچینگ</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>رایگان</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
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
    width: 320,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'right',
  },
  instructor: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 12,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  price: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.accent.primary,
  },
});