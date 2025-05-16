import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Course } from '../../types';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Button from '../ui/Button';

interface BannerProps {
  courses: Course[];
  onPress: (course: Course) => void;
}

const { width } = Dimensions.get('window');

export default function Banner({ courses, onPress }: BannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Auto scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (courses.length > 1) {
      interval = setInterval(() => {
        if (activeIndex === courses.length - 1) {
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        } else {
          flatListRef.current?.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
      }, 5000); // Auto scroll every 5 seconds
    }
    
    return () => clearInterval(interval);
  }, [activeIndex, courses.length]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.slideContainer}
      onPress={() => onPress(item)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        {item.isFree ? (
          <Button 
            title="ثبت نام (رایگان)" 
            variant="primary" 
            size="small" 
            onPress={() => onPress(item)}
            style={styles.button}
          />
        ) : (
          <Button 
            title="ثبت نام دوره" 
            variant="primary" 
            size="small" 
            onPress={() => onPress(item)}
            style={styles.button}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={courses}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
      />
      
      {/* Pagination indicators */}
      <View style={styles.pagination}>
        {courses.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
  slideContainer: {
    width,
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.inverse,
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  button: {
    alignSelf: 'flex-start',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background.tertiary,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.accent.primary,
    width: 16,
  },
});