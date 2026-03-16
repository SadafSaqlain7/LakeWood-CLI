import { View, Text, StyleSheet, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import React from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../theme/theme';
import ActionButton from '../components/ui/ActionButton';

const { width } = Dimensions.get('window');

export default function SellerPostDetails({ route, navigation }) {
   
    const item = route?.params?.item || {
        name: 'Suga leather shoes',
        description: 'DeLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non lorem imperdiet diam porttitor lacinia. Nunc ut mauris eu arcu efficitur rhoncus eget sit amet risus. DeLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non lorem imperdiet diam porttitor lacinia. Nunc ut mauris eu arcu efficitur rhoncus eget sit amet risus.',
        price: '80.00',
        date: '09 March, 2023',
        location: '45 Ave, 3411 Phila.',
        image: 'https://i.pravatar.cc/300?img=12'
    };

    return (
        <View style={styles.mainContainer}>
         
            <View style={styles.header}>
                <View style={styles.goBackContainer}>
                    <GobackArrow />
                </View>
                <Text style={styles.headerTitle}>Post details</Text>
                
              
                <Pressable style={styles.headerRight} onPress={() => { /* Handle delete logic */ }}>
                    <View style={styles.trashCircle}>
                         <Ionicons name="trash" size={18} color="#167738" />
                    </View>
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    
                   
                    <View style={styles.paginationContainer}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

               
                <View style={styles.titleRow}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.dateText}>{item.date || '09 March, 2023'}</Text>
                </View>

                <View style={styles.locationContainer}>
                    <Ionicons name="location" size={16} color="#167738" />
                    <Text style={styles.locationText}>{item.location || '45 Ave, 3411 Phill.'}</Text>
                </View>

              
                <Text style={styles.sectionHeader}>Description</Text>
                <Text style={styles.descriptionText}>
                    {item.description}
                </Text>

             
                <View style={styles.priceContainer}>
                    <Text style={styles.sectionHeader}>Price:</Text>
                    <Text style={styles.priceText}>${item.price}</Text>
                </View>

            </ScrollView>

           
            <View style={styles.bottomContainer}>
                <ActionButton
                    title="Mark as Sold"
                    buttonStyle={styles.markSoldButton}
                    textStyle={styles.markSoldButtonText}
                    onPress={() => {
                        
                        navigation.goBack();
                    }}
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
        alignItems: 'flex-end',
    },
    trashCircle: {
        width: 32,
        height: 32,
        backgroundColor: '#E8F5E9', 
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    productImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#BDBDBD',
        marginHorizontal: 3,
    },
    activeDot: {
        width: 20,
        backgroundColor: '#167738',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 22,
        fontFamily: fonts.Bold,
        color: '#000',
        flex: 1,
    },
    dateText: {
        fontSize: 12,
        fontFamily: fonts.Regular,
        color: '#9E9E9E',
        marginLeft: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 14,
        fontFamily: fonts.Bold, 
        color: '#167738',
    },
    sectionHeader: {
        fontSize: 16,
        fontFamily: fonts.Bold,
        color: '#000',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: fonts.Light,
        color: '#424242',
        lineHeight: 22,
        marginBottom: 25,
    },
    priceContainer: {
        marginBottom: 20,
    },
    priceText: {
        fontSize: 20,
        fontFamily: fonts.Bold,
        color: '#000',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    markSoldButton: {
        backgroundColor: '#167738', 
        borderRadius: 30,
        height: 55,
        marginBottom: 0,
    },
    markSoldButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
