import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { X, LogOut, Settings, HelpCircle, FileText, BookOpen } from 'lucide-react-native';
import { router } from 'expo-router';

interface MenuProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Menu({ visible, onClose, onLogout }: MenuProps) {
  const menuItems = [
    {
      icon: <BookOpen size={24} color={Colors.text.secondary} />,
      title: 'دوره‌های من',
      onPress: () => router.push('/(tabs)/courses'),
    },
    {
      icon: <FileText size={24} color={Colors.text.secondary} />,
      title: 'مقالات من',
      onPress: () => router.push('/(tabs)/articles'),
    },
    {
      icon: <Settings size={24} color={Colors.text.secondary} />,
      title: 'تنظیمات',
      onPress: () => router.push('/(tabs)/profile'),
    },
    {
      icon: <HelpCircle size={24} color={Colors.text.secondary} />,
      title: 'راهنما',
      onPress: () => router.push('/(tabs)/support'),
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
            <Text style={styles.title}>منو</Text>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.userSection}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>محمد صالحی</Text>
                <Text style={styles.userEmail}>۰۹۳۵۲۵۵۴۸۵۰</Text>
              </View>
            </View>

            <View style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    onClose();
                    item.onPress();
                  }}
                >
                  {item.icon}
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <LogOut size={24} color={Colors.status.error} />
              <Text style={styles.logoutText}>خروج از حساب کاربری</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: '80%',
    maxWidth: 360,
    height: '100%',
    backgroundColor: Colors.background.primary,
    marginLeft: 'auto',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'right',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row-reverse',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 16,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  userEmail: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'right',
    marginTop: 4,
  },
  menuItems: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginRight: 16,
  },
  logoutButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.outline.default,
  },
  logoutText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.status.error,
    marginRight: 16,
  },
});