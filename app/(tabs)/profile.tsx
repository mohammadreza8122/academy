import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ProfileTab() {
  useEffect(() => {
    // Redirect to the main profile page
    router.replace('/profile');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background.primary }}>
      <ActivityIndicator size="large" color={Colors.accent.primary} />
    </View>
  );
} 