import { Text, View, Pressable, Image, StyleSheet, TextInput, Modal } from 'react-native';
import GobackArrow from '../components/ui/GobackArrow';
import LogoTextContainer from '../components/ui/LogoTextContainer';
import ActionButton from '../components/ui/ActionButton';
import Input from '../components/ui/Input';
import MessageImage from '../assets/svgs/Message.svg';
import LockImage from '../assets/svgs/Lock.svg';
import ModalImgae from '../assets/svgs/modalImage.svg';
import { useRef, useState } from 'react';

export default function ForgetPassword({ navigation }) {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [step, setstep] = useState('email');
    const [otp, setotp] = useState(['', '', '', '']);
    const [showSuccess, setshowSuccess] = useState(false);
    const inputs = useRef([]); 

    function emailState() {
        return (
            <View >
                <Input
                    placeholder="Email"
                    Icon={<MessageImage />}
                    value={email}
                    onChangeText={setEmail}
                />
                <ActionButton title="Continue" onPress={() => setstep('otp')} />
            </View>
        );
    }

    function otpState() {
        function handlechange(text, index) {
            if (!/^\d?$/.test(text)) return;
            const newOtp = [...otp];
            newOtp[index] = text;
            setotp(newOtp);
            if (text && index < 3) {
                inputs.current[index + 1].focus();
            }
        }        
        function handleKeyPress(e, index) {
            if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                inputs.current[index - 1].focus(); 
            }
        }
        return (
            <View>
                <View style={styles.otpContainer} >
                    {otp.map((digit, index) => (
                        <View style={styles.otpState} key={index}>
                            <TextInput
                                ref={(ref) => (inputs.current[index] = ref)}
                                value={digit}
                                onChangeText={(text) => { handlechange(text, index) }}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                maxLength={1}
                                keyboardType="number-pad"
                                textAlign='center'
                            />
                        </View>
                    ))}
                </View>
                <ActionButton title="Continue" onPress={() => setstep("reset")} />
            </View>
        );

    }
    function resetState() {
        return (
            <View>
                <Input
                    placeholder="Enter New Password"
                    Icon={<LockImage />}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirm Password"
                    Icon={<LockImage />}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <ActionButton title="Continue" onPress={() => setshowSuccess(true)} />
            </View>

        );
    }

    function renderContent() {
        switch (step) {
            case 'email':
                return emailState();
            case 'otp':
                return otpState();
            case 'reset':
                return resetState();
            default:
                return null;
        }
    }
    return (
        <View style={styles.Container}>
            <GobackArrow />
            <View >
                <LogoTextContainer
                    title="Forgot password?"
                    subtitle="Enter your details to continue" />
            </View>
            <View style={styles.contentContainer}>
                {renderContent()}
            </View>
            <Modal
                transparent
                visible={showSuccess}
                animationType="fade" >
                <View style={styles.modalOverlay}>
                    <View style={styles.popupCard}>
                        <ModalImgae />

                        <Text style={styles.popupText}>
                            Password reset successful!
                        </Text>
                        <View style={{ width: '100%' }}>
                            <ActionButton
                                title="Sign In"
                                onPress={() => {
                                    setshowSuccess(false);
                                    navigation.navigate('LoginScreen');
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal >
        </View>
    );
}

const styles = StyleSheet.create(
    {
        Container:
        {
            flex: 1,
            padding: 22,
            marginTop: 35,
        },
        contentContainer:
        {
            marginTop: 30
        },
        otpState:
        {
            marginBottom: 30,
            borderWidth: 1,
            borderColor: '#167738',
            margin: 10,
            width: 62,
            height: 62,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            fontSize: 60
        },
        otpContainer:
        {
            flexDirection: 'row',
            //margin: 20
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        popupCard: {
            width: '85%',
            backgroundColor: '#F6FFF8', 
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 8,
        },
        popupImage: {
            width: 160,
            height: 160,
            resizeMode: 'contain',
            marginBottom: 20,
        },
        popupText: {
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            color: 'black', 
            marginBottom: 25,
        },
    }
);