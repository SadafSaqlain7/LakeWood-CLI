import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useState } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import ChatProfile from '../assets/svgs/chatprofile.svg';
import MessagingPicture from '../assets/svgs/messaging.svg';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../theme/theme';

export default function ChatIntro({ navigation, route }) {
    const { sellerName = 'Luke Skywalker', product } = route.params || {};
    const [message, setMessage] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>


                <View style={styles.header}>
                    <GobackArrow />
                    <View style={styles.userRow}>
                        <ChatProfile width={35} height={35} />
                        <Text style={styles.username}>{sellerName}</Text>
                    </View>
                    <View style={styles.circle}>
                        <Ionicons name="ellipsis-horizontal" size={16} />
                    </View>
                </View>


                <View style={{ paddingHorizontal: 18 }}>
                    <MessagingPicture />
                </View>


                <View style={styles.messageCard}>
                    <Text style={styles.messageText}>
                        Hello! You are now connected with a seller who can answer your
                        questions and help you with your purchase.
                    </Text>
                </View>


                <View style={styles.bottomContainer}>

                    {/* Input + Icons Container */}
                    <View style={styles.inputWrapper}>

                        <Pressable onPress={() => { }}>
                            <Ionicons name="happy-outline" size={22} color="#167738" />
                        </Pressable>

                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Type a message ..."
                            placeholderTextColor="#999"
                            style={styles.input}
                            multiline
                        />

                        <Pressable onPress={() => { }}>
                            <Ionicons name="attach-outline" size={22} color="#167738" />
                        </Pressable>

                        <Pressable
                            onPress={() => { }}
                            style={{ marginLeft: 10 }}
                        >
                            <Ionicons name="camera-outline" size={22} color="#167738" />
                        </Pressable>

                    </View>


                    <Pressable
                        style={styles.sendButton}
                        onPress={() => {
                            console.log('Send pressed');

                            if (!message.trim()) return;

                            navigation.navigate('ChatProductPreview', {
                                sellerName,
                                product,
                            });
                        }}
                    >
                        <Ionicons name="paper-plane" size={20} color="#fff" />
                    </Pressable>

                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },



    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    username: {
        fontFamily: fonts.Bold,
        fontSize: 16,
        color: '#000',
    },

    circle: {
        width: 24,
        height: 24,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: 'rgb(26, 25, 25)',
        alignItems: 'center',
        justifyContent: 'center',
    },


    illustration: {
        height: 220,
        backgroundColor: '#EAF6EE',
        borderRadius: 20,
        marginBottom: 20,
    },



    messageCard: {
        backgroundColor: '#167738',
        borderRadius: 20,
        padding: 16,
        marginBottom: 30,
    },

    messageText: {
        color: '#fff',
        fontFamily: fonts.Regular,
        fontSize: 13,
        lineHeight: 18,
    },



    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },

    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 28,
        paddingHorizontal: 14,
        height: 55,
    },

    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: fonts.Regular,
        marginHorizontal: 10,
        color: '#000',
    },

    sendButton: {
        marginLeft: 12,
        backgroundColor: '#167738',
        width: 55,
        height: 55,
        borderRadius: 27.5,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
});