import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import LogoMini from '../assets/svgs/Logo2.svg';
import ChatProfile from '../assets/svgs/chatprofile.svg';
import Navbar from '../components/ui/Navbar';
import { fonts } from '../theme/theme';

const CHAT_DATA = [
  {
    id: '1',
    name: 'alex jahanid',
    message: 'My pleasure. All the best for...',
    time: 'Today, 10:00 AM',
  },
  {
    id: '2',
    name: 'ajdkio ajdioiod',
    message: 'Your solution is great!',
    time: 'Yesterday, 18:00 PM',
  },
  {
    id: '3',
    name: 'ajsjf jaslkpo',
    message: 'Thanks for the help',
    time: '20/12/2023',
  },
];

export default function Chats({ navigation }) {
  return (
    <View style={styles.container}>

      
      <View style={styles.header}>
        <LogoMini style={styles.logoImage} />
        <Text style={styles.title}>Chats</Text>
        <View style={{ width: 80 }} />
      </View>

      <FlatList
        data={CHAT_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.chatItem}
            onPress={() => navigation.navigate('Chatdetails', { user: item })}
          >
           
            <ChatProfile width={45} height={45} />

            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>

            <Text style={styles.time}>{item.time}</Text>
          </Pressable>
        )}
      />

      <Navbar navigation={navigation} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  logoImage: {
    width: 108,
    height: 62,
    marginTop: 10,
  },

  title: {
    fontFamily: fonts.Bold,
    fontSize: 18,
  },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },

  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
  },

  message: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: '#777',
  },

  time: {
    fontSize: 11,
    color: '#999',
  },
});