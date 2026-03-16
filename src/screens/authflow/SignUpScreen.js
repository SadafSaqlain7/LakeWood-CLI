import { View, StyleSheet, Text } from 'react-native';
import GobackArrow from '../../components/ui/GobackArrow';
import Input from '../../components/ui/Input';
import ActionButton from '../../components/ui/ActionButton';
import FooterText from '../../components/ui/FooterText';
import LogoTextContainer from '../../components/ui/LogoTextContainer';
import ProfileImage from '../../assets/svgs/Profile.svg';
import MessageImage from '../../assets/svgs/Message.svg';
import LockImage from '../../assets/svgs/Lock.svg';
import { AuthContext } from '../../../App';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { useState } from 'react';
import { useContext } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

import { useAuth } from '../../hooks/useAuth';


// const signupValidationSchema = Yup.object().shape({
//   username: Yup.string().min(3, 'Username too short').required('Username is required'),
//   email: Yup.string().email('Please enter a valid email').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm your password'),
// });

export default function SignUpScreen({ navigation }) {
  const { signup } = useAuth();
  const { selectedRole } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // const formik = useFormik({
  //   initialValues: {
  //     username: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   },

  //   // validationSchema: signupValidationSchema,

  //   onSubmit: async (values, { setErrors }) => {
  //     try {
  //       await signup(values);
  //     } catch (error) {
  //       setErrors(error);
  //     }
  //   },
  // });

  //const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  const handleSignup = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    setEmailError('');

    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required');
      return;
    }
    setUsernameError('');

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      return;
    }
    setConfirmPasswordError('');

    const errors = await signup({
      username,
      email,
      password,
      role: selectedRole || buyer,
    });
    if (errors?.email) {
      setEmailError(errors.email);
    }
    setEmailError('');
    if (errors?.password) {
      setPasswordError(errors.password);
    }
    setPasswordError(''); 

  };

  return (
    <View style={styles.Container}>
      <GobackArrow />

      <LogoTextContainer
        title="Let's get you started"
        subtitle="Create your account"
      />

      <View style={styles.inputView}>

        <Input
          placeholder="Username"
          Icon={<ProfileImage />}
          value={username}
          onChangeText={setUsername}
        />

        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}

        <Input
          placeholder="Email"
          Icon={<MessageImage />}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
        />

        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}

        <Input
          placeholder="Password"
          Icon={<LockImage />}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <Input
          placeholder="Confirm Password"
          Icon={<LockImage />}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

      </View>

      <ActionButton
        title="Sign Up"
        onPress={handleSignup}
      />

      <FooterText
        style={styles.footer}
        title="Already have an Account?"
        subtitle="Sign In"
        onPress={() => navigation.navigate('LoginScreen')}
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
  inputView: {
    marginBottom: 30,
  },
  footer: {
    marginTop: 60,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 12,
  },
});









