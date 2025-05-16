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
import { Clock, Youtube } from 'lucide-react-native'; // Using Youtube icon for video
import Card from '@/components/ui/Card';

export interface Video {
  id: string;
  title: string;
  description: string;
  author?: string;
  date: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  category?: string;
}

interface VideoCardProps {
  video: Video;
  viewMode: 'grid' | 'list';
  onPress: () => void;
}

export default function VideoCard({ video, viewMode, onPress }: VideoCardProps) {
  if (viewMode === 'grid') {
    return (
      <TouchableOpacity
        key={video.id}
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.gridItem}
      >
        <Card style={styles.cardBase}>
          <Image source={{ uri: video.thumbnailUrl }} style={styles.gridImage} />
          <View style={styles.playIconContainerGridOverlay}>
            <Youtube size={48} color={Colors.background.primary} />
          </View>
          <View style={styles.contentContainer}>
            {video.category && (
                <Text style={styles.categoryText}>{video.category}</Text>
            )}
            <Text style={styles.titleText} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={viewMode === 'grid' ? 2 : 2}>
              {video.description}
            </Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Clock size={12} color={Colors.text.tertiary} />
                <Text style={styles.metaText}>{video.duration}</Text>
              </View>
              {video.author && (
                <Text style={styles.authorText}>{video.author}</Text>
              )}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  // List view
  return (
    <TouchableOpacity
      key={video.id}
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.listItem}
    >
      <Card style={styles.cardBaseList} padded={false}>
        <View style={styles.listImageContainer}> 
          <Image source={{ uri: video.thumbnailUrl }} style={styles.listImage} />
          <View style={styles.playIconContainerListOverlay}>
            <Youtube size={24} color={Colors.background.primary} />
          </View>
        </View>
        <View style={styles.listContentContainer}>
          {video.category && (
            <Text style={styles.categoryText}>{video.category}</Text>
          )}
          <Text style={styles.titleText} numberOfLines={1}>{video.title}</Text>
          <Text style={styles.descriptionText} numberOfLines={1}>{video.description}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={12} color={Colors.text.tertiary} />
              <Text style={styles.metaText}>{video.duration}</Text>
            </View>
            {video.author && (
              <Text style={styles.authorText}>{video.author}</Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

// Placeholder styles - adapt from PodcastCard and customize for video
const styles = StyleSheet.create({
  gridItem: {
    width: '100%',
    marginBottom: 16,
  },
  cardBase: {
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: 180, // Standard height for video thumbnails
    resizeMode: 'cover',
    backgroundColor: Colors.background.secondary, // Placeholder while image loads
  },
  playIconContainerGridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Dark overlay for better icon visibility
    zIndex: 1, // Ensure icon is on top of image, but content below
    height: 180, // Match image height
  },
  contentContainer: {
    padding: 12,
    position: 'relative', // For zIndex context if needed, though play icon is on image
    zIndex: 0,
  },
  categoryText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.accent.tertiary, // Different accent for videos
    backgroundColor: Colors.accent.tertiary + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginBottom: 8,
    overflow: 'hidden',
  },
  titleText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
    marginBottom: 4,
  },
  descriptionText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: Typography.lineHeight.sm,
  },
  metaContainer: {
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
  metaText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
    marginLeft: 4,
  },
  authorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
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
  listImageContainer: { // Container for image and overlay icon
    width: 120, // Wider image for video list view
    height: 80, // Aspect ratio for video thumbs
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden', // Clip the overlay
    backgroundColor: Colors.background.secondary,
  },
  listImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playIconContainerListOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  listContentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
}); 