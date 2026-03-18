import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SellerNavbar({ onPress, navigation, activeTab = 'Home' }) {

    function handlePress(tab) {
        switch (tab) {
            case 'Home':
                navigation.navigate('SellerHomeScreen');
                break;
            case 'Chats':
                navigation.navigate('Chats');
                break;
            case 'MyPosts':
                navigation.navigate('SellerAllPosts'); 
                break;
            case 'Profile':
                navigation.navigate('SellerProfile');
                break;
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.tab}
                onPress={() => handlePress('Home')} >
                <Entypo name="home" size={24}
                    style={[styles.iconStyle, activeTab === 'Home' && styles.activeStyle,]} />
                <Text style={[styles.textStyle, activeTab === 'Home' && styles.textActiveStyle,]} >
                    Home
                </Text>
            </Pressable>

            <Pressable
                style={styles.tab}
                onPress={() => handlePress('Chats')}  >
                <Ionicons name="chatbubble-ellipses-outline" size={24}
                    style={[styles.iconStyle, activeTab === 'Chats' && styles.activeStyle,]} />
                <Text style={[styles.textStyle, activeTab === 'Chats' && styles.textActiveStyle,]}>
                    Chats
                </Text>
            </Pressable>

            <Pressable
                style={styles.tab}
                onPress={() => handlePress('MyPosts')} >
                <Ionicons name="document-text-outline" size={24}
                    style={[styles.iconStyle, activeTab === 'MyPosts' && styles.activeStyle,]} />
                <Text style={[styles.textStyle, activeTab === 'MyPosts' && styles.textActiveStyle,]} >
                    My posts
                </Text>
            </Pressable>

            <Pressable
                style={styles.tab}
                onPress={() => handlePress('Profile')} >
                <Ionicons name="person-outline" size={24}
                    style={[styles.iconStyle, activeTab === 'Profile' && styles.activeStyle,]} />
                <Text style={[styles.textStyle, activeTab === 'Profile' && styles.textActiveStyle,]}>
                    Profile
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#eee',
        marginBottom: 0,
        backgroundColor: '#fff',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
    },
    iconStyle: {
        color: '#9E9E9E',
    },
    activeStyle: {
        color: '#167738',
    },
    textStyle: {
        fontSize: 12,
        color: '#9E9E9E',
        marginTop: 4,
    },
    textActiveStyle: {
        color: '#167738',
        fontWeight: '600',
    },
});
