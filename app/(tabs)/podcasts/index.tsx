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
import PodcastCard, { Podcast } from '@/components/cards/PodcastCard';

// Placeholder data - using the Podcast interface
const PODCASTS_DATA: Podcast[] = [
  {
    id: '1',
    title: 'پادکست تحلیلی بازار هفته',
    description: 'بررسی جامع اتفاقات مهم بازار در هفته گذشته و پیشبینی هفته آینده...',
    author: 'رادیو اکونومی',
    date: '۳ خرداد ۱۴۰۳',
    duration: '۳۵ دقیقه',
    audioUrl: 'dummy_url',
    imageUrl: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg', // Example image
    category: 'تحلیل بازار',
  },
  {
    id: '2',
    title: 'آموزش مفاهیم پایه بلاکچین',
    description: 'پادکستی ساده و روان برای درک مفاهیم اساسی تکنولوژی بلاکچین و رمزارزها.',
    author: 'صدای دانش',
    date: '۱ خرداد ۱۴۰۳',
    duration: '۲۲ دقیقه',
    audioUrl: 'dummy_url',
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg', // Example image
    category: 'آموزشی',
  },
];

export default function PodcastsScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  const handleBack = () => {
    router.back();
  };

  const handlePodcastPress = (podcastId: string) => {
    // Navigate to podcast detail screen
    // The linter might complain here until routes are fully typed/stable
    router.push({ pathname: '/(tabs)/podcasts/[id]', params: { id: podcastId } } as any);
  };

  const numColumns = isDesktop ? 2 : 1; // For FlatList if we switch

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>پادکست ها</Text>
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

      {/* Add Search and Filter bar here later if needed */}

      <ScrollView style={styles.contentContainerScroll}>
        <View 
          style={[
            styles.itemsListContainer, // Generic name for the container
            viewMode === 'grid' && styles.gridContainer, 
            viewMode === 'grid' && isDesktop && styles.gridContainerDesktop
          ]}
        >
          {PODCASTS_DATA.map(podcast => (
            <View 
              key={podcast.id} 
              style={viewMode === 'grid' ? 
                (isDesktop ? styles.gridItemDesktop : styles.gridItemMobile) : 
                styles.listItemContainer
              }
            >
              <PodcastCard
                podcast={podcast}
                viewMode={viewMode}
                onPress={() => handlePodcastPress(podcast.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

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
    flex: 1, // Allow title to take space and center
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    right: 16,
    padding: 8, // Add padding for easier touch
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
    backgroundColor: Colors.accent.primary + '30', // Lighter accent for active toggle
  },
  contentContainerScroll: {
    flex: 1,
  },
  itemsListContainer: { // Replaces old listContainer and parts of gridContainer
    paddingHorizontal: 8, // Horizontal padding for grid items
    paddingVertical: 16,
  },
  gridContainer: { // Specific styles for grid layout
    flexDirection: 'row', // Default to row for mobile grid too, items will be 100% width
    flexWrap: 'wrap',
    // justifyContent: 'space-between', // only for desktop with 2 columns
  },
  gridContainerDesktop: {
    justifyContent: 'space-between',
  },
  listContainer: { // Styles for list view (though itemsListContainer is primary now)
    // padding: 16, // if list items need different padding than grid
  },
  gridItemMobile: {
    width: '100%', 
    paddingHorizontal: 8, // Padding for the item itself within the column
  },
  gridItemDesktop: {
    width: '50%', // Each item takes half width for 2 columns
    paddingHorizontal: 8, // Padding for the item itself within the column
  },
  listItemContainer: {
    // No specific width, card will be 100% of parent by default
    // PodcastCard's internal styles handle margins for list items
    paddingHorizontal: 8, // Match grid horizontal padding for consistency
  },
}); 