import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/utils/api';
import type { User } from '@/types/auth';

export default function ProfilePage() {
  const { user: authUser, updateUser, logout } = useAuth();
  const [user, setUser] = useState<User | null>(authUser);
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = await api.user.getProfile();
      setUser(userData);
      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');
      setEmail(userData.email || '');
      
      // اگر کاربر جدید است و اطلاعاتش کامل نیست، به صفحه تکمیل پروفایل هدایت شود
      if (!userData.first_name && !userData.last_name && !userData.email) {
        router.replace('/auth/complete-profile');
        return;
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // اگر خطای 401 داشتیم یعنی توکن منقضی شده
      if ((error as any)?.response?.status === 401) {
        await logout();
        router.replace('/auth/phone');
        return;
      }
    } finally {
      setInitialLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  };

  const validateEmail = (email: string) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'لطفاً یک ایمیل معتبر وارد کنید';
    }
    return '';
  };

  const handleSubmit = async () => {
    // Reset errors
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
    });

    // Validate email if provided
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      return;
    }

    setLoading(true);

    try {
      const updatedUser = await api.user.updateProfile({
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        email: email || undefined,
      });

      // Update user in auth state and local state
      updateUser(updatedUser);
      setUser(updatedUser);
      
      // بعد از ذخیره موفق، کاربر به صفحه اصلی برنامه هدایت شود
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle specific error cases if needed
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/phone');
  };

  // نمایش loading اولیه
  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.accent.primary} />
      </View>
    );
  }

  // اگر کاربر لاگین نیست، به صفحه ورود هدایت شود
  if (!user) {
    router.replace('/auth/phone');
    return null;
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[Colors.accent.primary]}
          tintColor={Colors.accent.primary}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>پروفایل</Text>
        <Text style={styles.phoneNumber}>{user.phone_number}</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="نام"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="نام خود را وارد کنید"
          error={errors.firstName}
          containerStyle={styles.input}
        />

        <TextInput
          label="نام خانوادگی"
          value={lastName}
          onChangeText={setLastName}
          placeholder="نام خانوادگی خود را وارد کنید"
          error={errors.lastName}
          containerStyle={styles.input}
        />

        <TextInput
          label="ایمیل"
          value={email}
          onChangeText={setEmail}
          placeholder="ایمیل خود را وارد کنید"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.input}
        />

        <Button
          title="ذخیره تغییرات"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          style={styles.button}
        />

        <Button
          title="خروج از حساب کاربری"
          onPress={handleLogout}
          variant="outline"
          fullWidth
          style={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  phoneNumber: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    direction: 'ltr',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  logoutButton: {
    marginTop: 16,
  },
}); 