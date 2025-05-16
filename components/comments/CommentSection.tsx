import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  contentId: string;
  contentType: 'course' | 'article';
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => void;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}

export default function CommentSection({
  contentId,
  contentType,
  comments,
  onAddComment,
  onLike,
  onDislike,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment, replyingTo || undefined);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} style={[styles.comment, isReply && styles.replyComment]}>
      <View style={styles.commentHeader}>
        <Image source={{ uri: comment.author.avatar }} style={styles.avatar} />
        <View style={styles.commentMeta}>
          <Text style={styles.authorName}>{comment.author.name}</Text>
          <Text style={styles.date}>{comment.date}</Text>
        </View>
      </View>
      
      <Text style={styles.commentText}>{comment.text}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => onLike(comment.id)}
        >
          <ThumbsUp size={16} color={Colors.text.secondary} />
          <Text style={styles.actionCount}>{comment.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.action}
          onPress={() => onDislike(comment.id)}
        >
          <ThumbsDown size={16} color={Colors.text.secondary} />
          <Text style={styles.actionCount}>{comment.dislikes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.action}
          onPress={() => setReplyingTo(comment.id)}
        >
          <MessageCircle size={16} color={Colors.text.secondary} />
          <Text style={styles.actionText}>پاسخ</Text>
        </TouchableOpacity>
      </View>

      {comment.replies?.map((reply) => renderComment(reply, true))}
      
      {replyingTo === comment.id && (
        <View style={styles.replyInput}>
          <TextInput
            style={styles.input}
            placeholder="پاسخ خود را بنویسید..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
            textAlign="right"
          />
          <View style={styles.replyActions}>
            <Button
              title="ارسال پاسخ"
              variant="primary"
              size="small"
              onPress={handleSubmitComment}
              style={styles.submitButton}
            />
            <Button
              title="انصراف"
              variant="outline"
              size="small"
              onPress={() => setReplyingTo(null)}
              style={styles.cancelButton}
            />
          </View>
        </View>
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>نظرات</Text>
      
      <Card style={styles.newComment}>
        <TextInput
          style={styles.input}
          placeholder="نظر خود را بنویسید..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
          textAlign="right"
        />
        <Button
          title="ارسال نظر"
          variant="primary"
          onPress={handleSubmitComment}
          style={styles.submitButton}
        />
      </Card>

      {comments.map((comment) => renderComment(comment))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  newComment: {
    marginBottom: 24,
  },
  input: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 12,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 8,
  },
  comment: {
    marginBottom: 16,
  },
  replyComment: {
    marginLeft: 32,
    marginTop: 8,
    borderRightWidth: 2,
    borderRightColor: Colors.accent.primary,
  },
  commentHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
  commentMeta: {
    flex: 1,
  },
  authorName: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
  },
  date: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  commentText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: 12,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  action: {
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
  actionText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginRight: 4,
  },
  replyInput: {
    marginTop: 12,
  },
  replyActions: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: 8,
    gap: 8,
  },
  cancelButton: {
    minWidth: 80,
  },
});