import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Video, Bookmark, FolderOpen, Tv, Mic } from 'lucide-react-native';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const quickAccessItems = [
  { icon: Video, label: 'استوری', color: Colors.accent.primary },
  { icon: Bookmark, label: 'علاقه‌مندی‌ها', color: Colors.accent.secondary },
  { icon: FolderOpen, label: 'فایل‌ها', color: Colors.accent.tertiary },
  { icon: Tv, label: 'الایو', color: Colors.accent.quaternary },
  { icon: Mic, label: 'پادکست‌ها', color: Colors.accent.quinary },
];

export default function QuickAccess() {
  const isDesktop = useIsDesktop();

  return (
    <View style={[styles.container, isDesktop && styles.containerDesktop]}>
      {quickAccessItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
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