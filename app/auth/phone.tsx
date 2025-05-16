import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import PhoneInput from '@/components/ui/PhoneInput';
import Button from '@/components/ui/Button';

export default function PhonePage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (phone.length !== 10) {
      setError('لطفاً شماره موبایل معتبر وارد کنید');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // TODO: Call API to send OTP
      // For now, just navigate to OTP page
      router.push({
        pathname: '/auth/verify',
        params: { phone: `+98${phone}` },
      });
    } catch (err) {
      setError('خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>خوش آمدید</Text>
        <Text style={styles.description}>
          لطفا شماره موبایل خود را وارد کنید تا کد فعال سازی برایتان پیامک شود.
        </Text>
      </View>

      <View style={styles.form}>
        <PhoneInput
          value={phone}
          onChangeText={setPhone}
          error={error}
        />
        <Button
          title="دریافت کد فعال‌سازی"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
}); 