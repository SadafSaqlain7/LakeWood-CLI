import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GobackArrow from '../components/ui/GobackArrow';
import ChatProfile from '../assets/svgs/chatprofile.svg';
import { fonts } from '../theme/theme';
import { useState } from 'react';

const MESSAGES = [
  { id: '1', text: "Hi. I'm interested in the blue dress you posted. Is it still available?", type: 'sent' },
  { id: '2', text: "Hi, yes it is. It's a size M and in good condition.", type: 'received' },
  { id: '3', text: "Would you accept $15?", type: 'sent' },
];

export default function ChatDetail({ route }) {
  const { user } = route.params;
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <GobackArrow />

        <View style={styles.headerUser}>
          <ChatProfile width={35} height={35} />
          <Text style={styles.headerTitle}>{user.name}</Text>
        </View>

        <View style={styles.ellipsisCircle}>
          <Ionicons name="ellipsis-horizontal" size={16} color="#000" />
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.type === 'sent' ? styles.sent : styles.received,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <Pressable style={styles.sendButton}>
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
  ellipsisCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#DADADA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '75%',
  },

  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#167738',
  },

  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#3BA0D0',
  },

  messageText: {
    color: '#fff',
    fontFamily: fonts.Regular,
    fontSize: 13,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
  },

  sendButton: {
    backgroundColor: '#167738',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});