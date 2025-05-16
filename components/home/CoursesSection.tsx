import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import CourseCard from './CourseCard';

export default function CoursesSection() {
  const isDesktop = useIsDesktop();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.seeMore}>نمایش بیشتر ›</Text>
        </TouchableOpacity>
        <Text style={styles.title}>دوره‌های آموزشی</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.coursesContainer,
          isDesktop && styles.coursesContainerDesktop
        ]}
      >
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
  },
  seeMore: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.accent.primary,
  },
  coursesContainer: {
    paddingHorizontal: 8,
  },
  coursesContainerDesktop: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}); 