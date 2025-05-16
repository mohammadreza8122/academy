import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ViewStyle,
  Keyboard,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
  error?: string;
}

export default function OTPInput({
  value,
  onChange,
  style,
  error,
}: OTPInputProps) {
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const handleChangeText = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const finalValue = newValue.join('');
    onChange(finalValue);

    if (text.length === 1 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>کد فعال‌سازی را وارد کنید</Text>
      <Text style={styles.description}>
        کد ۵ رقمی ارسال شده به شماره {value} را وارد کنید
      </Text>
      <View style={styles.inputsContainer}>
        {[0, 1, 2, 3, 4].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused,
              error && styles.inputError,
            ]}
            value={value[index] || ''}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
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
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'right',
  },
  inputsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 8,
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.outline.default,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
  },
  inputFocused: {
    borderColor: Colors.accent.primary,
    backgroundColor: Colors.background.primary,
  },
  inputError: {
    borderColor: Colors.status.error,
  },
  errorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
    marginTop: 4,
    textAlign: 'right',
  },
}); 