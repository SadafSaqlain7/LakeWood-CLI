import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

export default function ProductsList({ 
  products = [], 
  addtoWishlist, 
  navigation,
  currentUserId
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
          isFavourite={item.likedBy?.includes(currentUserId)} 
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