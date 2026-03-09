import { View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import { fonts } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import FeedbackImage from '../assets/svgs/feedback.svg';

export default function Feedback({ navigation }) {
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim().length === 0) return;
    setShowModal(true);
    setFeedback('');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.headerTitle}>Feedback</Text>

      <LinearGradient
        colors={['#167738', '#2F80ED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.infoCard}
      >
        <Text style={styles.infoText}>
          Hello! We hope that you are having a great time with our app,
          but also we want you to tell us how do you feel about the app.
          Also, if you’ve got something on your mind that concerns the app,
          Do let us know!
        </Text>
      </LinearGradient>

      
      <View style={styles.inputContainer}>
        <TextInput
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Please share your thoughts here. We're all Ears!"
          placeholderTextColor="#999"
          multiline
          style={styles.input}
        />
      </View>


      
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>

      <Navbar navigation={navigation} />

      
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <FeedbackImage />
            <Text style={styles.modalTitle}>Feedback Submitted!</Text>

            <Text style={styles.modalText}>
              We Appreciate you sharing your thoughts,
              we’ll be happy to account them in future updates.
            </Text>

            <Pressable
              style={styles.modalClose}
              onPress={() => setShowModal(false)}
            >
              <Text style={{ color: '#167738', fontFamily: fonts.SemiBold }}>
                Close
              </Text>
            </Pressable>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: '#2F80ED',
    borderRadius: 30,
    padding: 22,
    marginBottom: 20,
  },

  infoText: {
    color: '#fff',
    fontFamily: fonts.Regular,
    fontSize: 13,
    lineHeight: 18,
  },
  // inputContainer:
  // {
  //   backgroundColor: '#2F80ED',
  //   borderRadius: 16,
  //   padding: 16,
  //   marginBottom: 20, 

  // },

  input: {
    backgroundColor: 'rgb(238, 233, 233)',
    borderRadius: 30,
    padding: 22,
    height: 150,
    textAlignVertical: 'top',
    fontFamily: fonts.Regular,
    fontSize: 13,
    marginBottom: 30,
  },

  submitButton: {
    backgroundColor: '#167738',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontFamily: fonts.SemiBold,
    fontSize: 14,
  },

  

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },

  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#E6F4EA',
    borderRadius: 12,
    marginBottom: 16,
  },

  modalTitle: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    marginBottom: 10,
  },

  modalText: {
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontSize: 13,
    color: '#555',
    marginBottom: 16,
  },

  modalClose: {
    paddingVertical: 8,
  },
});