import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import CategoryList from './CategoryList';
import Categories from '../../screens/Categories';
import { fonts } from '../../../theme/theme';
import { useState } from 'react';

const CATEGORIES = [
    'Hoodie',
    'Shoes',
    'Electronics',
    'Clothing',
    'Accessories',
    'Jewelary',
    'Stationary'
];

export default function PopularCategories({ onSelect, onPress, navigation, text, title }) {
    const [active, setActive] = useState('');

    function handlePress(category) {
        setActive(category);
        onSelect?.(category);
    }
    return (

        <View style={styles.MainContainer}>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>{title}</Text>
                 {text && <Pressable>
                  <Text style={styles.viewAll} onPress={() => navigation.navigate("Categories")}>{text}</Text>
                </Pressable>}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {CATEGORIES.map(item => (
                    <CategoryList
                        key={item}
                        label={item}
                        active={item === active}
                        onPress={() => handlePress(item)}
                    />
                ))}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    MainContainer:
    {
        marginTop: 20,
    },
    titlecontainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.Bold
    },

    viewAll: {
        color: '#999',
        fontSize: 13,
        color: '#000000'
    },

    scroll: {
        paddingRight: 10,
    },
});