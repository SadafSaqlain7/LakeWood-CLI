import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';

import { useState, useRef } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import ChatProfile from '../assets/svgs/chatprofile.svg';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../theme/theme';

export default function ChatConversation({ navigation, route }) {
  const { sellerName = 'Luke Skywalker', product } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: "Hi, yes it is available.", type: 'received' },
    { id: '2', text: "Would you accept $15?", type: 'sent' },
  ]);

  const flatListRef = useRef(null);
  const Icon = product?.Icon;

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      type: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>

        
        <View style={styles.header}>
          <GobackArrow />
          <View style={styles.userRow}>
            <ChatProfile width={35} height={35} />
            <Text style={styles.username}>{sellerName}</Text>
          </View>
          <View style={styles.circle}>
            <Ionicons name="ellipsis-horizontal" size={16} />
          </View>
        </View>

       
        <View style={styles.productCard}>
          {Icon && <Icon width={60} height={60} />}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.productName}>{product?.name}</Text>
            <Text style={styles.productDesc} numberOfLines={2}>
              {product?.description}
            </Text>
            <Text style={styles.price}>${product?.price}</Text>
          </View>
        </View>

        {/* MESSAGES LIST */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.type === 'sent'
                  ? styles.sentBubble
                  : styles.receivedBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        {/* INPUT SECTION */}
        <View style={styles.bottomContainer}>

          <View style={styles.inputWrapper}>

            <Pressable onPress={() => console.log('Emoji')}>
              <Ionicons name="happy-outline" size={22} color="#167738" />
            </Pressable>

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message ..."
              placeholderTextColor="#999"
              style={styles.input}
              multiline
            />

            <Pressable onPress={() => console.log('Attach')}>
              <Ionicons name="attach-outline" size={22} color="#167738" />
            </Pressable>

            <Pressable
              onPress={() => console.log('Camera')}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="camera-outline" size={22} color="#167738" />
            </Pressable>

          </View>

          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="paper-plane" size={20} color="#fff" />
          </Pressable>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  username: {
    fontFamily: fonts.Bold,
    fontSize: 16,
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgb(26, 25, 25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* PRODUCT CARD */

  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },

  productName: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
  },

  productDesc: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },

  price: {
    fontFamily: fonts.Bold,
    color: '#167738',
  },

  /* MESSAGES */

  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
    maxWidth: '75%',
  },

  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#167738',
  },

  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#3BA0D0',
  },

  messageText: {
    color: '#fff',
    fontSize: 13,
  },

  /* INPUT SECTION */

  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 28,
    paddingHorizontal: 14,
    height: 55,
  },

  input: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 10,
  },

  sendButton: {
    marginLeft: 12,
    backgroundColor: '#167738',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

});