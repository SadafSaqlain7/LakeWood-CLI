import { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();
const STORAGE_KEY = "APP_USER"; 

export const AuthProvider = ({ children }) => {

  const [user, setUserState] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          setUserState(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading user", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();

    const migrateOldProducts = async () => {
      try {
        console.log("Starting product category migration...");
        const catsSnap = await firestore().collection('categories').get();
        const catMap = {};
        catsSnap.docs.forEach(doc => {
          const name = doc.data().name?.toLowerCase();
          if (name) catMap[name] = doc.id;
        });

        const prodsSnap = await firestore().collection('products').get();
        const batch = firestore().batch();
        let migratedCount = 0;

        prodsSnap.docs.forEach(doc => {
          const data = doc.data();
          const pCategory = data.category;
          
          if (pCategory && !catsSnap.docs.find(c => c.id === pCategory)) {
            const matchedCatId = catMap[pCategory.toLowerCase()];
            if (matchedCatId) {
              const ref = firestore().collection('products').doc(doc.id);
              const updates = { category: matchedCatId };
              if (data.categoryId !== undefined) {
                updates.categoryId = firestore.FieldValue.delete();
              }
              batch.update(ref, updates);
              migratedCount++;
            }
          }
        });

        if (migratedCount > 0) {
          await batch.commit();
          console.log(`Successfully migrated ${migratedCount} old products!`);
        } else {
          console.log("No old products needed migration.");
        }
      } catch(e) {
        console.log("Migration error:", e);
      }
    };
    migrateOldProducts();
  }, []);

  const setUser = async (newUser) => {
    try {
      if (newUser) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
      setUserState(newUser);
    } catch (error) {
      console.log("Error saving user", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUserState(null);
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, selectedRole, setSelectedRole, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator /> 
      <Toast />
    </AuthProvider>
  );
}