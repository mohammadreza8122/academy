import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import Carousel from '@/components/home/Carousel';
import QuickAccess from '@/components/home/QuickAccess';
import CoursesSection from '@/components/home/CoursesSection';
import ArticlesSection from '@/components/home/ArticlesSection';
import VideosSection from '@/components/home/VideosSection';

export default function HomePage() {
  const isDesktop = useIsDesktop();

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, isDesktop && styles.contentDesktop]}>
        <Carousel />
        <QuickAccess />
        <CoursesSection />
        <ArticlesSection />
        <VideosSection />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  contentDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
});