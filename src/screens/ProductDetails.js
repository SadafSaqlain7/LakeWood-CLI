import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GobackArrow from '../components/ui/GobackArrow';
import { fonts } from '../../theme/theme';
import ChatProfile from '../assets/svgs/chatprofile.svg';

export default function ProductDetails({ route, navigation }) {
    const { product } = route.params;
    const Icon = product.Icon;

    return (
        <ScrollView style={styles.container}>


            <View style={styles.header}>
                <GobackArrow />
                <Text style={styles.headerTitle}>Details</Text>
                <View style={{ width: 24 }} />
            </View>


            <View style={styles.imageWrapper}>
                {Icon && <Icon width={200} height={200} />}
            </View>


            <View style={styles.dots}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>


            <View style={styles.infoContainer}>

                <View style={styles.titleRow}>
                    <Text style={styles.productName}>{product.name}</Text>

                    <Pressable style={styles.heartCircle}>
                        <Ionicons name="heart-outline" size={18} color="#167738" />
                    </Pressable>
                </View>


                <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#167738" />
                    <Text style={styles.locationText}>45 jdk, 3411 pandc.</Text>
                </View>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    {product.description}
                </Text>

                <Text style={styles.sectionTitle}>Price:</Text>
                <Text style={styles.price}>${product.price}.00</Text>

                <Text style={styles.sectionTitle}>Post By:</Text>


                <Pressable
                    style={styles.postContainer}
                    onPress={() =>
                        navigation.navigate('SellerProfile', { seller: 'Alex jadko' })
                    }
                >
                    <ChatProfile width={45} height={45} />

                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.posterName}>Alex Hales</Text>

                        <View style={styles.posterLocationRow}>
                            <Ionicons name="location" size={14} color="#000" />
                            <Text style={styles.locationSmall}>
                                45 Ave, 3411 pajjic
                            </Text>
                        </View>
                    </View>

                    <Pressable style={styles.chatButton} onPress={() =>
                        navigation.navigate('ChatIntro', {
                            sellerName: 'Luke Skywalker',
                            product,
                        })
                    }>
                        <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
                    </Pressable>
                </Pressable>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
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

    /* Slightly Darker Grey */
    imageWrapper: {
        backgroundColor: '#ECECEC',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 260,
    },

    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 12,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },

    activeDot: {
        backgroundColor: '#167738',
        width: 18,
    },

    infoContainer: {
        marginTop: 10,
    },

    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    productName: {
        fontFamily: fonts.Bold,
        fontSize: 18,
    },

    heartCircle: {
        backgroundColor: '#EAF6EE',
        padding: 10,
        borderRadius: 30,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },

    locationText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#167738',
    },

    sectionTitle: {
        fontFamily: fonts.Bold,
        marginTop: 16,
    },

    description: {
        fontSize: 13,
        color: '#666',
        marginTop: 6,
    },

    price: {
        fontSize: 18,
        fontFamily: fonts.Bold,
        marginTop: 6,
    },

    postContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 14,
        padding: 12,
        marginTop: 10,
    },

    posterName: {
        fontFamily: fonts.SemiBold,
    },

    posterLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },

    locationSmall: {
        fontSize: 12,
        color: '#777',
        marginLeft: 4,
    },


    chatButton: {
        marginLeft: 'auto',
        backgroundColor: '#167738',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        // Android shadow
        elevation: 6,
    },

});