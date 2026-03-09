//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function GobackArrow({ goToScreen,  onPress, params }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); 
    } else if (goToScreen) {
      navigation.navigate(goToScreen, params);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View >
      <Pressable
        onPress={handlePress}
      >
        <Ionicons name="arrow-back" size={24} color="#rgb(12, 3, 3)000" />
      </Pressable>
    </View>
  );
}