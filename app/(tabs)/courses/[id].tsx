import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, MessageSquare } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CourseScreen() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // Implement share functionality
  };

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Implement send message functionality
      setChatMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>دوره آموزشی</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft color={Colors.text.secondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg' }}
          style={styles.coverImage}
        />

        <View style={styles.courseContent}>
          <Text style={styles.title}>دوره جامع تحلیل تکنیکال</Text>
          
          <View style={styles.instructorInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }}
              style={styles.instructorAvatar}
            />
            <View style={styles.instructorText}>
              <Text style={styles.instructorName}>دکتر علی محمدی</Text>
              <Text style={styles.courseStats}>۲۳۰۰ دانشجو | ۴.۸ امتیاز</Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.price}>۲,۵۰۰,۰۰۰ تومان</Text>
            <Button 
              title="ثبت نام در دوره"
              variant="primary"
              onPress={() => {}}
              style={styles.enrollButton}
            />
          </View>

          <View style={styles.description}>
            <Text style={styles.sectionTitle}>توضیحات دوره</Text>
            <Text style={styles.descriptionText}>
              در این دوره جامع، شما با اصول و مفاهیم پیشرفته تحلیل تکنیکال آشنا خواهید شد. از مباحث پایه تا استراتژی‌های پیشرفته معاملاتی را خواهید آموخت.
            </Text>
          </View>

          <View style={styles.curriculum}>
            <Text style={styles.sectionTitle}>سرفصل‌های دوره</Text>
            <Card style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>فصل ۱: مقدمه و آشنایی با تحلیل تکنیکال</Text>
              <Text style={styles.curriculumDuration}>۱۲ جلسه - ۳ ساعت</Text>
            </Card>
            <Card style={styles.curriculumItem}>
              <Text style={styles.curriculumTitle}>فصل ۲: الگوهای نموداری</Text>
              <Text style={styles.curriculumDuration}>۱۵ جلسه - ۴ ساعت</Text>
            </Card>
          </View>

          <View style={styles.interactions}>
            <TouchableOpacity style={styles.interactionButton} onPress={handleShare}>
              <Share2 size={20} color={Colors.text.secondary} />
              <Text style={styles.interactionText}>اشتراک‌گذاری</Text>
            </TouchableOpacity>
            
            <View style={styles.votes}>
              <TouchableOpacity style={styles.voteButton}>
                <ThumbsUp size={20} color={Colors.text.secondary} />
                <Text style={styles.voteCount}>۱۲۳</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.voteButton}>
                <ThumbsDown size={20} color={Colors.text.secondary} />
                <Text style={styles.voteCount}>۱۲</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.interactionButton} onPress={handleChatToggle}>
              <MessageSquare size={20} color={Colors.accent.primary} />
              <Text style={[styles.interactionText, styles.chatText]}>چت روم</Text>
            </TouchableOpacity>
          </View>

          {showChat && (
            <Card style={styles.chatRoom}>
              <Text style={styles.chatTitle}>چت روم دوره</Text>
              <ScrollView style={styles.chatMessages}>
                <View style={styles.message}>
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg' }}
                    style={styles.messageAvatar}
                  />
                  <View style={styles.messageContent}>
                    <Text style={styles.messageSender}>رضا کریمی</Text>
                    <Text style={styles.messageText}>سلام استاد، کی کلاس بعدی برگزار میشه؟</Text>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.chatInput}>
                <TextInput
                  style={styles.input}
                  placeholder="پیام خود را بنویسید..."
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  multiline
                  textAlign="right"
                />
                <Button
                  title="ارسال"
                  variant="primary"
                  size="small"
                  onPress={handleSendMessage}
                  style={styles.sendButton}
                />
              </View>
            </Card>
          )}

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>نظرات</Text>
            
            <Card style={styles.commentInput}>
              <TextInput
                style={styles.input}
                placeholder="نظر خود را بنویسید..."
                value={comment}
                onChangeText={setComment}
                multiline
                textAlign="right"
              />
              <Button
                title="ارسال نظر"
                variant="primary"
                onPress={() => {}}
                style={styles.submitButton}
              />
            </Card>

            <Card style={styles.comment}>
              <View style={styles.commentHeader}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg' }}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentMeta}>
                  <Text style={styles.commentAuthor}>رضا کریمی</Text>
                  <Text style={styles.commentDate}>۲۰ اردیبهشت ۱۴۰۴</Text>
                </View>
              </View>
              <Text style={styles.commentText}>
                دوره بسیار عالی و کاربردی بود. ممنون از اشتراک‌گذاری تجربیات ارزشمندتون.
              </Text>
              <View style={styles.commentActions}>
                <TouchableOpacity style={styles.commentAction}>
                  <ThumbsUp size={16} color={Colors.text.secondary} />
                  <Text style={styles.actionCount}>۱۲</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentAction}>
                  <ThumbsDown size={16} color={Colors.text.secondary} />
                  <Text style={styles.actionCount}>۲</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
    position: 'relative',
  },
  headerTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
  },
  backButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  courseContent: {
    padding: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  instructorInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 12,
  },
  instructorText: {
    flex: 1,
  },
  instructorName: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  courseStats: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  priceSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: Colors.background.tertiary,
    padding: 16,
    borderRadius: 12,
  },
  price: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.accent.primary,
  },
  enrollButton: {
    minWidth: 120,
  },
  description: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'right',
  },
  descriptionText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: 'right',
  },
  curriculum: {
    marginBottom: 24,
  },
  curriculumItem: {
    marginBottom: 8,
  },
  curriculumTitle: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'right',
  },
  curriculumDuration: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  interactions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.outline.default,
    marginBottom: 24,
  },
  interactionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  interactionText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  chatText: {
    color: Colors.accent.primary,
  },
  votes: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  voteButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginLeft: 16,
  },
  voteCount: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginRight: 4,
  },
  chatRoom: {
    marginBottom: 24,
  },
  chatTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  chatMessages: {
    maxHeight: 300,
    marginBottom: 16,
  },
  message: {
    flexDirection: 'row-reverse',
    marginBottom: 12,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'right',
  },
  messageText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'right',
  },
  chatInput: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    minHeight: 40,
    maxHeight: 100,
    textAlignVertical: 'top',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendButton: {
    minWidth: 80,
  },
  commentsSection: {
    marginTop: 24,
  },
  commentInput: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  comment: {
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
  },
  commentMeta: {
    flex: 1,
  },
  commentAuthor: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  commentDate: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  commentText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: 8,
    textAlign: 'right',
  },
  commentActions: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  commentAction: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionCount: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginRight: 4,
  },
});