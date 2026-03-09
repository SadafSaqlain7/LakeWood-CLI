import { View, Text, Pressable, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Navbar({ onPress, navigation }) {
    const [activeTab, setActiveTab] = useState('Home');


    function handlePress(tab) {
        switch (tab) {
            case 'Home':
                navigation.navigate('HomeScreen');
                setActiveTab(tab);
                break;
            case 'Chats':
                navigation.navigate('Chats');
                setActiveTab(tab);
                break;
            case 'Feedback':
                navigation.navigate('Feedback');
                setActiveTab(tab);
                break;
            case 'Profile':
                navigation.navigate('Profile');
                setActiveTab(tab);
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
                onPress={() => handlePress('Feedback')} >
                <Ionicons name="chatbox-outline" size={24}
                    style={[styles.iconStyle, activeTab === 'Feedback' && styles.activeStyle,]} />
                <Text style={[styles.textStyle, activeTab === 'Feedback' && styles.textActiveStyle,]} >
                    Feedback
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
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor: '#fff',
        // borderTopWidth: 1,
        borderTopColor: '#eee',
        marginBottom: 40
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
