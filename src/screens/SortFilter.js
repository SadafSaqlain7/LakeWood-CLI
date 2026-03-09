// import { View, Text, StyleSheet } from 'react-native';
// import CategoryList from './CategoryList';
// import PopularCategories from './PopularCategories';
// import ActionButton from './ActionButton';

// const FILTERS = [
//     'Near you',
//     'Most Recent',
//     'Highest Price',
//     'Lowest Price',
// ];


// export default function SortFilter() {
//     const [price, setPrice] = useState(100);
//     return (
//         <View>   
//             <Text>Sort & Filter</Text>
//             <PopularCategories />
//             <View style={styles.container}>
//                 <Text>Price Range ${price}</Text>
//                 <Slider
//                     style={{ width: '100%', height: 40 }}
//                     minimumValue={0}
//                     maximumValue={500}
//                     step={1}
//                     minimumTrackTintColor="#167738"
//                     maximumTrackTintColor="#ccc"
//                     thumbTintColor="#167738"
//                     value={price}
//                     onValueChange={setPrice}
//                 />
//             </View>

//             <View style={styles.MainContainer}>
//                 <View style={styles.titlecontainer}>
//                     <Text style={styles.title}>{title}</Text>
//                     <Pressable>
//                         <Text style={styles.viewAll}
//                             onPress={() => navigation.navigate("Categories")}>{text}</Text>
//                     </Pressable>
//                 </View>
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.scroll}>

//                     {FILTERS.map(item => (
//                         <CategoryList
//                             key={item}
//                             label={item}
//                             active={item === active}
//                             onPress={() => handlePress(item)}
//                         />
//                     ))}
//                 </ScrollView>
//             </View>

//             <View>
//                 <ActionButton title="Reset" />
//                 <ActionButton title="Apply" />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     MainContainer:
//     { 
//         marginTop: 20,
//     }, 
//     titlecontainer:
//     { 
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 12,
//     },
//     title: {
//         fontSize: 16,
//         fontWeight: '600',
//         fontFamily: fonts.Bold
//     },

//     viewAll: {
//         color: '#999',
//         fontSize: 13,
//         color: '#000000'
//     },

//     scroll: {
//         paddingRight: 10,
//     },
// });