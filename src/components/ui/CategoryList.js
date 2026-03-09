import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function CategoryList({ label, active, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={[ styles.category, active && styles.activeCategory ]} >
            <Text style={[  styles.text, active && styles.activeText  ]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    category: {
        paddingHorizontal: 16,
        height: 34,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#167738',
        justifyContent: 'center',
        marginRight: 10,
    },
    activeCategory: {
        backgroundColor: '#167738',
    },
    text: {
        color: '#167738',
        fontSize: 14,
        fontWeight: '500',
    },
    activeText: {
        color: '#fff',
    },
});