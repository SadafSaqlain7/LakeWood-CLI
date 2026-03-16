import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import React from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import { fonts } from '../../theme/theme';
import SellerProductCard from '../components/ui/SellerProductCard';
import ActionButton from '../components/ui/ActionButton';
import Shoes from '../assets/svgs/shoes.svg';
import Earbuds from '../assets/svgs/Earbuds.svg';

// Dummy data for active posts
const ACTIVE_PRODUCTS = [
    { id: '1', name: 'Suga leather shoes', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Shoes },
    { id: '2', name: 'TWS Earbuds M10', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Earbuds },
    { id: '3', name: 'TWS Earbuds M10', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Earbuds },
];

export default function ActivePosts({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.goBackContainer}>
                    <GobackArrow />
                </View>
                <Text style={styles.headerTitle}>Active Posts</Text>
                <View style={styles.headerRight} />
            </View>

            {/* List of Active Posts */}
            <FlatList
                data={ACTIVE_PRODUCTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <SellerProductCard
                        item={item}
                        type="active"
                        onPress={() => navigation.navigate('SellerPostDetails', { item })}
                    />
                )}
            />

            {/* Bottom Add New Post Button */}
            <View style={styles.bottomContainer}>
                <ActionButton
                    title="Add new Post"
                    buttonStyle={styles.addNewButton}
                    textStyle={styles.addNewButtonText}
                    onPress={() => navigation.navigate('AddPost')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    goBackContainer: {
        width: 40,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.Bold,
        color: '#000',
    },
    headerRight: {
        width: 40,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    addNewButton: {
        backgroundColor: '#167738', // Dark green matching design
        borderRadius: 30,
        height: 55,
        marginBottom: 0,
    },
    addNewButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
