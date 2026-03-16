import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { ROUTES } from '../../theme/routes';


import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import Profile from '../screens/Profile';
import Categories from '../screens/Categories';
import DisplayWishList from '../screens/DisplayWishList';
import Notification from '../screens/Notification';
import EditProfile from '../screens/EditProfile';
import NotificationSettings from '../screens/NotificationSettings';
import Language from '../screens/Language';
import Faqs from '../screens/Faqs';
import Chats from '../screens/Chats';
import Chatdetails from '../screens/Chatdetails';
import Feedback from '../screens/Feedback';
import ProductDetails from '../screens/ProductDetails';
import SellerProfile from '../screens/SellerProfile';
import SellerAllPosts from '../screens/SellerAllPosts';
import ChatConversation from '../screens/ChatConversation';
import ChatIntro from '../screens/ChatIntro';
import ChatProductPreview from '../screens/ChatProductPreview';


import SellerHomeScreen from '../screens/SellerHomeScreen';
import AddPost from '../screens/AddPost';
import ActivePosts from '../screens/ActivePosts';
import SellerPostDetails from '../screens/SellerPostDetails';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const { user } = useContext(AuthContext);

  
  if (!user) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

    
      {user.role === 'seller' && (
        <>
          <Stack.Screen name={ROUTES.SELLERHOMESCREEN} component={SellerHomeScreen} />
          <Stack.Screen name={ROUTES.ADDPOST} component={AddPost} />
          <Stack.Screen name={ROUTES.ACTIVEPOSTS} component={ActivePosts} />
          <Stack.Screen name={ROUTES.SELLERPOSTDETAILS} component={SellerPostDetails} />
        </>
      )}

     
      {user.role === 'buyer' && (
        <>
          <Stack.Screen name={ROUTES.HOMESCREEN} component={HomeScreen} />
          <Stack.Screen name={ROUTES.SEARCHRESULTSSCREEN} component={SearchResultsScreen} />
          <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
          <Stack.Screen name={ROUTES.CATEGORIES} component={Categories} />
          <Stack.Screen name={ROUTES.DISPLAYWISHLIST} component={DisplayWishList} />
          <Stack.Screen name={ROUTES.NOTIFICATION} component={Notification} />
          <Stack.Screen name={ROUTES.EDITPROFILE} component={EditProfile} />
          <Stack.Screen name={ROUTES.NOTIFICATION_SETTINGS} component={NotificationSettings} />
          <Stack.Screen name={ROUTES.LANGUAGE} component={Language} />
          <Stack.Screen name={ROUTES.FAQS} component={Faqs} />
          <Stack.Screen name={ROUTES.CHATS} component={Chats} />
          <Stack.Screen name={ROUTES.CHATDETAILS} component={Chatdetails} />
          <Stack.Screen name={ROUTES.FEEDBACK} component={Feedback} />
          <Stack.Screen name={ROUTES.PRODUCTDETAILS} component={ProductDetails} />
          <Stack.Screen name={ROUTES.SELLERPROFILE} component={SellerProfile} />
          <Stack.Screen name={ROUTES.SELLERALLPOSTS} component={SellerAllPosts} />
          <Stack.Screen name={ROUTES.CHATCONVERSATION} component={ChatConversation} />
          <Stack.Screen name={ROUTES.CHATINTRO} component={ChatIntro} />
          <Stack.Screen name={ROUTES.CHATPRODUCTPREVIEW} component={ChatProductPreview} />
        </>
      )}

    </Stack.Navigator>
  );
}