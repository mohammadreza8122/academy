import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft } from 'lucide-react-native';

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  // Placeholder data
  const video = {
    id: id,
    title: `ویدیوی شماره ${id}`,
    description: 'توضیحات مربوط به این ویدیو در اینجا قرار می‌گیرد.',
    // Add other relevant fields like videoUrl, thumbnailUrl, author, date, etc.
  };

  if (!video) {
    return <Text>ویدیو یافت نشد.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{video.title}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft color={Colors.text.secondary} size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        {/* Add video player component here */}
        <Text style={styles.description}>{video.description}</Text>
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
    textAlign: 'center',
    flex: 1,
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
  content: {
    padding: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['xl'],
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: 'right',
  },
}); 