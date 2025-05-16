import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Category } from '../../types';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Video, Bookmark, FileText, Mic, Tv } from 'lucide-react-native';

interface CategoryMenuProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryMenu({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryMenuProps) {
  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    const iconColor = Colors.accent.primary;
    const iconSize = 24;

    switch (iconName) {
      case 'video':
        return <Video size={iconSize} color={iconColor} />;
      case 'bookmark':
        return <Bookmark size={iconSize} color={iconColor} />;
      case 'file-text':
        return <FileText size={iconSize} color={iconColor} />;
      case 'mic':
        return <Mic size={iconSize} color={iconColor} />;
      case 'tv':
        return <Tv size={iconSize} color={iconColor} />;
      default:
        return <FileText size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* "All" category option */}
        <TouchableOpacity
          style={[
            styles.categoryItem,
            activeCategory === null ? styles.activeCategory : {},
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <View style={styles.iconContainer}>
            <FileText size={24} color={Colors.accent.primary} />
          </View>
          <Text style={styles.categoryText}>همه</Text>
        </TouchableOpacity>

        {/* Dynamic categories */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              activeCategory === category.id ? styles.activeCategory : {},
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={styles.iconContainer}>
              {renderIcon(category.icon)}
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row-reverse', // RTL support
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    opacity: 0.7,
  },
  activeCategory: {
    opacity: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});