import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ProfileImage from '../assets/svgs/Profile.svg';
import MessageImage from '../assets/svgs/Message.svg';

import GobackArrow from '../components/ui/GobackArrow';
import ActionButton from '../components/ui/ActionButton';
import Input from '../components/ui/Input';
import { fonts } from '../theme/theme';

export default function EditProfile({ navigation }) {
    const [name, setName] = useState('Luke Skywalker');
    const [email, setEmail] = useState('Luke.Skywalker@yourdomain.com');
    const [phone, setPhone] = useState('+1 111 467 378 399');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [selectedFlag, setSelectedFlag] = useState('🇺🇸');

    const handleUpdate = () => { };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };
    return (
        <View style={styles.Container}>
            header
            <View style={styles.header}>
                <GobackArrow />
                <Text style={styles.headerTitle}>Edit profile</Text>
                <View style={{ width: 24 }} />
            </View>


            <View style={styles.form}>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Luke Skywalker"
                    containerStyle={styles.inputCard}
                    inputStyle={styles.inputText}
                   Icon={<Ionicons name="person-outline" size={18} color="#8A8A8A" />}
                />

                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Luke.Skywalker@gmaildomain.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle={styles.inputCard}
                    inputStyle={styles.inputText}
                    Icon={<MessageImage />}
                />

                <Input
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+1283029920399"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputCard}
                    inputStyle={styles.inputText}
                    Icon={
                        <Pressable
                            style={styles.flagDropdown}
                            onPress={() => setShowCountryDropdown(prev => !prev)}
                        >
                            <Text style={styles.flagText}>{selectedFlag}</Text>
                            <Ionicons name={showCountryDropdown ? "chevron-up" : "chevron-down"} size={14} color="#8A8A8A" />
                        </Pressable>
                    }
                />

                {showCountryDropdown && (
                    <View style={styles.dropdownContainer}>
                        {['🇺🇸', '🇪🇸', '🇨🇦', '🇵🇰'].map((flag, index) => (
                            <Pressable
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setSelectedFlag(flag);
                                    setShowCountryDropdown(false);
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>{flag}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}


                <View style={{ marginTop: 20 }}>
                    <ActionButton title="Update"  />
                </View>
            </View>


            <View style={styles.logoutContainer}>
                <View style={styles.logoutButton}>
                    <ActionButton title="Logout" onPress={handleLogout} />
                </View>
            </View>



            <Modal
                visible={showLogoutModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHandle} />

                        <Text style={styles.modalTitle}>Logout</Text>
                        <View style={styles.modalDivider} />

                        <Text style={styles.modalText}>
                            Are you sure you want to log out?
                        </Text>

                        <View style={styles.modalActions}>
                            <Pressable
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={styles.Text}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={() => {
                                    setShowLogoutModal(false);
                                }}
                            >
                                <Text style={styles.Text}>Yes, Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>




    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 55,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    headerTitle: {
        fontFamily: fonts.Bold,
        fontSize: 16,
        color: '#000',
    },

    form: {
        marginTop: 15,
    },


    inputCard: {
        backgroundColor: '#F3F3F3',
        borderWidth: 0,
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 14,
        marginBottom: 12,
    },

    inputText: {
        fontFamily: fonts.SemiBold,
        fontSize: 14,
        color: '#000',
        marginLeft: 10,
    },

    flagDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    dropdownContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginTop: -8,
        marginBottom: 12,
        paddingVertical: 8,
    },

    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    flagText: {
        fontSize: 16,
    },

    logoutContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50,

    },

    logoutButton: {
        alignSelf: 'flex-end',
        width: 150,
        paddingRight: 10
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },

    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },

    modalHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginBottom: 12,
    },

    modalTitle: {
        fontFamily: fonts.Bold,
        fontSize: 18,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 10,
    },

    modalDivider: {
        height: 1,
        backgroundColor: '#eee',
        marginBottom: 14,
    },

    modalText: {
        fontFamily: fonts.SemiBold,
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelButton: {
        backgroundColor: '#2F2F36',
        marginRight: 10,
    },

    confirmButton: {
        backgroundColor: '#167738',
        marginLeft: 10,
    },

    Text: {
        color: '#fff',
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },

});