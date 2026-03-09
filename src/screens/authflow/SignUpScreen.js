import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import GobackArrow from '../../components/ui/GobackArrow';
import Input from '../../components/ui/Input';
import ActionButton from '../../components/ui/ActionButton';
import FooterText from '../../components/ui/FooterText';
import LogoTextContainer from '../../components/ui/LogoTextContainer';
import ProfileImage from '../../assets/svgs/Profile.svg';
import MessageImage from '../../assets/svgs/Message.svg';
import LockImage from '../../assets/svgs/Lock.svg';


export default function SignUpScreen({navigation}) {

    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    return (
        <View style={styles.Container}>
            <GobackArrow />
            <View >
                <LogoTextContainer
                    title="Let's get you started"
                    subtitle="Sign In to continue" />
            </View>

            <View style = {styles.inputView}>
                <Input
                    placeholder="Username"
                    icon={<ProfileImage/>}
                    value={username}
                    onChangeText={setusername}
                />
                <Input
                    placeholder="Email"
                    icon={<MessageImage/>}
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Password"
                    Icon={<LockImage/>}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirm Password"
                    Icon={<LockImage/>}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirm Password"
                    icon={<LockImage/>}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <ActionButton title="Sign Up" onPress={() => navigation.navigate("LoginScreen")} />
            <FooterText style={styles.footer}  title="Already have an Account?"
                subtitle="Sign In" onPress={() => navigation.navigate("LoginScreen")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:
    {
        flex: 1,
        padding: 22,
        marginTop: 35,
    },
    inputView:
    {
        marginBottom: 30
    },
    footer:
        {
            marginTop: 60
        },

});

