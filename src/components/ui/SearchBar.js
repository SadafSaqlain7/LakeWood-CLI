import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';

export default function SearchBar({ value, onChange, placeholder = "Search", onSubmit }) {
  const [text, setText] = useState(value || "");

  const handleSubmit = () => {
    if (onSubmit) onSubmit(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Ionicons name="search" size={20} color="#167738" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#167738"
          value={text}
          onChangeText={(t) => {
            setText(t);
            onChange && onChange(t);
          }}
          style={styles.input}
          onSubmitEditing={handleSubmit} 
          returnKeyType="search"
        />
      </View>
      <Pressable onPress={handleSubmit}>
        <FontAwesome6 name="sliders" size={18} color="#167738" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#EDEDED',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#167738',
    flex: 1,
  },
});
