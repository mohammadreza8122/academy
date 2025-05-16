import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
}

interface ChatRoomProps {
  courseId: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function ChatRoom({ courseId, messages, onSendMessage }: ChatRoomProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>چت روم دوره</Text>
      
      <ScrollView style={styles.messages}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.message}>
            <Image source={{ uri: msg.sender.avatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.senderName}>{msg.sender.name}</Text>
                <Text style={styles.timestamp}>{msg.timestamp}</Text>
              </View>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="پیام خود را بنویسید..."
          value={message}
          onChangeText={setMessage}
          multiline
          textAlign="right"
        />
        <Button
          title="ارسال"
          variant="primary"
          size="small"
          onPress={handleSend}
          style={styles.sendButton}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'right',
  },
  messages: {
    maxHeight: 400,
  },
  message: {
    flexDirection: 'row-reverse',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
  messageContent: {
    flex: 1,
    backgroundColor: Colors.background.tertiary,
    padding: 12,
    borderRadius: 12,
  },
  messageHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  timestamp: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
  },
  messageText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlignVertical: 'top',
  },
  sendButton: {
    minWidth: 80,
  },
});