import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import GobackArrow from '../components/ui/GobackArrow';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Entypo from '@expo/vector-icons/Entypo';
import Entypo from 'react-native-vector-icons/Entypo';
//import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopularCategories from '../components/ui/PopularCategories';
import { fonts } from '../../theme/theme';



function IconCard({ item }) {
    return (
        <View style={styles.CardContainer}>
            <View style={styles.IconContainer}>
                {item.Icon}
            </View>
            <Text style={styles.categoryname}>{item.title}</Text>
        </View>
    );
}


const categoryIconsMap = {
    'clothes': <Ionicons name="shirt-sharp" size={24} color="#167738" />,
    'books': <Entypo name="book" size={24} color="#167738" />,
    'electronics': <MaterialCommunityIcons name="devices" size={24} color="#167738" />,
    'jewelry': <MaterialIcons name="watch" size={24} color="#167738" />,
    'jewelary': <MaterialIcons name="watch" size={24} color="#167738" />,
    'cars': <FontAwesome5 name="car" size={24} color="#167738" />,
    'shoes': <MaterialCommunityIcons name="shoe-cleat" size={24} color="#167738" />,
    'footwear': <MaterialCommunityIcons name="shoe-cleat" size={24} color="#167738" />,
    'furniture': <MaterialCommunityIcons name="lamp" size={24} color="#167738" />,
    'hair accessories': <MaterialCommunityIcons name="hair-dryer" size={24} color="#167738" />,
    'accessories': <MaterialCommunityIcons name="hair-dryer" size={24} color="#167738" />,
    'miscellaneous': <MaterialIcons name="devices" size={24} color="#167738" />,
    'services': <FontAwesome5 name="hand-holding" size={24} color="#167738" />,
    'giveaways': <MaterialCommunityIcons name="gift-open" size={24} color="#167738" />,
    'hoodie': <Ionicons name="shirt-sharp" size={24} color="#167738" />,
    'stationary': <Entypo name="book" size={24} color="#167738" />,
    'default': <MaterialCommunityIcons name="shape" size={24} color="#167738" />
};

import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function Categories({ category = [] }) {
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await firestore().collection('categories').get();
                const list = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const name = data.name || data.title || 'Unknown';
                    const iconKey = name.toLowerCase();
                    return {
                        id: doc.id,
                        title: name,
                        Icon: categoryIconsMap[iconKey] || categoryIconsMap['default']
                    };
                });
                setCategoriesData(list);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <View style={styles.Container}>
            <View style={styles.nameContainer}>
                <GobackArrow />
                <Text style={styles.title}>Categories</Text>
                <Ionicons name="search" size={20} color="#167738" />
            </View>

            <PopularCategories title="Popular Categories" />

            <View style={styles.flatlistContainer}>
                <FlatList
                    data={categoriesData}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <IconCard item={item} />}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />

            </View>
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
        marginBottom: 10
    },

    title: {
        fontSize: 20,
        fontFamily: fonts.Bold,
        color: '#000',
    },

    flatlistContainer: {
        marginTop: 25,
    },

    list: {
        paddingBottom: 100,
    },

    row: {
        justifyContent: 'flex-start',
        marginBottom: 20,
    },


    CardContainer: {
        width: '33.33%',
        alignItems: 'center',
        marginBottom: 20,
    },


    IconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(181, 252, 206, 0.15)',

        alignItems: 'center',
        justifyContent: 'center',

        // iOS shadow (glow effect)
        shadowColor: '#167738',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 15,

        // Android shadow
        // elevation: 10,
    },


    categoryname: {
        fontFamily: fonts.SemiBold,
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },
});













