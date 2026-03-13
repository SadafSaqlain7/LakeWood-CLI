import Toast from 'react-native-toast-message';

export const showToast = (errorMessage, title, type) => {
  Toast.show({
    type: type || 'error',
    text1: title || 'Error',
    text2: errorMessage,
    position: 'top',
  });
};