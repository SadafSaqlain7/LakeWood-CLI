import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import { fonts } from '../theme/theme';

export default function Language() {
  const [selected, setSelected] = useState('en');

  return (
    <View style={styles.Container}>
      
      <View style={styles.header}>
        <GobackArrow />
        <Text style={styles.headerTitle}>Language</Text>
        <View style={{ width: 24 }} />
      </View>

      
      <View style={styles.content}>
        <Pressable style={styles.row} onPress={() => setSelected('en')}>
          <Text style={styles.label}>English (US)</Text>
          <View style={[styles.radioOuter, selected === 'en' && styles.radioOuterActive]}>
            {selected === 'en' && <View style={styles.radioInner} />}
          </View>
        </Pressable>

        <Pressable style={styles.row} onPress={() => setSelected('es')}>
          <Text style={styles.label}>Spanish</Text>
          <View style={[styles.radioOuter, selected === 'es' && styles.radioOuterActive]}>
            {selected === 'es' && <View style={styles.radioInner} />}
          </View>
        </Pressable>
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
    marginBottom: 24,
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
    paddingVertical: 14,
  },

  label: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: '#000',
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#167738',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterActive: {
    borderColor: '#167738',
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#167738',
  },
});