import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import SearchBar from '../components/ui/SearchBar';
import ProductsList from '../components/ui/ProductsList';
import PRODUCTS from '../theme/Products';
import { fonts } from '../theme/theme';

export default function SellerAllPosts({ navigation, route }) {
  const { sellerName = 'Alex Hales' } = route.params || {};

  const [search, setSearch] = useState('');

  // 🔎 Filter by search text
  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <GobackArrow />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search"
          />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>All Posts</Text>

      {/* Scrollable Product List */}
      <View style={styles.listContainer}>
        <ProductsList
          products={filteredProducts}
          wishlist={[]}
          addtoWishlist={() => {}}
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
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    marginBottom: 16,
  },

  listContainer: {
    flex: 1,
    paddingBottom: 100, // important for navbar spacing
  },

});