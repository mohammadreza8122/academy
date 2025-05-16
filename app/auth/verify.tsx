import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import OTPInput from '@/components/ui/OTPInput';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyPage() {
  const { phone } = useLocalSearchParams();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(177); // 2:57 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendCode = async () => {
    if (timer > 0) return;
    
    try {
      // TODO: Call API to resend OTP
      setTimer(177);
    } catch (err) {
      setError('خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید');
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 5) {
      setError('لطفاً کد ۵ رقمی را کامل وارد کنید');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll consider any 5-digit code as valid
      // In real app, this should be validated by the backend
      login(phone as string);
      
      // Navigate to tabs
      router.replace('/(tabs)');
    } catch (err) {
      setError('کد وارد شده صحیح نیست');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تایید شماره موبایل</Text>
        <Text style={styles.description}>
          کد ۵ رقمی ارسال شده به شماره {phone} را وارد کنید
        </Text>
      </View>

      <View style={styles.form}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          error={error}
        />
        
        <TouchableOpacity
          onPress={handleResendCode}
          disabled={timer > 0}
          style={styles.resendContainer}
        >
          <Text
            style={[
              styles.resendText,
              timer > 0 && styles.resendTextDisabled,
            ]}
          >
            {timer > 0
              ? `ارسال مجدد کد تا ${formatTime(timer)}`
              : 'ارسال مجدد کد'}
          </Text>
        </TouchableOpacity>

        <Button
          title="ورود به اپلیکیشن"
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
  resendContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  resendText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.accent.primary,
  },
  resendTextDisabled: {
    color: Colors.text.secondary,
  },
  button: {
    marginTop: 16,
  },
}); 