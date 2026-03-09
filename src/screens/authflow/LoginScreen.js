import { Text, Image, Button, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { fonts } from '../../theme/theme';
import { useContext } from 'react';
import LogoTextContainer from '../../components/ui/LogoTextContainer';
import Input from '../../components/ui/Input';
import ActionButton from '../../components/ui/ActionButton';
import FooterText from '../../components/ui/FooterText';
import Divider from '../../components/ui/Divider';
import RememberMeCheckbox from '../../components/ui/RememberCheckBox';
import GobackArrow from '../../components/ui/GobackArrow';
import { Ionicons } from '@expo/vector-icons';
import AppleLogo from '../../assets/svgs/applelogoblack.svg';
import FacebookLogo from '../../assets/svgs/facebooklogo.svg';
import GoogleLogo from '../../assets/svgs/googlelogo.svg';
import LockImage from '../../assets/svgs/Lock.svg';
import MessageImage from '../../assets/svgs/Message.svg';
import { AuthContext } from '../../App';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export default function LoginScreen({ navigation }) {
    const { setUser } = useContext(AuthContext);
    return (
        <View style={styles.Container}>
            <GobackArrow />
            <View>
                <LogoTextContainer
                    title="Let's get you started"
                    subtitle="Sign In to continue" />
            </View>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        const auth = getAuth();
                        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
                        setUser({ userId: result.user.uid });
                        navigation.navigate('HomeScreen');
                    } catch (error) {
                        if (error.code === 'auth/email-already-in-use') {
                            setErrors({ email: 'That email address is already in use!' });
                        } else if (error.code === 'auth/invalid-email') {
                            setErrors({ email: 'That email address is invalid!' });
                        } else {
                            setErrors({ email: 'Authentication failed.' });
                        }
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <>
                        <Input
                            placeholder="Email"
                            Icon={<MessageImage />}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={touched.email && errors.email}
                        />
                        <Input
                            placeholder="Password"
                            Icon={<LockImage />}
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={touched.password && errors.password}
                        />
                        <View style={styles.checkboxContainer}>
                            <RememberMeCheckbox />
                            <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
                                <Text style={styles.passwordtext}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                        <ActionButton title="Sign In" onPress={handleSubmit} disabled={isSubmitting} />
                    </>
                )}
            </Formik>

            <Divider style={styles.divider} />

            <View style={styles.mainIconContainer} >
                <Pressable style={styles.iconContainer}>
                    <FacebookLogo style={styles.frames} />
                </Pressable>
                <Pressable style={styles.iconContainer}>
                    <GoogleLogo style={styles.frames} />
                </Pressable>
                <Pressable style={styles.iconContainer}>
                    <AppleLogo style={styles.frames} />
                </Pressable>
            </View>

            <FooterText title=" Don't have an account"
                subtitle="Sign Up" style={styles.footer} onPress={() => navigation.navigate("SignUpScreen")} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        Container: {
            flex: 1,
            padding: 22,
            marginTop: 35,
        },

        image:
        {
            //padding: 10,
            margin: 10
        },
        checkboxContainer:
        {
            flexDirection: 'row',
            marginBottom: 20
        },
        divider:
        {
            marginBottom: 20,
        },
        footer:
        {
            marginTop: 60
        },
        passwordtext:
        {
            fontFamily: fonts.SemiBold,
            marginLeft: 60,
            marginTop: 10
        },
        mainIconContainer:
        {
            //marginTop: 20,
            flexDirection: 'row',
            padding: 10,
            //marginHorizontal: 10
        },
        iconContainer:
        {
            width: 88,
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'black',
            alignItems: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            marginRight: 15
        }
    });
