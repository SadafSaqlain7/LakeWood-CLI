import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import LogoMini from '../assets/svgs/Logo2.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../theme/theme';
import SellerNavbar from '../components/ui/SellerNavbar';
import ChatProfile from '../assets/svgs/chatprofile.svg';

export default function SellerHomeScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
          
            <View style={styles.header}>
                <LogoMini style={styles.logoImage} />
                <Pressable style={styles.notificationIcon} onPress={() => navigation.navigate('Notification')}>
                    <Ionicons name="notifications" size={24} color="#167738" />
                   
                    <View style={styles.notificationBadge} />
                </Pressable>
            </View>

            {/* Profile Greeting Section */}
            <View style={styles.profileSection}>
                <ChatProfile width={50} height={50} />
                <View style={styles.greetingTextContainer}>
                    <Text style={styles.hiText}>Hi,</Text>
                    <Text style={styles.nameText}>Alex Hales</Text>
                </View>
            </View>

           
            <View style={styles.actionsContainer}>
                
                <Pressable 
                    style={[styles.actionButton, styles.activePostsButton]}
                    onPress={() => navigation.navigate('ActivePosts')}
                >
                    <Text style={styles.actionButtonText}>Active Posts</Text>
                    <View style={styles.badgeContainer}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>03</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </View>
                </Pressable>

                <Pressable 
                    style={[styles.actionButton, styles.addPostsButton]}
                    onPress={() => navigation.navigate('AddPost')}
                >
                    <Text style={styles.actionButtonText}>Add Posts</Text>
                    <Ionicons name="add-circle" size={28} color="#fff" />
                </Pressable>
            </View>

            <SellerNavbar navigation={navigation} activeTab="Home" />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        marginTop: 35,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    logoImage: {
        width: 108,
        height: 62,
    },
    notificationIcon: {
        position: 'relative',
        padding: 5,
        backgroundColor: '#E8F5E9',
        borderRadius: 20,
    },
    notificationBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    greetingTextContainer: {
        justifyContent: 'center',
    },
    hiText: {
        fontSize: 16,
        color: '#757575',
        fontFamily: fonts.Regular,
    },
    nameText: {
        fontSize: 20,
        color: '#000',
        fontFamily: fonts.Bold,
    },
    actionsContainer: {
        marginTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 20,
    },
    activePostsButton: {
        backgroundColor: '#167738',
    },
    addPostsButton: {
        backgroundColor: '#3BB5E9', 
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.Bold,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#115C2B', 
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: fonts.Bold,
    },
});
