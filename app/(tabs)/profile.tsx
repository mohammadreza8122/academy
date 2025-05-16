import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import UserInfo from '@/components/profile/UserInfo';
import WalletOptions from '@/components/profile/WalletOptions';
import { USER } from '@/data/mockData';
import { PenLine, Power } from 'lucide-react-native';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };
  
  const handleIncreaseCredit = () => {
    console.log('Increase credit pressed');
  };
  
  const handleTransactionHistory = () => {
    console.log('Transaction history pressed');
  };
  
  const handleLogout = () => {
    console.log('Logout pressed');
  };

  return (
    <AuthGuard>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || 'کاربر IBC'}</Text>
          <Text style={styles.phone}>{user?.phone || ''}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>دوره‌های من</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>مقالات من</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <UserInfo user={USER} onEditProfile={handleEditProfile} />
          
          <WalletOptions
            onIncreaseCredit={handleIncreaseCredit}
            onTransactionHistory={handleTransactionHistory}
          />
          
          {/* Add some bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.background.secondary,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  phone: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.background.primary,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.outline.default,
  },
  statNumber: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.accent.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
  bottomPadding: {
    height: 80,
  },
});