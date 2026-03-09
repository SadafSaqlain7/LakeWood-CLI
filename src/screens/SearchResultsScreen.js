import { View, Text, StyleSheet, Pressable } from 'react-native';
import PRODUCTS from '../theme/Products';
import { fonts } from '../theme/theme';
import SearchBar from '../components/ui/SearchBar';
import ProductsList from '../components/ui/ProductsList';
import GobackArrow from '../components/ui/GobackArrow';
import Notfound from '../assets/svgs/notfound.svg';
import { useState, useEffect } from 'react';

export default function SearchResultsScreen({ navigation, route, wishlist, addtoWishlist }) {
    const { searchQuery } = route.params;
    const [query, setQuery] = useState(searchQuery);


    const filtered = PRODUCTS.filter(item =>
        item.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    return (
        <View style={styles.container}>

            <View style={styles.topRow}>
                <GobackArrow onPress={() => navigation.goBack()} />
                <View style={{ flex: 1 }}>
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                    />
                </View>
            </View>

            {filtered.length > 0 && (
                <View style={styles.searchHeader}>
                    <Text style={styles.searchResultText}>
                        Showing results for "{query}"
                    </Text>
                    <Pressable style={styles.defaultButton}>
                        <Text style={styles.defaultButtonText}>Default ↑↓</Text>
                    </Pressable>
                </View>
            )}


            {filtered.length > 0 ? (
                <ProductsList
                    products={filtered}
                    wishlist={wishlist}
                    addtoWishlist={addtoWishlist}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Notfound />
                    <Text style={styles.notFoundText}>Not Found</Text>
                    <Text style={styles.notFoundescription}>
                        Sorry, the keyword you entered cannot be found.
                        Please try again with another keyword.
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        padding: 10,
        marginTop: 35
    },
    topRow:
    {

        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10
    },
    searchHeader:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    searchResultText:
    {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000'
    },
    defaultButton:
    {
        //backgroundColor: '#E5F4EA',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    defaultButtonText:
    {
        color: '#167738',
        fontSize: 15,
        fontFamily: fonts.Bold,
        //elevation: 4,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    emptyContainer:
    {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 105,
        paddingHorizontal: 30
    },
    notFoundText:
    {
        marginTop: 10,
        fontSize: 24,
        color: '#000',
        fontFamily: fonts.Bold,
        textAlign: 'center'
    },
    notFoundescription:
    {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 22,
        color: '#333',
        fontFamily: fonts.Regular
    }
});
