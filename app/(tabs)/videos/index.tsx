import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, Grid, List } from 'lucide-react-native';
import VideoCard, { Video } from '@/components/cards/VideoCard';

// Placeholder data - using the Video interface
const VIDEOS_DATA: Video[] = [
  {
    id: '1',
    title: 'تحلیل تکنیکال بیت‌کوین - هفتگی',
    description: 'نگاهی عمیق به نمودار بیت‌کوین و سطوح حمایتی و مقاومتی پیش رو.',
    author: 'آکادمی ترید',
    date: '۲ خرداد ۱۴۰۳',
    duration: '۱۵:۲۲',
    videoUrl: 'dummy_url',
    thumbnailUrl: 'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg', 
    category: 'تحلیل تکنیکال',
  },
  {
    id: '2',
    title: 'معرفی ۵ اندیکاتور برتر برای نوسان‌گیری',
    description: 'در این ویدیو با ۵ اندیکاتور قدرتمند برای معاملات کوتاه مدت آشنا می‌شوید.',
    author: 'مستر کریپتو',
    date: '۳۰ اردیبهشت ۱۴۰۳',
    duration: '۲۲:۱۰',
    videoUrl: 'dummy_url',
    thumbnailUrl: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
    category: 'آموزش اندیکاتور',
  },
];

export default function VideosScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  const handleBack = () => {
    router.back();
  };

  const handleVideoPress = (videoId: string) => {
    router.push({ pathname: '/(tabs)/videos/[id]', params: { id: videoId } } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ویدیوها</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'grid' && styles.viewToggleButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Grid size={20} color={viewMode === 'grid' ? Colors.accent.primary : Colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'list' && styles.viewToggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? Colors.accent.primary : Colors.text.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft color={Colors.text.secondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainerScroll}>
        <View 
          style={[
            styles.itemsListContainer,
            viewMode === 'grid' && styles.gridContainer, 
            viewMode === 'grid' && isDesktop && styles.gridContainerDesktop
          ]}
        >
          {VIDEOS_DATA.map(video => (
            <View 
              key={video.id} 
              style={viewMode === 'grid' ? 
                (isDesktop ? styles.gridItemDesktop : styles.gridItemMobile) : 
                styles.listItemContainer
              }
            >
              <VideoCard
                video={video}
                viewMode={viewMode}
                onPress={() => handleVideoPress(video.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// Styles are identical to PodcastsScreen for now, can be customized later
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
    position: 'relative',
  },
  headerTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  viewToggle: {
    position: 'absolute',
    left: 16,
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    padding: 4,
  },
  viewToggleButton: {
    padding: 6,
    borderRadius: 6,
  },
  viewToggleButtonActive: {
    backgroundColor: Colors.accent.primary + '30',
  },
  contentContainerScroll: {
    flex: 1,
  },
  itemsListContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  gridContainer: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridContainerDesktop: {
    justifyContent: 'space-between',
  },
  gridItemMobile: {
    width: '100%', 
    paddingHorizontal: 8,
  },
  gridItemDesktop: {
    width: '50%', 
    paddingHorizontal: 8,
  },
  listItemContainer: {
    paddingHorizontal: 8,
  },
}); 