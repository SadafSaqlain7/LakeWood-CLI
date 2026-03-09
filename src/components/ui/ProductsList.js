import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

export default function ProductsList({ 
  products = [], 
  wishlist = [], 
  addtoWishlist,
  navigation
}) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={item => item.id}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          isFavourite={wishlist.some((i) => i.id === item.id)}
          onFavouritePress={() => addtoWishlist(item)}
          onCardPress={() =>
            navigation.navigate('ProductDetails', { product: item })
          }
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
});