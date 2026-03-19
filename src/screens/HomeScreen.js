import { View, Text, StyleSheet, Pressable } from 'react-native';
import LogoMini from '../assets/svgs/Logo2.svg';
import SearchBar from "../components/ui/SearchBar";
import PopularCategories from '../components/ui/PopularCategories';
import Navbar from '../components/ui/Navbar';
import { fonts } from '../../theme/theme';
import { useState, useEffect } from 'react';
import ProductsList from '../components/ui/ProductsList';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {

    const [category, setCategory] = useState('');
    const [searchRequest, setSearchRequest] = useState('');
    const [products, setProducts] = useState([]);

    const currentUserId = auth().currentUser?.uid;

    
    useEffect(() => {
        let query = firestore()
            .collection('products')
            .where('status', '==', 'approved');

        if (category) {
            query = query.where('category', '==', category);
        }

        const unsubscribe = query.onSnapshot(snapshot => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(list);
        });

        return () => unsubscribe();
    }, [category]);

   
    const toggleLike = async (product) => {
        if (!currentUserId) return;

        const productRef = firestore().collection('products').doc(product.id);
        try {
            const doc = await productRef.get();
            const currentLikedBy = doc.data()?.likedBy || [];
            const isLiked = currentLikedBy.includes(currentUserId);
            
            let newLikedBy;
            if (isLiked) {
                newLikedBy = currentLikedBy.filter(uid => uid !== currentUserId);
            } else {
                newLikedBy = [...currentLikedBy, currentUserId];
            }

           
            await productRef.update({
                likedBy: newLikedBy,
                likesCount: newLikedBy.length
            });

            
        } catch (error) {
            console.log("Error toggling like:", error);
        }
    };

    return (
        <View style={styles.mainContainer}>

            <LogoMini style={styles.logoImage} />

            <SearchBar
                value={searchRequest}
                onChange={setSearchRequest}
                placeholder="Search products"
                onSubmit={(query) => {
                    navigation.navigate('SearchResultsScreen', { searchQuery: query });
                    setSearchRequest('');
                }}
            />

            <PopularCategories
                onSelect={setCategory}
                navigation={navigation}
                title="Popular Categories"
                text="View All"
            />

            <View style={styles.textcontainer}>
                <Text style={styles.text}>Near you</Text>
                <Pressable>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>
            </View>

            <ProductsList
                products={products}
                wishlist={products
                    .filter(p => p.likedBy?.includes(currentUserId))
                    .map(p => ({ id: p.id }))}
                addtoWishlist={(productItem) => toggleLike(productItem)}
                navigation={navigation}
                currentUserId={currentUserId}
            />

            <Navbar navigation={navigation} activeTab="Home" />

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        marginTop: 35,
        paddingBottom: 100
    },

    logoImage: {
        width: 108,
        height: 62,
        marginTop: 10
    },

    textcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        marginTop: 20
    },

    text: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.Bold
    },

    viewAll: {
        color: '#000',
        fontSize: 14,
        fontFamily: fonts.Regular
    },
});