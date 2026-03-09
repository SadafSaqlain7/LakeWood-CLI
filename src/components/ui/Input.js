import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState, useRef } from 'react';

export default function Input({
  value,
  onChangeText,
  placeholder,
  Icon,
  containerStyle,
  inputStyle,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View
        style={[
          styles.container,
          isFocused && styles.focusedBorder,
          containerStyle,
        ]}
      >
        {Icon && Icon}

        <TextInput
          ref={inputRef}
          {...props}
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#222"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
  },
  focusedBorder: {
    borderColor: '#2ecc71',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});