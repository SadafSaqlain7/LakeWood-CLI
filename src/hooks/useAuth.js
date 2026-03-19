import { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../App';
import { showToast } from '../helpers/toast';

export const useAuth = () => {
  const { setUser } = useContext(AuthContext);
  const signup = async ({ username, email, password, role }) => {
    try { 
      const result = await auth().createUserWithEmailAndPassword(email, password);
      const uid = result.user.uid;
      const payload = {
        userId: uid,
        username,
        email,
        role,
        createdAt: firestore.FieldValue.serverTimestamp(),
      } 
      await firestore()
        .collection('users')
        .doc(uid)
        .set(payload);

      setUser(payload);

      showToast('Account created successfully', 'Success', 'success');
      return null;

    } catch (error) {
      console.log('Signup error:', error.code);

      if (error.code === 'auth/email-already-in-use') {
        return { email: 'This email is already registered' };
      }

      if (error.code === 'auth/invalid-email') {
        return { email: 'Invalid email address' };
      }

      if (error.code === 'auth/weak-password') {
        return { password: 'Password is too weak' };
      }

      return { general: 'Signup failed. Try again.' };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      const uid = result.user.uid;

      const userDoc = await firestore()
        .collection('users')
        .doc(uid)
        .get();

      if (!userDoc.exists) throw new Error('User data not found');

      const userData = userDoc.data();

      setUser({
        userId: uid,
        role: userData.role,
        username: userData.username,
        email: userData.email,
        createdAt: userData.createdAt
      });

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

  const sendResetEmail = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
      showToast('Reset link sent! Check your inbox.', 'Email Sent', 'success');
    } catch (error) {
      console.log('sendResetEmail error:', error.code);
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error('Failed to send reset email. Please try again.');
      }
    }
  };

  return { signup, login, sendResetEmail };
};