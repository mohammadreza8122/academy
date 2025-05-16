import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import VideoCard from './VideoCard';

export default function VideosSection() {
  const isDesktop = useIsDesktop();

  return (
    <View style={[styles.container, styles.lastSection]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.seeMore}>نمایش بیشتر ›</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ویدیوهای آموزشی</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.videosContainer}
      >
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  lastSection: {
    paddingBottom: 32,
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
  videosContainer: {
    paddingHorizontal: 8,
  },
}); 