import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const slides = [
  {
    id: 1,
    image: require('@/assets/images/coaching-banner.jpg'),
    title: 'دوره آنلاین جامع بیزینس کوچینگ',
    subtitle: 'نجات کسب و کارها',
  },
  // Add more slides here
];

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={styles.container}>
      <Image
        source={slides[activeSlide].image}
        style={[styles.image, isDesktop && styles.imageDesktop]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{slides[activeSlide].title}</Text>
        <Text style={styles.subtitle}>{slides[activeSlide].subtitle}</Text>
      </View>
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeSlide && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.background.secondary,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageDesktop: {
    height: 100,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.inverse,
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.inverse,
    textAlign: 'right',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.inverse + '80',
  },
  paginationDotActive: {
    backgroundColor: Colors.text.inverse,
  },
}); 