import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { fonts } from '../../theme/theme';
//import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';



export default function RememberMeCheckbox({ label = "Remember me", onValueChange }) {
    const [checked, setChecked] = useState(false);

    const toggleCheckbox = () => {
        setChecked(!checked);
        if (onValueChange) onValueChange(!checked); 
    }

    return (
        <Pressable style={styles.container} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <Ionicons name="checkmark" size={18} color='#rgb(1, 110, 38)167738'  />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
        },
        checkbox: {
            width: 22,
            height: 22,
            borderWidth: 2,
            borderColor: '#999',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
            borderRadius: 4
        },
        checked: {
            borderColor: '#rgb(1, 110, 38)167738', 
        },
        label: {
            marginLeft: 10,
            fontSize: 14,
            fontFamily: fonts.SemiBold
        },
    }
);