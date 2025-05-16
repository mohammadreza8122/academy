import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Video, Bookmark, FolderOpen, Tv, Mic } from 'lucide-react-native';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { router } from 'expo-router';

const quickAccessItems = [
  { 
    icon: Video, 
    label: 'استوری', 
    color: Colors.accent.primary,
    route: '/(tabs)/videos'
  },
  { 
    icon: Bookmark, 
    label: 'علاقه‌مندی‌ها', 
    color: Colors.accent.secondary,
    route: '/(tabs)/profile'
  },
  { 
    icon: FolderOpen, 
    label: 'فایل‌ها', 
    color: Colors.accent.tertiary,
    route: '/(tabs)/courses'
  },
  { 
    icon: Tv, 
    label: 'الایو', 
    color: Colors.accent.quaternary,
    route: '/(tabs)/videos'
  },
  { 
    icon: Mic, 
    label: 'پادکست‌ها', 
    color: Colors.accent.quinary,
    route: '/(tabs)/podcasts'
  },
];

export default function QuickAccess() {
  const isDesktop = useIsDesktop();

  const handleItemPress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={[styles.container, isDesktop && styles.containerDesktop]}>
      {quickAccessItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.item}
          onPress={() => handleItemPress(item.route)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <item.icon size={24} color="white" />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: Colors.background.primary,
  },
  containerDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  item: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
}); 