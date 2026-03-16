import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import GobackArrow from '../components/ui/GobackArrow';
import LogoTextContainer from '../components/ui/LogoTextContainer';
import ActionButton from '../components/ui/ActionButton';
import Input from '../components/ui/Input';
import MessageImage from '../assets/svgs/Message.svg';
import { fonts } from '../../theme/theme';

export default function ForgetPassword({ navigation }) {
  const { sendResetEmail } = useAuth();

  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email'); 
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  
  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return '';
  }

  
  async function handleSendLink() {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError('');
    setLoading(true);
    try {
      await sendResetEmail(email);
      setStep('sent'); 
    } catch (err) {
      setEmailError(err.message);
    } finally {
      setLoading(false);
    }
  }

  
  function renderEmailStep() {
    return (
      <View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Enter the email address linked to your account. We'll send you a
            link to reset your password.
          </Text>
        </View>

        <Input
          placeholder="Email"
          Icon={<MessageImage />}
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}

        <ActionButton
          title={loading ? 'Sending…' : 'Send Reset Link'}
          onPress={handleSendLink}
        />
      </View>
    );
  }

  
  function renderSentStep() {
    return (
      <View style={styles.sentContainer}>

      
        <View style={styles.iconCircle}>
          <MessageImage width={28} height={28} />
        </View>

        
        <Text style={styles.sentTitle}>Check your inbox</Text>

       
        <Text style={styles.sentBody}>
          We've sent a password reset link to{' '}
          <Text style={styles.emailHighlight}>{email}</Text>
          . Open the link, reset your password in the browser, then come back
          and sign in.
        </Text>

        
        <ActionButton
          title="Back to Sign In"
          onPress={() => navigation.navigate('LoginScreen')}
          buttonStyle={styles.fullWidthButton}
        />

       
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive it? </Text>
          <Text
            style={styles.resendLink}
            onPress={() => {
              setStep('email');
              setEmail('');
            }}>
            Try again
          </Text>
        </View>
      </View>
    );
  }

  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <GobackArrow />

          <LogoTextContainer
            title="Forgot Password?"
            subtitle={
              step === 'email'
                ? 'Enter your email to get started'
                : 'Reset link sent!'
            }
          />

          <View style={styles.contentContainer}>
            {step === 'email' ? renderEmailStep() : renderSentStep()}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    padding: 22,
    marginTop: 35,
  },
  contentContainer: {
    marginTop: 4,
  },

  
  infoBox: {
    backgroundColor: '#F0FBF4',
    borderRadius: 12,
    padding: 14,
    marginBottom: 22,
  },
  infoText: {
    fontFamily: fonts.Regular,
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
  },
  errorText: {
    color: '#e03535',
    fontFamily: fonts.Regular,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 12,
    marginLeft: 4,
  },

  
  sentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8F8EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#c0eacf',
  },
  sentTitle: {
    fontFamily: fonts.Bold,
    fontSize: 24,
    color: '#167738',
    marginBottom: 14,
    textAlign: 'center',
  },
  sentBody: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 8,
  },
  emailHighlight: {
    fontFamily: fonts.SemiBold,
    color: '#167738',
  },
  fullWidthButton: {
    width: '100%',
  },



  
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  resendText: {
    fontFamily: fonts.Regular,
    fontSize: 13,
    color: '#666',
  },
  resendLink: {
    fontFamily: fonts.SemiBold,
    fontSize: 13,
    color: '#167738',
    textDecorationLine: 'underline',
  },
});