import { View, StyleSheet, Text } from 'react-native';
import { useContext } from 'react';
import GobackArrow from '../../components/ui/GobackArrow';
import Input from '../../components/ui/Input';
import ActionButton from '../../components/ui/ActionButton';
import FooterText from '../../components/ui/FooterText';
import LogoTextContainer from '../../components/ui/LogoTextContainer';
import ProfileImage from '../../assets/svgs/Profile.svg';
import MessageImage from '../../assets/svgs/Message.svg';
import LockImage from '../../assets/svgs/Lock.svg';
import { AuthContext } from '../../../App';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

const signupValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username too short')
        .required('Username is required'),

    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});

export default function SignUpScreen({ navigation }) {
    const { setUser } = useContext(AuthContext);
    return (
        <View style={styles.Container}>
            <GobackArrow />
            <LogoTextContainer
                title="Let's get you started"
                subtitle="Create your account"
            />
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}

                validationSchema={signupValidationSchema}

                onSubmit={(values, { setSubmitting, setErrors }) => {

                    console.log("Signup values:", values);
                    const auth = getAuth();
                    createUserWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password
                    )
                        .then((userCredential) => {

                            const user = userCredential.user;

                            console.log("User created:", user.uid);

                            setUser({ userId: user.uid });

                        })
                        .catch((error) => {

                            console.log("Firebase error:", error.code);

                            if (error.code === 'auth/email-already-in-use') {
                                setErrors({ email: 'This email is already registered' });
                            }

                            else if (error.code === 'auth/invalid-email') {
                                setErrors({ email: 'Invalid email address' });
                            }

                            else if (error.code === 'auth/weak-password') {
                                setErrors({ password: 'Password is too weak' });
                            }

                            else {
                                setErrors({ email: 'Signup failed. Try again.' });
                            }

                        })
                        .finally(() => {
                            setSubmitting(false);
                        });

                }}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting
                }) => {

                    console.log("Formik Errors:", errors);
                    return (
                        <>
                            <View style={styles.inputView}>

                                <Input
                                    placeholder="Username"
                                    icon={<ProfileImage />}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                />

                                {touched.username && errors.username && (
                                    <Text style={styles.errorText}>{errors.username}</Text>
                                )}
                                <Input
                                    placeholder="Email"
                                    icon={<MessageImage />}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                <Input
                                    placeholder="Password"
                                    icon={<LockImage />}
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                {errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}

                                <Input
                                    placeholder="Confirm Password"
                                    icon={<LockImage />}
                                    secureTextEntry
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                />

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}
                            </View>

                            <ActionButton
                                title="Sign Up"
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            />
                            <FooterText
                                style={styles.footer}
                                title="Already have an Account?"
                                subtitle="Sign In"
                                onPress={() => navigation.navigate("LoginScreen")}
                            />
                        </>
                    )
                }}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 22,
        marginTop: 35,
    },
    inputView: {
        marginBottom: 30
    },
    footer: {
        marginTop: 60
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
        fontSize: 12
    }
});