import { Text, View, Button, StyleSheet, Image, Pressable } from "react-native";
import { fonts } from '../../theme/theme';
import LogoTextContainer from '../components/ui/LogoTextContainer';
import FooterText from '../components/ui/FooterText';
import Divider from '../components/ui/Divider';
import ActionButton from '../components/ui/ActionButton';
import Applelogo from '../assets/svgs/applelogowhite.svg';
import FacebookLogo from '../assets/svgs/facebooklogo.svg';
import GoogleLogo from '../assets/svgs/googlelogo.svg';
import CloudImage from '../assets/svgs/Cloud.svg';

export default function SignUpLoginScreen({ navigation }) {
  return (
    <View style={styles.Container}>
      <View>
        <LogoTextContainer
          title="Let's get you started"
          subtitle="Proceed as you like" />
      </View>

      <View style={{ marginBottom: 14, marginTop: 22 }}>
        <Pressable style={styles.buttons}>
          <FacebookLogo style={styles.frames} />
          <Text style={styles.buttontext}>Continue with Facebook</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <GoogleLogo style={styles.frames} />
          <Text style={styles.buttontext}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Applelogo style={styles.frames}  />
          <Text style={styles.buttontext}>Continue with Apple </Text>
        </Pressable>
      </View>
      
      <Divider />

      <ActionButton title="Sign In with password" onPress={() => navigation.navigate("LoginScreen")} />

      <FooterText title=" Don't have an account"
        subtitle="Sign Up"  onPress={() => navigation.navigate("SignUpScreen")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 22,
    marginTop: 60,
  },
  buttons: {
    borderRadius: 8,
    backgroundColor: "rgb(60, 167, 238)",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10
  },
  buttontext:
  {
      color: 'white',
      fontFamily: fonts.Bold,
      marginLeft: 10

  },
  frames:
  {
    width: 24,
    height: 24,
  },

});
