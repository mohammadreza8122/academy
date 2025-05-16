import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { COURSES, CATEGORIES } from '@/data/mockData';
import { Search, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Card from '@/components/ui/Card';

export default function CoursesScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCoursePress = (course: any) => {
    router.push(`/courses/${course.id}`);
  };

  // Filter courses by active category and search query
  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = activeCategory ? course.category === activeCategory : true;
    const matchesSearch = searchQuery
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const renderCourseCard = ({ item }: { item: any }) => {
    // Handle cases where thumbnail might be a local require or a uri
    const imageSource = typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http') 
      ? { uri: item.thumbnail } 
      : require('@/assets/images/course-thumbnail.jpg');
    
    return (
      <TouchableOpacity 
        style={[
          styles.courseCard, 
          isDesktop ? styles.desktopCourseCard : styles.mobileCourseCard
        ]}
        activeOpacity={0.8}
        onPress={() => handleCoursePress(item)}
      >
        <Image
          source={imageSource}
          style={styles.courseImage}
          resizeMode="cover"
        />
        <View style={styles.courseContent}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseInstructor}>{item.instructor}</Text>
          <View style={styles.courseFooter}>
            <Text style={styles.coursePrice}>
              {item.isFree ? 'رایگان' : `${item.price.toLocaleString()} تومان`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subHeader}>
        <Text style={styles.subheaderTitle}>دسته بندی موضوعی</Text>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === null && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(null)}
          >
            <Text style={styles.categoryButtonText}>بیزینس کوچینگ</Text>
          </TouchableOpacity>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text style={styles.categoryButtonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>دوره های آموزشی</Text>
        <FlatList
          data={filteredCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.coursesList}
          numColumns={isDesktop ? 3 : 2}
          key={isDesktop ? 'desktop' : 'mobile'}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  subHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'flex-end',
  },
  subheaderTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  categoryContainer: {
    paddingVertical: 8,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row-reverse', // RTL support
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.outline.default,
    marginHorizontal: 6,
    backgroundColor: Colors.background.primary,
  },
  activeCategoryButton: {
    backgroundColor: Colors.accent.primary,
  },
  categoryButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  coursesSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
    marginBottom: 16,
  },
  coursesList: {
    paddingBottom: 80,
  },
  courseCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  desktopCourseCard: {
    width: '31%',
    marginHorizontal: '1%',
  },
  mobileCourseCard: {
    width: '48%',
    marginHorizontal: '1%',
  },
  courseImage: {
    width: '100%',
    height: 160,
  },
  courseContent: {
    padding: 12,
  },
  courseTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'right',
  },
  courseInstructor: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 12,
    textAlign: 'right',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  coursePrice: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
    color: Colors.accent.primary,
  },
});