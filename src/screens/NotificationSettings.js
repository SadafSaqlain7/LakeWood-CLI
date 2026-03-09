import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import { fonts } from '../../theme/theme';

export default function NotificationSettings() {
  const [generalNotification, setGeneralNotification] = useState(false);
  const [sound, setSound] = useState(false);

  return (
    <View style={styles.Container}>
      
      <View style={styles.header}>
        <GobackArrow />
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 24 }} />
      </View>

      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>General Notification</Text>
          <Switch
            value={generalNotification}
            onValueChange={setGeneralNotification}
            trackColor={{ false: '#E0E0E0',  }}
            thumbColor={generalNotification ? '#167738' : '#fff'}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Sound</Text>
          <Switch
            value={sound}
            onValueChange={setSound}
            trackColor={{ false: '#E0E0E0', true: '#CDEED8' }}
            thumbColor={sound ? '#167738' : '#fff'}
          />
        </View>
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginTop: 0
  },

  label: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: '#000',
  },
});