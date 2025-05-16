import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Search, ArrowLeft, Clock, Grid, List } from 'lucide-react-native';
import Card from '@/components/ui/Card';

const CATEGORIES = [
  { id: '1', name: 'همه' },
  { id: '2', name: 'تحلیل تکنیکال' },
  { id: '3', name: 'تحلیل بنیادی' },
  { id: '4', name: 'روانشناسی معاملات' },
  { id: '5', name: 'مدیریت سرمایه' },
];

const ARTICLES = [
  {
    id: '1',
    title: 'استراتژی‌های معاملاتی موفق در بازار فارکس',
    excerpt: 'در این مقاله به بررسی استراتژی‌های موفق معامله‌گران حرفه‌ای می‌پردازیم...',
    author: 'دکتر علی محمدی',
    date: '۲۳ اردیبهشت ۱۴۰۴',
    readTime: '۱۰ دقیقه',
    image: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
    category: 'تحلیل تکنیکال',
  },
  {
    id: '2',
    title: 'اصول روانشناسی در معاملات',
    excerpt: 'چگونه می‌توانیم بر احساسات خود در هنگام معامله غلبه کنیم؟',
    author: 'دکتر سارا احمدی',
    date: '۲۰ اردیبهشت ۱۴۰۴',
    readTime: '۸ دقیقه',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
    category: 'روانشناسی معاملات',
  },
];

export default function ArticlesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  const handleArticlePress = (articleId: string) => {
    router.push(`/articles/${articleId}`);
  };

  const handleBack = () => {
    router.back();
  };

  const renderArticleCard = (article: any) => {
    if (viewMode === 'grid') {
      return (
        <TouchableOpacity
          key={article.id}
          onPress={() => handleArticlePress(article.id)}
          activeOpacity={0.8}
          style={[styles.gridItem, isDesktop && styles.gridItemDesktop]}
        >
          <Card style={styles.articleCard}>
            <Image source={{ uri: article.image }} style={styles.gridArticleImage} />
            <View style={styles.articleContent}>
              <View style={styles.articleMeta}>
                <Text style={styles.category}>{article.category}</Text>
                <View style={styles.readTime}>
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

    return (
      <TouchableOpacity
        key={article.id}
        onPress={() => handleArticlePress(article.id)}
        activeOpacity={0.8}
        style={styles.listItem}
      >
        <Card style={styles.listArticleCard}>
          <Image source={{ uri: article.image }} style={styles.listArticleImage} />
          <View style={styles.listArticleContent}>
            <View style={styles.articleMeta}>
              <Text style={styles.category}>{article.category}</Text>
              <View style={styles.readTime}>
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مقالات</Text>
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft color={Colors.text.secondary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Card style={styles.searchCard} elevation="small">
          <View style={styles.searchInputContainer}>
            <Search color={Colors.text.tertiary} size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.text.tertiary}
              textAlign="right"
            />
          </View>
        </Card>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={[styles.articlesGrid, viewMode === 'list' && styles.articlesList]}>
          {ARTICLES.map(renderArticleCard)}
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
  },
  backButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.background.primary,
  },
  searchCard: {
    padding: 0,
  },
  searchInputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  categoriesContainer: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.background.primary,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    marginLeft: 8,
  },
  categoryButtonActive: {
    backgroundColor: Colors.accent.primary,
  },
  categoryButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  categoryButtonTextActive: {
    color: Colors.text.inverse,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  articleCard: {
    marginBottom: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  articleContent: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.accent.primary,
    textAlign: 'right',
  },
  readTime: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  readTimeText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    marginRight: 4,
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
    marginBottom: 12,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  date: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  articlesList: {
    flexDirection: 'column',
    marginHorizontal: 0,
  },
  gridItem: {
    width: '50%',
    padding: 8,
  },
  gridItemDesktop: {
    width: '33.333%',
  },
  listItem: {
    marginBottom: 16,
  },
  gridArticleImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  listArticleImage: {
    width: '30%',
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  listArticleCard: {
    flexDirection: 'row',
  },
  listArticleContent: {
    flex: 1,
    padding: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    position: 'absolute',
    left: 16,
  },
  viewToggleButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  viewToggleButtonActive: {
    backgroundColor: Colors.background.tertiary,
  },
});