import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import SupportOptions from '@/components/support/SupportOptions';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SupportScreen() {
  const handleContactSupport = () => {
    console.log('Contact support pressed');
  };
  
  const handleAppTutorial = () => {
    console.log('App tutorial pressed');
  };
  
  const handleSendMessage = () => {
    console.log('Send message pressed');
  };
  
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>پشتیبانی</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft color={Colors.text.secondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <SupportOptions
          onContactSupport={handleContactSupport}
          onAppTutorial={handleAppTutorial}
          onSendMessage={handleSendMessage}
        />
        
        {/* Add some bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row-reverse', // RTL support
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
    writingDirection: 'rtl',
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
  scrollView: {
    flex: 1,
  },
  bottomPadding: {
    height: 80,
  },
});