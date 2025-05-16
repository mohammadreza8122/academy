import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  error?: string;
}

export default function PhoneInput({
  value,
  onChangeText,
  style,
  error,
}: PhoneInputProps) {
  // Remove any non-numeric characters and format the phone number
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    onChangeText(cleaned);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>شماره همراه</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={formatPhoneNumber}
          placeholder="شماره موبایل خود را وارد کنید"
          keyboardType="number-pad"
          maxLength={10}
          textAlign="left"
          placeholderTextColor={Colors.text.secondary}
        />
        <View style={styles.prefix}>
          <Text style={styles.prefixText}>+98</Text>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outline.default,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
  },
  inputError: {
    borderColor: Colors.status.error,
  },
  prefix: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: Colors.outline.default,
  },
  prefixText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  errorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
    marginTop: 4,
    textAlign: 'right',
  },
}); 