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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

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

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: signupValidationSchema,

    onSubmit: async (values, { setErrors }) => {
      try {
        await signup(values);
      } catch (error) {
        setErrors(error);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

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