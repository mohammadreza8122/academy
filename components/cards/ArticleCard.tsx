import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
// import { router } from 'expo-router'; // No longer needed
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Clock } from 'lucide-react-native';
import Card from '@/components/ui/Card';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

interface ArticleCardProps {
  article: Article;
  viewMode: 'grid' | 'list';
  onPress: () => void;
  // isDesktop prop removed, should be handled by parent grid layout
}

export default function ArticleCard({ article, viewMode, onPress }: ArticleCardProps) {
  // const { width } = useWindowDimensions(); // Removed
  // const isDesktop = Platform.OS === 'web' && width >= 768; // Removed

  if (viewMode === 'grid') {
    return (
      <TouchableOpacity
        key={article.id}
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.gridItem} // Removed isDesktop conditional style, parent should handle responsive width
      >
        <Card style={styles.articleCard}>
          <Image source={{ uri: article.image }} style={styles.gridArticleImage} />
          <View style={styles.articleContent}>
            <View style={styles.articleMeta}>
              <Text style={styles.category}>{article.category}</Text>
              <View style={styles.readTimeContainer}>
                <Text style={styles.readTimeText}>{article.readTime}</Text>
                <Clock size={12} color={Colors.text.tertiary} />
              </View>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {article.title}
            </Text>
            <Text style={styles.excerpt} numberOfLines={2}>
              {article.excerpt}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.date}>{article.date}</Text>
              <Text style={styles.author}>{article.author}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  // List view
  return (
    <TouchableOpacity
      key={article.id}
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.listItem}
    >
      <Card style={styles.listArticleCard} padded={false}>
        <Image source={{ uri: article.image }} style={styles.listArticleImage} />
        <View style={styles.listArticleContent}>
          <View style={styles.articleMeta}>
            <Text style={styles.category}>{article.category}</Text>
            <View style={styles.readTimeContainer}>
              <Text style={styles.readTimeText}>{article.readTime}</Text>
              <Clock size={12} color={Colors.text.tertiary} />
            </View>
          </View>
          <Text style={styles.title} numberOfLines={1}> {/* Usually 1 line for list titles */}
            {article.title}
          </Text>
          <Text style={styles.excerpt} numberOfLines={2}> {/* Or 1-2 lines for list excerpts */}
            {article.excerpt}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.date}>{article.date}</Text>
            <Text style={styles.author}>{article.author}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

// Placeholder styles - these would ideally come from app/(tabs)/articles/index.tsx
const styles = StyleSheet.create({
  gridItem: {
    width: '100%', // In a grid, parent typically manages width via columns
    marginBottom: 16,
  },
  gridItemDesktop: { // This style is now unused here, can be removed or kept for reference
    // width: '48%', 
  },
  articleCard: {
    overflow: 'hidden', // Ensure image corners are rounded if image is first child
  },
  gridArticleImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 12,
  },
  articleMeta: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.xs,
    color: Colors.accent.primary,
    backgroundColor: Colors.accent.primary + '20', // Light background for category
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden', // for borderRadius to work on Text on Android
  },
  readTimeContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  readTimeText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
    marginLeft: 4,
  },
  title: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
    marginBottom: 4,
  },
  excerpt: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: Typography.lineHeight.sm,
  },
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto', // Push footer to bottom if content is short
    borderTopWidth: 1,
    borderTopColor: Colors.outline.default,
    paddingTop: 8,
  },
  author: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  date: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
  },
  // List Item Styles
  listItem: {
    marginBottom: 16,
    flexDirection: 'row-reverse', // For image on right, content on left
  },
  listArticleCard: {
    flexDirection: 'row-reverse',
    flex: 1,
    padding:0, // Card itself should not have padding, content views will
  },
  listArticleImage: {
    width: 100,
    height: '100%', // Make image take full height of card
    resizeMode: 'cover',
    borderTopRightRadius: 12, // Match card's borderRadius
    borderBottomRightRadius: 12, // Match card's borderRadius
  },
  listArticleContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between', // Distribute content vertically
  },
}); 