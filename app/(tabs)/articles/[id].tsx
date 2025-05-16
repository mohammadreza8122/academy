import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share2, Flag } from 'lucide-react-native';
import Card from '@/components/ui/Card';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = React.useState('');

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // Implement share functionality
  };

  const handleReport = () => {
    // Implement report functionality
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مقاله</Text>
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

        <View style={styles.articleContent}>
          <Text style={styles.title}>استراتژی‌های معاملاتی موفق در بازار فارکس</Text>
          
          <View style={styles.authorInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }}
              style={styles.authorAvatar}
            />
            <View style={styles.authorText}>
              <Text style={styles.authorName}>دکتر علی محمدی</Text>
              <Text style={styles.publishDate}>۲۳ اردیبهشت ۱۴۰۴</Text>
            </View>
          </View>

          <Text style={styles.content}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
          </Text>

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

            <TouchableOpacity style={styles.interactionButton} onPress={handleReport}>
              <Flag size={20} color={Colors.status.error} />
              <Text style={[styles.interactionText, styles.reportText]}>گزارش</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>نظرات</Text>
            
            <Card style={styles.commentInput}>
              <TextInput
                style={styles.input}
                placeholder="نظر خود را بنویسید..."
                value={comment}
                onChangeText={setComment}
                multiline
                textAlign="right"
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>ارسال نظر</Text>
              </TouchableOpacity>
            </Card>

            {/* Example Comment */}
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
                مقاله بسیار مفیدی بود. ممنون از اشتراک‌گذاری تجربیات ارزشمندتون.
              </Text>
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
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['2xl'],
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  authorInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 12,
  },
  authorText: {
    flex: 1,
  },
  authorName: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  publishDate: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  content: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 24,
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
  reportText: {
    color: Colors.status.error,
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
  commentsSection: {
    marginTop: 24,
  },
  commentsTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  commentInput: {
    marginBottom: 16,
  },
  input: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 12,
  },
  submitButton: {
    backgroundColor: Colors.accent.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.inverse,
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
    textAlign: 'right',
  },
});