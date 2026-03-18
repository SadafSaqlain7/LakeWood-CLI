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
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/useAuth';

const signupValidationSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Username too short').required('Username is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export default function SignUpScreen({ navigation }) {
  const { signup } = useAuth();
  const { selectedRole } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setErrors }) => {
      try {
        const errors = await signup({
          username: values.username,
          email: values.email,
          password: values.password,
          role: selectedRole || 'buyer',
        });
        if (errors) {
          setErrors(errors);
        }
      } catch (error) {
        console.log("Signup error:", error);
      }
    },
  });

  const { values, errors, handleChange, handleBlur, handleSubmit } = formik;

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
          value={values.username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
        />

        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}

        <Input
          placeholder="Email"
          Icon={<MessageImage />}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
        />

        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <Input
          placeholder="Password"
          Icon={<LockImage />}
          secureTextEntry
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <Input
          placeholder="Confirm Password"
          Icon={<LockImage />}
          secureTextEntry
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
        />

        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

      </View>

      <ActionButton
        title="Sign Up"
        onPress={handleSubmit}
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









