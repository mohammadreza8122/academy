import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle[] => {
    const buttonStyles: ViewStyle[] = [styles.button];

    // Add variant styles
    if (variant === 'primary') {
      buttonStyles.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      buttonStyles.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      buttonStyles.push(styles.outlineButton);
    }

    // Add size styles
    if (size === 'small') {
      buttonStyles.push(styles.smallButton);
    } else if (size === 'medium') {
      buttonStyles.push(styles.mediumButton);
    } else if (size === 'large') {
      buttonStyles.push(styles.largeButton);
    }

    // Add fullWidth style
    if (fullWidth) {
      buttonStyles.push(styles.fullWidth);
    }

    // Add disabled style
    if (disabled) {
      buttonStyles.push(styles.disabledButton);
    }

    // Add custom styles
    if (style) {
      buttonStyles.push(style);
    }

    return buttonStyles;
  };

  const getTextStyles = (): TextStyle[] => {
    const textStyles: TextStyle[] = [styles.buttonText];

    // Add variant text styles
    if (variant === 'primary') {
      textStyles.push(styles.primaryButtonText);
    } else if (variant === 'secondary') {
      textStyles.push(styles.secondaryButtonText);
    } else if (variant === 'outline') {
      textStyles.push(styles.outlineButtonText);
    }

    // Add size text styles
    if (size === 'small') {
      textStyles.push(styles.smallButtonText);
    } else if (size === 'large') {
      textStyles.push(styles.largeButtonText);
    }

    // Add disabled text style
    if (disabled) {
      textStyles.push(styles.disabledButtonText);
    }

    // Add custom text styles
    if (textStyle) {
      textStyles.push(textStyle);
    }

    return textStyles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? Colors.accent.primary : Colors.text.inverse}
        />
      ) : (
        <>
          {icon}
          <Text style={getTextStyles()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: Colors.accent.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.accent.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.accent.primary,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  mediumButton: {
    // Default styles
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  primaryButtonText: {
    color: Colors.text.inverse,
  },
  secondaryButtonText: {
    color: Colors.text.inverse,
  },
  outlineButtonText: {
    color: Colors.accent.primary,
  },
  smallButtonText: {
    fontSize: Typography.fontSize.sm,
  },
  largeButtonText: {
    fontSize: Typography.fontSize.lg,
  },
  disabledButtonText: {
    // No specific text style for disabled buttons
  },
});