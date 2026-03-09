import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRef } from 'react';
import { fonts } from '../../../theme/theme';

export default function NotificationCard({ item, onDelete }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const revealDelete = () => {
    Animated.timing(translateX, {
      toValue: -60,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideDelete = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.cardWrapper}>
      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ translateX }] },
        ]}
      >
        <Pressable
          onLongPress={revealDelete}
          onPressOut={hideDelete}
          style={styles.cardContent}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="star" size={18} color="#167738" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
        </Pressable>
      </Animated.View>

      <Pressable style={styles.deleteContainer} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash" size={20} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 12,
    overflow: 'hidden',
  },

  cardContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
  },

  cardContent: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
  },

  deleteContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(181, 252, 206, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  cardTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: '#000',
  },

  cardSubtitle: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});