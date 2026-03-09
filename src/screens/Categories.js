import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import GobackArrow from '../components/ui/GobackArrow';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Entypo from '@expo/vector-icons/Entypo';
import Entypo from 'react-native-vector-icons/Entypo';
//import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopularCategories from '../components/ui/PopularCategories';
import { fonts } from '../../theme/theme';



function IconCard({ item }) {
    return (
        <View style={styles.CardContainer}>
            <View style={styles.IconContainer}>
                {item.Icon}
            </View>
            <Text style={styles.categoryname}>{item.title}</Text>
        </View>
    );
}


const categoriesData =
    [
        {
            id: '1',
            title: 'Clothes',
            Icon: <Ionicons name="shirt-sharp" size={24} color="#167738" />,

        },
        {
            id: '2',
            title: 'Books',
            Icon: <Entypo name="book" size={24} color="#167738" />,

        },
        {
            id: '3',
            title: 'Electronics',
            Icon: <MaterialCommunityIcons name="devices" size={24} color="#167738" />,

        },
        {
            id: '4',
            title: 'Jewelary',
            Icon: <MaterialIcons name="watch" size={24} color="#167738" />,

        },
        {
            id: '5',
            title: 'Cars',
            Icon: <FontAwesome5 name="car" size={24} color="#167738" />,

        },
        {
            id: '6',
            title: 'Footwear',
            Icon: <MaterialCommunityIcons name="shoe-cleat" size={24} color="#167738" />,

        },
        {
            id: '7',
            title: 'Furniture',
            Icon: <MaterialCommunityIcons name="lamp" size={24} color="#167738" />,

        },
        {
            id: '8',
            title: 'Hair Accessories',
            Icon: <MaterialCommunityIcons name="hair-dryer" size={24} color="#167738" />,

        },
        {
            id: '9',
            title: 'Miscellaneous',
            Icon: <MaterialIcons name="devices" size={24} color="#167738" />,

        },
        {
            id: '10',
            title: 'Services',
            Icon: <FontAwesome5 name="hand-holding" size={24} color="#167738" />,

        },
        {
            id: '11',
            title: 'Giveaways',
            Icon: <MaterialCommunityIcons name="gift-open" size={24} color="#167738" />,

        },
    ]



export default function Categories({ category = [] }) {
    return (
        <View style={styles.Container}>
            <View style={styles.nameContainer}>
                <GobackArrow />
                <Text style={styles.title}>Categories</Text>
                <Ionicons name="search" size={20} color="#167738" />
            </View>

            <PopularCategories title="Popular Categories" />

            <View style={styles.flatlistContainer}>
                <FlatList
                    data={categoriesData}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <IconCard item={item} />}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />

            </View>
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
        marginBottom: 10
    },

    title: {
        fontSize: 20,
        fontFamily: fonts.Bold,
        color: '#000',
    },

    flatlistContainer: {
        marginTop: 25,
    },

    list: {
        paddingBottom: 100,
    },

    row: {
        justifyContent: 'flex-start',
        marginBottom: 20,
    },


    CardContainer: {
        width: '33.33%',
        alignItems: 'center',
        marginBottom: 20,
    },


    IconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(181, 252, 206, 0.15)',

        alignItems: 'center',
        justifyContent: 'center',

        // iOS shadow (glow effect)
        shadowColor: '#167738',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 15,

        // Android shadow
        // elevation: 10,
    },


    categoryname: {
        fontFamily: fonts.SemiBold,
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },
});













