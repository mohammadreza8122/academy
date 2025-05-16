import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import ArticleCard from './ArticleCard';
import { router } from 'expo-router';

export default function ArticlesSection() {
  const isDesktop = useIsDesktop();

  const handleSeeMorePress = () => {
    router.push('/(tabs)/articles');
  };

  const handleArticlePress = (articleId: string) => {
    router.push({
      pathname: '/(tabs)/articles/[id]',
      params: { id: articleId }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSeeMorePress} activeOpacity={0.7}>
          <Text style={styles.seeMore}>نمایش بیشتر ›</Text>
        </TouchableOpacity>
        <Text style={styles.title}>مقالات</Text>
      </View>
      <View style={[styles.articlesGrid, isDesktop && styles.articlesGridDesktop]}>
        <ArticleCard onPress={() => handleArticlePress('1')} />
        <ArticleCard onPress={() => handleArticlePress('2')} />
        <ArticleCard onPress={() => handleArticlePress('3')} />
      </View>
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
  articlesGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  articlesGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}); 