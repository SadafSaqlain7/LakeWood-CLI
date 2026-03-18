import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import CategoryList from './CategoryList';
import Categories from '../../screens/Categories';
import { fonts } from '../../../theme/theme';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function PopularCategories({ onSelect, onPress, navigation, text, title }) {
    const [active, setActive] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await firestore().collection('categories').get();
                const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCategories(list);
            } catch (error) {
                console.log("Error fetching popular categories:", error);
            }
        };
        fetchCategories();
    }, []);

    function handlePress(categoryItem) {
        setActive(categoryItem.id);
        onSelect?.(categoryItem.id);
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
                {categories.map(item => (
                    <CategoryList
                        key={item.id}
                        label={item.name || item.title || item.id}
                        active={item.id === active}
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