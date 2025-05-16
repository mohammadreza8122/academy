import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Clock, PlayCircle } from 'lucide-react-native'; // Added PlayCircle
import Card from '@/components/ui/Card';

export interface Podcast {
  id: string;
  title: string;
  description: string;
  author?: string;
  date: string;
  duration: string;
  audioUrl: string;
  imageUrl?: string;
  category?: string;
}

interface PodcastCardProps {
  podcast: Podcast;
  viewMode: 'grid' | 'list';
  onPress: () => void;
}

export default function PodcastCard({ podcast, viewMode, onPress }: PodcastCardProps) {
  if (viewMode === 'grid') {
    return (
      <TouchableOpacity
        key={podcast.id}
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.gridItem}
      >
        <Card style={styles.cardBase}>
          {podcast.imageUrl && (
            <Image source={{ uri: podcast.imageUrl }} style={styles.gridImage} />
          )}
          <View style={styles.contentContainer}>
            {podcast.category && (
                <Text style={styles.categoryText}>{podcast.category}</Text>
            )}
            <Text style={styles.titleText} numberOfLines={2}>
              {podcast.title}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={viewMode === 'grid' ? 3 : 2}>
              {podcast.description}
            </Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Clock size={12} color={Colors.text.tertiary} />
                <Text style={styles.metaText}>{podcast.duration}</Text>
              </View>
              {podcast.author && (
                <Text style={styles.authorText}>{podcast.author}</Text>
              )}
            </View>
          </View>
          <View style={styles.playIconContainerGrid}>
            <PlayCircle size={32} color={Colors.accent.primary} />
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  // List view
  return (
    <TouchableOpacity
      key={podcast.id}
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.listItem}
    >
      <Card style={styles.cardBaseList} padded={false}>
        {podcast.imageUrl && (
          <Image source={{ uri: podcast.imageUrl }} style={styles.listImage} />
        )}
        <View style={styles.listContentContainer}>
          {podcast.category && (
            <Text style={styles.categoryText}>{podcast.category}</Text>
          )}
          <Text style={styles.titleText} numberOfLines={1}>{podcast.title}</Text>
          <Text style={styles.descriptionText} numberOfLines={1}>{podcast.description}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={12} color={Colors.text.tertiary} />
              <Text style={styles.metaText}>{podcast.duration}</Text>
            </View>
            {podcast.author && (
              <Text style={styles.authorText}>{podcast.author}</Text>
            )}
          </View>
        </View>
        <View style={styles.playIconContainerList}>
            <PlayCircle size={28} color={Colors.accent.primary} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

// Placeholder styles - adapt from ArticleCard and customize
const styles = StyleSheet.create({
  gridItem: {
    width: '100%',
    marginBottom: 16,
  },
  cardBase: { // Renamed from articleCard
    overflow: 'hidden',
  },
  gridImage: { // Renamed from gridArticleImage
    width: '100%',
    height: 160, // Slightly less height for podcasts?
    resizeMode: 'cover',
  },
  contentContainer: { // Renamed from articleContent
    padding: 12,
  },
  categoryText: { // Renamed from category
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.accent.secondary, // Different accent for podcasts?
    backgroundColor: Colors.accent.secondary + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginBottom: 8,
    overflow: 'hidden',
  },
  titleText: { // Renamed from title
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
    marginBottom: 4,
  },
  descriptionText: { // Renamed from excerpt
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: Typography.lineHeight.sm,
  },
  metaContainer: { // Was part of footer or articleMeta
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.outline.default,
  },
  metaItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  metaText: { // Was readTimeText or date
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
    marginLeft: 4,
  },
  authorText: { // Was author
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  playIconContainerGrid: {
    position: 'absolute',
    bottom: 12,
    left: 12, 
    backgroundColor: Colors.background.primary + 'BF', // Semi-transparent background
    borderRadius: 50,
    padding: 4,
  },
  // List Item Styles
  listItem: {
    marginBottom: 16,
    flexDirection: 'row-reverse',
  },
  cardBaseList: {
    flexDirection: 'row-reverse',
    flex: 1,
    padding:0,
  },
  listImage: {
    width: 80, // Smaller image for list view
    height: '100%',
    resizeMode: 'cover',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  listContentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  playIconContainerList: {
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 