import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Card from '../ui/Card';
import { Wallet, Receipt } from 'lucide-react-native';
import i18n from '../../utils/i18n';

interface WalletOptionsProps {
  onIncreaseCredit: () => void;
  onTransactionHistory: () => void;
}

export default function WalletOptions({
  onIncreaseCredit,
  onTransactionHistory,
}: WalletOptionsProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onIncreaseCredit}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Wallet color={Colors.accent.primary} size={24} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{i18n.t('increaseCredit')}</Text>
            <Text style={styles.optionDescription}>
              {i18n.t('increaseInfo')}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onTransactionHistory}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Receipt color={Colors.accent.primary} size={24} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{i18n.t('transactionHistory')}</Text>
            <Text style={styles.optionDescription}>
              {i18n.t('transactionsInfo')}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent.primary + '10', // 10% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  optionDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});