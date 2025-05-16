import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, I18nManager } from 'react-native';
import { Chrome as Home, BookOpen, Bell, User, Phone, FileText } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import i18n from '@/utils/i18n';
import MainHeader from '@/components/layout/MainHeader';

// Ensure RTL is enabled
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <MainHeader />,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: Colors.tab.active,
        tabBarInactiveTintColor: Colors.tab.inactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'خانه',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: i18n.t('courses'),
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: i18n.t('articles'),
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: i18n.t('notifications'),
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'پروفایل',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: i18n.t('support'),
          tabBarIcon: ({ size, color }) => (
            <Phone size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tab.background,
    borderTopWidth: 1,
    borderTopColor: Colors.outline.default,
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabLabel: {
    fontFamily: 'Vazirmatn_400Regular',
    fontSize: 10,
    textAlign: 'center',
  },
});