import { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../App';
import { showToast } from '../helpers/toast';

export const useAuth = () => {
  const { setUser } = useContext(AuthContext);

  const signup = async ({ username, email, password }) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const uid = result.user.uid;

      await firestore()
        .collection('users')
        .doc(uid)
        .set({
          uid: uid,
          username: username,
          email: email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setUser({ userId: uid });

      showToast('Account created successfully', 'Success', 'success');
    } catch (error) {
      console.log('Signup error:', error.code);

      if (error.code === 'auth/email-already-in-use') {
        throw { email: 'This email is already registered' };
      } else if (error.code === 'auth/invalid-email') {
        throw { email: 'Invalid email address' };
      } else if (error.code === 'auth/weak-password') {
        throw { password: 'Password is too weak' };
      } else {
        showToast('Signup failed', 'Error');
      }
    }
  };

  const login = async ({ email, password }) => {
    try {
      const result = await auth().signInWithEmailAndPassword(
        email,
        password
      );

      const uid = result.user.uid;

      const userDoc = await firestore()
        .collection('users')
        .doc(uid)
        .get();

      if (!userDoc.exists) {
        throw new Error('User data not found');
      }

      setUser({ userId: uid });

      showToast('Login successful', 'Success', 'success');
    } catch (error) {
      console.log('Login error:', error.code);

      if (error.code === 'auth/user-not-found') {
        throw { email: 'User not found' };
      } else if (error.code === 'auth/wrong-password') {
        throw { password: 'Wrong password' };
      } else if (error.code === 'auth/invalid-email') {
        throw { email: 'Invalid email address' };
      } else {
        showToast('Login failed', 'Error');
      }
    }
  };

  return { signup, login };
};