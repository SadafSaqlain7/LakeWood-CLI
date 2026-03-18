import { View, Text, StyleSheet, Pressable } from 'react-native';
import { fonts } from '../../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Shoes from '../../assets/svgs/shoes.svg';
import Earbuds from '../../assets/svgs/Earbuds.svg';

const productImages = {
  shoe: Shoes,
  earbuds: Earbuds,
};

export default function ProductCard({ item, onCardPress, onFavouritePress, isFavourite }) {
  
  const SvgImage = productImages[item.photos?.[0]];
console.log('item in product card---', item);
  return (
    <Pressable style={styles.card} onPress={onCardPress}>
      <View style={styles.imageContainer}>
        {SvgImage && <SvgImage width={90} height={90} />}

        {/* Favourite / Like Button */}
        <Pressable
          onPress={() => {
            onFavouritePress && onFavouritePress();
          }}
          style={styles.favouriteButton}
        >
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavourite ? '#167738' : '#167738'}
          />
        </Pressable>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <Text
          style={styles.description}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    marginRight: 10,
    justifyContent: 'center',
  },

  imageContainer: {
    height: 114,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  favouriteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EAF6EE',
    padding: 4,
    borderRadius: 16,
  },

  name: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: fonts.SemiBold,
  },

  description: {
    fontSize: 12,
    color: '#999',
    marginVertical: 4,
    fontFamily: fonts.Regular,
  },

  descriptionContainer: {
    marginRight: 6,
    position: 'relative',
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    fontWeight: '600',
    color: '#167738',
    fontFamily: fonts.Bold,
  },
});