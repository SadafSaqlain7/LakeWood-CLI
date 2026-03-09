import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import NotificationCard from '../components/ui/NotificationCard';
import { fonts } from '../theme/theme';
import { ROUTES } from '../theme/routes';

const initialNotifications = [
  {
    id: '1',
    section: 'Today',
    title: 'New Products added near you.',
    subtitle: 'Tap here to see all listings near you',
  },
  {
    id: '2',
    section: 'Yesterday',
    title: 'New Products Available',
    subtitle: 'New products are up for sale.',
  },
  {
    id: '3',
    section: 'May 4th, 2023',
    title: 'Account Setup Successful!',
    subtitle: 'Your account has been created',
  },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.Container}>
      <View style={styles.nameContainer}>
        <GobackArrow goToScreen={ROUTES.HOMESCREEN} />
        <Text style={styles.title}>Notification</Text>
        <View style={{ width: 20 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const prevSection = notifications[index - 1]?.section;
          const showSection = item.section !== prevSection;

          return (
            <View>
              {showSection && (
                <Text style={styles.sectionTitle}>{item.section}</Text>
              )}
              <NotificationCard item={item} onDelete={deleteNotification} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 55,
    paddingBottom: 100,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.Bold,
    color: '#000',
  },

  sectionTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
});