import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Phone, ArrowLeft } from 'lucide-react-native';

export default function RegisterScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 11) {
      setError('لطفا شماره تلفن معتبر وارد کنید');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement OTP sending logic
      setOtpSent(true);
    } catch (err) {
      setError('خطا در ارسال کد تایید');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setError('لطفا کد تایید را وارد کنید');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement OTP verification logic
      router.push('/auth/complete-profile');
    } catch (err) {
      setError('کد تایید نامعتبر است');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleBack = () => {
    if (otpSent) {
      setOtpSent(false);
      setOtp('');
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={Colors.text.secondary} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {otpSent ? 'تایید شماره تلفن' : 'ثبت نام'}
          </Text>
        </View>

        <Card style={styles.card}>
          {!otpSent ? (
            <>
              <View style={styles.inputContainer}>
                <Phone color={Colors.text.tertiary} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="شماره تلفن همراه"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={11}
                  textAlign="right"
                />
              </View>

              <Button
                title="ارسال کد تایید"
                onPress={handleSendOtp}
                loading={loading}
                style={styles.button}
              />

              <TouchableOpacity
                style={styles.loginLink}
                onPress={handleLogin}
              >
                <Text style={styles.loginText}>
                  حساب کاربری دارید؟{' '}
                  <Text style={styles.loginLinkText}>وارد شوید</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.otpMessage}>
                کد تایید به شماره {phoneNumber} ارسال شد
              </Text>

              <View style={styles.otpContainer}>
                <TextInput
                  style={styles.otpInput}
                  placeholder="- - - -"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={4}
                  textAlign="center"
                />
              </View>

              <Button
                title="تایید و ادامه"
                onPress={handleVerifyOtp}
                loading={loading}
                style={styles.button}
              />

              <TouchableOpacity
                style={styles.resendLink}
                onPress={handleSendOtp}
                disabled={loading}
              >
                <Text style={styles.resendText}>ارسال مجدد کد</Text>
              </TouchableOpacity>
            </>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    flex: 1,
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    textAlign: 'right',
    marginRight: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 24,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outline.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginRight: 8,
  },
  button: {
    marginBottom: 16,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  loginLinkText: {
    color: Colors.accent.primary,
    fontFamily: Typography.fontFamily.medium,
  },
  otpMessage: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    marginBottom: 24,
  },
  otpInput: {
    height: 56,
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.text.primary,
    textAlign: 'center',
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: Colors.outline.default,
    borderRadius: 8,
  },
  resendLink: {
    alignItems: 'center',
  },
  resendText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.accent.primary,
  },
  errorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
    textAlign: 'center',
    marginTop: 16,
  },
});