import { View, Text, StyleSheet, Pressable } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GobackArrow from '../components/ui/GobackArrow';
import ProductsList from '../components/ui/ProductsList';
import ChatProfile from '../assets/svgs/chatprofile.svg';
import PRODUCTS from '../../theme/Products';
import { fonts } from '../../theme/theme';

export default function SellerProfile({ navigation, route }) {
    const { sellerName = 'Alex hhhods' } = route.params || {};

    const sellerProducts = PRODUCTS;
    return (
        <View style={styles.container}>


            <View style={styles.header}>
                <GobackArrow />
                <Text style={styles.headerTitle}>Seller Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            <LinearGradient
                colors={['#167738', '#1E4A92']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileCard}
            >
                <ChatProfile width={65} height={65} />

                <View style={{ marginLeft: 14 }}>
                    <Text style={styles.sellerName}>{sellerName}</Text>

                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={14} color="#fff" />
                        <Text style={styles.locationText}>45 Ave, 3411 pajijc</Text>
                    </View>
                </View>


                <Pressable
                    onPress={() =>
                        navigation.navigate('ChatIntro', {
                            sellerName,
                        })
                    }
                >
                    <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
                </Pressable>
            </LinearGradient>


            <View style={styles.postsHeader}>
                <Text style={styles.postsTitle}>Posts</Text>

                <Pressable onPress={() =>
                    navigation.navigate('SellerAllPosts', {
                        sellerName,
                    })
                }>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>
            </View>


            <View style={styles.listContainer}>
                <ProductsList
                    products={sellerProducts}
                    wishlist={[]}
                    addtoWishlist={() => { }}
                    navigation={navigation}
                />
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    headerTitle: {
        fontFamily: fonts.Bold,
        fontSize: 16,
    },

    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 22,
        marginBottom: 25,
    },

    sellerName: {
        fontFamily: fonts.Bold,
        fontSize: 17,
        color: '#fff',
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },

    locationText: {
        color: '#fff',
        marginLeft: 4,
        fontSize: 12,
        fontFamily: fonts.Regular,
    },


    chatButton: {
        marginLeft: 'auto',
        backgroundColor: '#167738',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },

    postsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },

    postsTitle: {
        fontFamily: fonts.Bold,
        fontSize: 15,
    },

    viewAll: {
        color: '#167738',
        fontFamily: fonts.SemiBold,
        fontSize: 13,
    },


    listContainer: {
        flex: 1,
        paddingBottom: 60,
    },

});