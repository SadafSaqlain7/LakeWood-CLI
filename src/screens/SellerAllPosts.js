import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import LogoMini from '../assets/svgs/Logo2.svg';
import { fonts } from '../../theme/theme';
import SellerProductCard from '../components/ui/SellerProductCard';
import SellerNavbar from '../components/ui/SellerNavbar';
import Shoes from '../assets/svgs/shoes.svg';
import Earbuds from '../assets/svgs/Earbuds.svg';

// Dummy data to simulate the 3 different states
const PRODUCTS = {
  pending: [
    { id: '1', name: 'Suga leather shoes', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Shoes },
    { id: '2', name: 'TWS Earbuds M10', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Earbuds },
  ],
  approved: [
    { id: '3', name: 'Suga leather shoes', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Shoes },
    { id: '4', name: 'TWS Earbuds M10', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Earbuds },
  ],
  history: [
    { id: '5', name: 'Suga leather shoes', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Shoes },
    { id: '6', name: 'TWS Earbuds M10', description: 'Lorem ipsum dolor sit amet consectetur. See more', price: '80', Icon: Earbuds },
  ]
};

export default function SellerAllPosts({ navigation, route }) {
  // If navigating from the Success Modal, it will pass { activeTab: 'Pending' }
  const initialTab = route?.params?.activeTab || 'Pending';
  const [activeTab, setActiveTab] = useState(initialTab);

  const TABS = ['Pending', 'Approved', 'History'];

  useEffect(() => {
    if (route?.params?.activeTab) {
        setActiveTab(route.params.activeTab);
    }
  }, [route?.params?.activeTab]);

  // Determine which data to show based on the active tab
  const getListData = () => {
    if (activeTab === 'Pending') return PRODUCTS.pending;
    if (activeTab === 'Approved') return PRODUCTS.approved;
    if (activeTab === 'History') return PRODUCTS.history;
    return [];
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <LogoMini style={styles.logoImage} />
        <Text style={styles.title}>My posts</Text>
        <View style={{ width: 108 }} /> {/* Spacer to center the title */}
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={getListData()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <SellerProductCard
                item={item}
                type={activeTab.toLowerCase()}
            />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <SellerNavbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 45,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#167738', // Dark green indicator
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: '#757575',
  },
  activeTabText: {
    fontFamily: fonts.Bold,
    color: '#167738',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for Navbar
  },
});