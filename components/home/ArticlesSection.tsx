import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import ArticleCard from './ArticleCard';

export default function ArticlesSection() {
  const isDesktop = useIsDesktop();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.seeMore}>نمایش بیشتر ›</Text>
        </TouchableOpacity>
        <Text style={styles.title}>مقالات</Text>
      </View>
      <View style={[styles.articlesGrid, isDesktop && styles.articlesGridDesktop]}>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
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