import { View, Text, StyleSheet, Pressable } from 'react-native';
import ProfilePicture from '../assets/svgs/profilepicture.svg';
import DisplayWishList from './DisplayWishList';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/ui/Navbar';
import { fonts } from '../theme/theme'; 
import LogoMini from '../assets/svgs/Logo2.svg';
import { ROUTES } from '../theme/routes';
import EditProfile from './EditProfile';

const user = {
    name: 'Luke hsdiadjiosu',
    phone: '93284903029',
    // profilepicture: ProfilePicture
};



export default function Profile({ navigation, onPress }) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.nameContainer}>

                <LogoMini style={styles.logoImage} />
                <Text style={styles.text}>Profile</Text>
                <View style={{ width: 108 }} />
            </View>
            <LinearGradient colors={['#167738', '#1E4A92']} style={styles.profileContainer}
            >
                <ProfilePicture style={styles.image} />
                <View style={styles.userinfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.phone}>{user.phone}</Text>
                </View>
                {/* <Pressable style={styles.editButton}>
                    <Ionicons name="create-outline" size={18} color="#fff" />
                </Pressable> */}
            </LinearGradient>

            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <Pressable style={styles.optionCard} onPress={()=> navigation.navigate('EditProfile')}>
                    <Ionicons name="person-outline" size={24} color="#167738" />
                    <Text style={styles.optionText}>Edit Profile</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: 'auto' }} />
                </Pressable>

                <Pressable style={styles.optionCard} onPress={()=> navigation.navigate('DisplayWishList')}>
                    <Ionicons name="heart-outline" size={24} color="#167738" />
                    <Text style={styles.optionText}>My Wishlist</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" style={styles.forwardIcon} />
                </Pressable> 

                <Pressable style={styles.optionCard} onPress={()=> navigation.navigate('NotificationSettings')}>
                    <Ionicons name="notifications-outline" size={24} color="#167738" />
                    <Text style={styles.optionText}>Notification Settings</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" style={styles.forwardIcon} />
                </Pressable>

                <Pressable style={styles.optionCard} onPress={()=> navigation.navigate('Language')}>
                    <Ionicons name="language-outline" size={24} color="#167738" />
                    <View style={styles.languageContainer}>
                        <Text style={styles.optionText}>Language</Text>
                        <Text style={{ color: '#167738', marginLeft: 90 }}>English (US)</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color="#999" style={styles.forwardIcon} />
                </Pressable>

                <Pressable style={styles.optionCard} onPress={()=> navigation.navigate('Faqs')}>
                    <Ionicons name="help-outline" size={24} color="#167738" />
                    <Text style={styles.optionText}>FAQs</Text>
                    <Ionicons name="chevron-forward" size={20} color="#999" style={styles.forwardIcon} />
                </Pressable>
            </View>
            <Navbar navigation={navigation} />

        </View>
    );
}

const styles = StyleSheet.create(
    {
        mainContainer:
        {
            flex: 1,
            padding: 10,
            marginTop: 35,
            // paddingBottom: 100
        },
        text:
        {
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            flex: 1,
            fontFamily: fonts.Bold,
            fontSize: 19,

        },
        nameContainer:
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginBottom: 16,
            marginTop: 15
        },
        profileContainer:
        {
            margin: 6,
            borderRadius: 24,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            width: 330,
            height: 142
        },

        image: {
            width: 108,
            height: 108,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#fff',
        },
        userinfo: {
            flex: 1,
            marginLeft: 16,
        },
        name: {
            fontSize: 20,
            fontWeight: '600',
            color: '#fff',
            fontFamily: fonts.Bold,
        },
        phone: {
            fontSize: 14,
            color: '#fff',
            marginTop: 4,
            fontFamily: fonts.Regular,
        },
        editButton: {
            backgroundColor: '#1E4A92',
            padding: 6,
            borderRadius: 20,
        },
        optionCard: {
            backgroundColor: '#fff',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            marginBottom: 12,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
        },
        optionText: {
            marginLeft: 12,
            fontSize: 14,
            color: '#333',
            fontFamily: fonts.SemiBold,
        },
        languageContainer:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        forwardIcon:
        {
            marginLeft: 'auto'
        }

    });