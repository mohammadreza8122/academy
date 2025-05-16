import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface ArticleCardProps {
  onPress: () => void;
}

export default function ArticleCard({ onPress }: ArticleCardProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <TouchableOpacity 
      style={[styles.container, isDesktop && styles.containerDesktop]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={require('@/assets/images/article-thumbnail.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          انطباق‌پذیری سازمانی در سازمان به چه معناست؟
        </Text>
        <Text style={styles.excerpt} numberOfLines={3}>
          انطباق‌پذیری سازمانی یکی از مهمترین فاکتورهای موفقیت در دنیای کسب و کار امروز است...
        </Text>
        <TouchableOpacity style={styles.readMore} onPress={onPress}>
          <Text style={styles.readMoreText}>مطالعه کامل مقاله</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containerDesktop: {
    flexDirection: 'row',
    width: '48%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'right',
  },
  excerpt: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'right',
    lineHeight: 24,
  },
  readMore: {
    alignSelf: 'flex-end',
  },
  readMoreText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.accent.primary,
  },
});