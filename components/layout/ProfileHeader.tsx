import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { LogOut, Edit } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function ProfileHeader() {
  const { logout } = useAuth();

  const handleEditPress = () => {
    router.push('/profile/edit');
  };

  const handleLogoutPress = () => {
    logout();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleLogoutPress}
      >
        <LogOut size={24} color={Colors.status.error} />
      </TouchableOpacity>

      <Text style={styles.title}>پروفایل</Text>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleEditPress}
      >
        <Edit size={24} color={Colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
  },
  iconButton: {
    padding: 8,
  },
}); 