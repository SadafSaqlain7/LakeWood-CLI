import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { fonts } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useState } from 'react';

export default function ProductCard({ item, onCardPress, onFavouritePress, isFavourite }) {

    const Icon = item.Icon;

    return (
        <Pressable style={styles.card} onPress={onCardPress}>

            <View style={styles.imageContainer}>
                {Icon && <Icon width={90} height={90} />}

                {/* Favourite Button */}
                <Pressable
                    onPress={(e) => {
                        e.stopPropagation(); // prevents triggering card press
                        onFavouritePress && onFavouritePress();
                    }}
                    style={styles.favouriteButton}
                >
                    <Ionicons
                        name={isFavourite ? 'heart' : 'heart-outline'}
                        size={18}
                        color="#167738"
                    />
                </Pressable>

            </View>

            <View style={styles.descriptionContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.name}>{item.name}</Text>
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
    card:
    {
        //backgroundColor: '#fff',
        borderRadius: 12,
        //padding: 10,
        width: '48%',
        marginBottom: 16,
        marginRight: 10,
        justifyContent: 'center',
        //height: 250
    },
    imageContainer:
    {
        height: 114,
        width: 163,
        borderRadius: 8,
        backgroundColor: '#F3F3F3',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        //marginRight: 22
    },

    favouriteButton: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: '#EAF6EE',
        padding: 4,
        borderRadius: 16
    },
    name: {
        fontWeight: '600',
        fontSize: 14,
        fontFamily: fonts.SemiBold
    },
    description: {
        fontSize: 12,
        color: '#999',
        marginVertical: 4,
        fontFamily: fonts.Regular
    },
    descriptionContainer:
    {
        marginRight: 6,
        position: 'relative'
    },
    priceConatiner: {
        position: 'relative',
        paddingRight: 36
    },
    price:
    {
        position: 'absolute',
        right: 0,
        top: 0,
        fontWeight: '600',
        color: '#167738',
        fontFamily: fonts.Bold,
    },

});