import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { fonts } from "../theme/theme";
import BuyImage from '../assets/svgs/buyImage.svg';
import SellImage from '../assets/svgs/sellImage.svg';
import LogoImage from '../assets/svgs/LogoImage.svg';


export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <LogoImage style={styles.LogoContainer} />
      
      <Text style={styles.textContainer}>Selling Made Simple</Text>
      <View style={styles.ImageContainer}>
        <Pressable onPress={() => navigation.navigate("SignUpLoginScreen")}>
          <BuyImage style={styles.Image} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("SignUpLoginScreen")}>
          <SellImage style={styles.Image} />
        </Pressable>
      </View>
      <Text style={styles.footerText}>Terms & conditions may apply</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  textContainer: {
    fontFamily: fonts.rocksalt,
    textAlign: "center",
    paddingBottom: 10,
    color: "#167738",
    fontSize: 20,
  },
  LogoContainer: {
    width: 273,
    height: 122,
    marginBottom: 10,
    alignItems: "center",
    marginTop: 50,
    marginLeft: 28,
  },
  ImageContainer: {
  },
  Image:
  {
    marginBottom: 6,
    width: 335,
    height: 128,
  },
  footerText: {
    textAlign: "center",
    marginBottom: 40,
  },
});
