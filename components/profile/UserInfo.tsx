import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { User } from '../../types';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { User as UserIcon, PenLine } from 'lucide-react-native';
import Card from '../ui/Card';

interface UserInfoProps {
  user: User;
  onEditProfile: () => void;
}

export default function UserInfo({ user, onEditProfile }: UserInfoProps) {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <UserIcon size={36} color={Colors.text.tertiary} />
            </View>
          )}
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phoneNumber}</Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <View style={styles.balanceTag}>
          <Text style={styles.balanceText}>
            اعتبار کیف پول شما: {user.walletBalance.toLocaleString()} تومان
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginLeft: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  userPhone: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balanceTag: {
    backgroundColor: Colors.accent.primary + '20', // 20% opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  balanceText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.accent.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});