import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { fonts } from '../../../theme/theme';

export default function SellerProductCard({ item, type = 'pending', onPress }) {
   
    const renderTag = () => {
        if (type === 'history') {
            return (
                <View style={styles.soldTag}>
                    <Text style={styles.soldTagText}>Sold</Text>
                </View>
            );
        }
        return null; 
    };

    const Icon = item.Icon;

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                {Icon ? (
                    <Icon width={60} height={60} />
                ) : item.image ? (
                     <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                     <View style={styles.placeholderImage} />
                )}
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.topRow}>
                    <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                </View>
                
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
                
                <View style={styles.bottomRow}>
                    <Text style={styles.price}>${item.price}</Text>
                    {renderTag()}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: 50,
        height: 50,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.Bold,
        color: '#000',
        flex: 1,
    },
    description: {
        fontSize: 12,
        fontFamily: fonts.Regular,
        color: '#757575',
        marginTop: 4,
        lineHeight: 16,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 14,
        fontFamily: fonts.Bold,
        color: '#000',
    },
    soldTag: {
        backgroundColor: '#167738',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 20,
    },
    soldTagText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: fonts.SemiBold,
    },
});
