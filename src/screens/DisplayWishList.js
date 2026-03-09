import { View, Text, StyleSheet, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProductCard from '../components/ui/ProductCard';
import { fonts } from '../theme/theme';
import GobackArrow from '../components/ui/GobackArrow';

export default function DisplayWishList({ wishlist = [], addtoWishlist }) {

    return (
        <View style={styles.Container}>


            <View style={styles.nameContainer}>
                <GobackArrow />
                <Text style={styles.title}>My Wishlist</Text>
                <MaterialCommunityIcons
                    name="dots-horizontal-circle-outline"
                    size={24}
                    color="black"
                />
            </View>


            <FlatList
                data={wishlist}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <ProductCard
                        item={item}
                        isFavourite={true}
                        onPress={() => addtoWishlist(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 55,
        paddingBottom: 100,
    },

    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    title: {
        fontFamily: fonts.Bold,
        fontSize: 18,
    },

    row: {
        justifyContent: 'space-between',
    },

});