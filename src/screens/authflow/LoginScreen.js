import { Text, View, StyleSheet, Pressable } from 'react-native';
import { fonts } from '../../../theme/theme';
import { useContext } from 'react';
import LogoTextContainer from '../../components/ui/LogoTextContainer';
import Input from '../../components/ui/Input';
import ActionButton from '../../components/ui/ActionButton';
import FooterText from '../../components/ui/FooterText';
import Divider from '../../components/ui/Divider';
import RememberMeCheckbox from '../../components/ui/RememberCheckBox';
import GobackArrow from '../../components/ui/GobackArrow';
import AppleLogo from '../../assets/svgs/applelogoblack.svg';
import FacebookLogo from '../../assets/svgs/facebooklogo.svg';
import GoogleLogo from '../../assets/svgs/googlelogo.svg';
import LockImage from '../../assets/svgs/Lock.svg';
import MessageImage from '../../assets/svgs/Message.svg';

import { AuthContext } from '../../../App';

import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

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
            <LogoTextContainer
                title="Let's get you started"
                subtitle="Sign In to continue"
            />
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        const result = await auth().signInWithEmailAndPassword(
                            values.email,
                            values.password
                        );
                        console.log("User logged in:", result.user.uid);
                        setUser({ userId: result.user.uid });
                        navigation.navigate('HomeScreen');
                    }
                    catch (error) {
                        console.log("Login error:", error.code);
                        if (error.code === 'auth/user-not-found') {
                            setErrors({ email: 'User not found' });
                        }
                        else if (error.code === 'auth/wrong-password') {
                            setErrors({ password: 'Wrong password' });
                        }
                        else if (error.code === 'auth/invalid-email') {
                            setErrors({ email: 'Invalid email address' });
                        }
                        else {
                            setErrors({ email: 'Login failed. Try again.' });
                        }
                    }
                    finally {
                        setSubmitting(false);
                    }
                }}  >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting
                }) => (
                    <>

                        <Input
                            placeholder="Email"
                            Icon={<MessageImage />}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <Input
                            placeholder="Password"
                            Icon={<LockImage />}
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <View style={styles.checkboxContainer}>
                            <RememberMeCheckbox />
                            <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
                                <Text style={styles.passwordtext}>Forgot Password?</Text>
                            </Pressable>
                        </View>

                        <ActionButton
                            title="Sign In"
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        />

                    </>
                )}

            </Formik>

            <Divider style={styles.divider} />
            <View style={styles.mainIconContainer}>
                <Pressable style={styles.iconContainer}>
                    <FacebookLogo />
                </Pressable>

                <Pressable style={styles.iconContainer}>
                    <GoogleLogo />
                </Pressable>

                <Pressable style={styles.iconContainer}>
                    <AppleLogo />
                </Pressable>
            </View>
            <FooterText
                title=" Don't have an account"
                subtitle="Sign Up"
                style={styles.footer}
                onPress={() => navigation.navigate("SignUpScreen")}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        padding: 22,
        marginTop: 35,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    divider: {
        marginBottom: 20,
    },
    footer: {
        marginTop: 60
    },
    passwordtext: {
        fontFamily: fonts.SemiBold,
        marginLeft: 60,
        marginTop: 10
    },

    mainIconContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    iconContainer: {
        width: 88,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
        marginBottom: 10
    }

});