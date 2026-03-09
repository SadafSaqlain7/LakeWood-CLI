import { View, Text, StyleSheet, Pressable } from 'react-native';
import LogoMini from '../assets/svgs/Logo2.svg';
import SearchBar from "../components/ui/SearchBar";
import PopularCategories from '../components/ui/PopularCategories';
import Navbar from '../components/ui/Navbar';
import PRODUCTS from '../../theme/Products';
import { fonts } from '../../theme/theme';
import { useContext, useState } from 'react';
import ProductDetails from './ProductDetails';
import ProductsList from '../components/ui/ProductsList';
//import { AuthContext } from '../../App';


export default function HomeScreen({ navigation }) {
    const [category, setCategory] = useState('');
    const [searchRequest, setSearchRequest] = useState('');
    const [wishlist, setWishlist] = useState([]);

    const addtoWishlist = (item) => {
        setWishlist((prev) => {
            if (prev.some((i) => i.id === item.id)) {
                return prev.filter((i) => i.id !== item.id);
            }
            return [...prev, item];
        });
    };

    

    const filtered = PRODUCTS.filter(item =>
        category ? item.category === category : true
    );

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
                products={filtered}
                wishlist={wishlist}
                addtoWishlist={addtoWishlist}
                navigation={navigation}
            />

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
            paddingBottom: 100
        },
        logoImage:
        {
            width: 108,
            height: 62,
            marginTop: 10
        },
        textcontainer:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
            marginTop: 20
        },
        text:
        {
            fontSize: 16,
            fontWeight: '600',
            fontFamily: fonts.Bold
        },
        viewAll:
        {
            color: '#000',
            fontSize: 14,
            fontFamily: fonts.Regular
        },
    });
