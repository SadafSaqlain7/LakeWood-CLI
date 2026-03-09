import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useState } from 'react';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GobackArrow from '../components/ui/GobackArrow';
import { fonts } from '../../theme/theme';



const FAQS_DATA = [
  {
    id: '1',
    question: 'What is Lakewood Post?',
    answer:
      'djoijpfeocnpeo okpwer-e0rookpeorkcv ijewpo-rpoervm hifpwipncwep nciwopnnvwp',
  },
  {
    id: '2',
    question: 'How to use Lakewood Post?',
    answer:
      'You can browse posts, create listings, and connect with people in your area easily.',
  },
  {
    id: '3',
    question: 'How to use Lakewood Post?',
    answer:
      'Find items near you, chat with sellers, and manage your profile from the app.',
  },
  {
    id: '4',
    question: 'How do I exit the app?',
    answer:
      'Simply close the app from your recent apps screen.',
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <Pressable
      style={[styles.card, isOpen && styles.cardOpen]}
      onPress={onToggle}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.question}>{item.question}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#fff"
        />
      </View>

      {isOpen && (
        <Text style={styles.answer}>{item.answer}</Text>
      )}
    </Pressable>
  );
}

export default function Faqs() {
  const [openId, setOpenId] = useState(''); 

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.Container}>
      
      <View style={styles.header}>
        <GobackArrow />
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 24 }} />
      </View>

      
      <View style={styles.content}>
        {FAQS_DATA.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: '#000',
  },

  content: {
    marginTop: 10,
  },

  card: {
    backgroundColor: '#167738',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  cardOpen: {
    paddingBottom: 18,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  question: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },

  answer: {
    marginTop: 10,
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: '#E8F5EE',
    lineHeight: 18,
  },
});