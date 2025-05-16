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
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ArrowLeft, User, Mail, Phone, Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/hooks/useAuth';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState('');  // Default email as empty string
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState<string | null>(null);  // Default avatar as null
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('لطفا نام خود را وارد کنید');
      return;
    }

    if (!email.trim()) {
      setError('لطفا ایمیل خود را وارد کنید');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Implement profile update logic
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (err) {
      setError('خطا در ثبت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.headerTitle}>ویرایش پروفایل</Text>
        </View>

        <Card style={styles.card}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handlePickImage}
          >
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Camera size={32} color={Colors.text.tertiary} />
              </View>
            )}
            <Text style={styles.avatarText}>تغییر تصویر پروفایل</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <User color={Colors.text.tertiary} size={20} />
            <TextInput
              style={styles.input}
              placeholder="نام و نام خانوادگی"
              value={name}
              onChangeText={setName}
              textAlign="right"
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail color={Colors.text.tertiary} size={20} />
            <TextInput
              style={styles.input}
              placeholder="ایمیل"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              textAlign="right"
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone color={Colors.text.tertiary} size={20} />
            <TextInput
              style={styles.input}
              placeholder="شماره موبایل"
              value={phone}
              editable={false}
              textAlign="right"
            />
          </View>

          <Button
            title="ذخیره تغییرات"
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
          />

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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.accent.primary,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outline.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
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
    marginTop: 8,
  },
  errorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
    textAlign: 'center',
    marginTop: 16,
  },
}); 