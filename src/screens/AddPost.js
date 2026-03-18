import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../theme/theme';
import ActionButton from '../components/ui/ActionButton';
import Input from '../components/ui/Input';

import Shoes from '../assets/svgs/shoes.svg';
import Earbuds from '../assets/svgs/Earbuds.svg';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const productImages = {
    shoe: Shoes,
    earbuds: Earbuds,
};

const productImageKeys = ['shoe', 'earbuds'];

// Categories will be dynamically fetched from Firestore

export default function AddPost({ navigation }) {

    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await firestore().collection('categories').get();
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategoriesList(list);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const isFilled =
        title.trim() !== '' &&
        categoryId !== '' &&
        price.trim() !== '' &&
        location.trim() !== '' &&
        description.trim() !== '' &&
        photos.length > 0;

    const handleAddPhoto = () => {
        if (photos.length < 5) {
            const nextImage =
                productImageKeys[Math.floor(Math.random() * productImageKeys.length)];
            setPhotos([...photos, nextImage]);
        }
    };

    const handleRemovePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleCreatePost = async () => {
        try {
            const uid = auth().currentUser.uid;

            await firestore()
                .collection('products')
                .add({
                    title: title.trim(),
                    category: categoryId,
                    price: price.trim(),
                    location: location.trim(),
                    description: description.trim(),
                    photos: photos,
                    sellerId: uid,
                    status: "approved",
                    likesCount: 0,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });

            setTitle('');
            setCategory('');
            setCategoryId('');
            setPrice('');
            setLocation('');
            setDescription('');
            setPhotos([]);

            setModalVisible(true);

        } catch (error) {
            console.log("Error adding product:", error);
        }
    };

    return (
        <View style={styles.mainContainer}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.goBackContainer}>
                    <GobackArrow />
                </View>
                <Text style={styles.headerTitle}>Add Post</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Photo Upload */}
                <View style={styles.photoUploadContainer}>

                    {photos.length === 0 ? (
                        <View style={styles.emptyPhotoBox}>
                            <View style={styles.photoLabels}>
                                <Ionicons name="image" size={24} color="#000" />
                                <Text style={styles.addPhotosText}>Add photos</Text>
                            </View>
                            <Pressable style={styles.addIconButton} onPress={handleAddPhoto}>
                                <Ionicons name="add" size={24} color="#fff" />
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.filledPhotoBox}>
                            <View style={styles.photoHeader}>
                                <Ionicons name="image" size={20} color="#000" />
                                <Text style={styles.addPhotosTextSmall}>Add photos</Text>
                            </View>

                            <View style={styles.photosRow}>
                                {photos.map((photoKey, index) => {
                                    const SvgComponent = productImages[photoKey];
                                    return (
                                        <View key={index} style={styles.photoWrapper}>
                                            <SvgComponent width={60} height={60} />
                                            <Pressable
                                                style={styles.removePhotoBtn}
                                                onPress={() => handleRemovePhoto(index)}
                                            >
                                                <Ionicons name="close" size={12} color="#000" />
                                            </Pressable>
                                        </View>
                                    );
                                })}

                                {photos.length < 5 && (
                                    <Pressable
                                        style={styles.addMoreIconButton}
                                        onPress={handleAddPhoto}
                                    >
                                        <Ionicons name="add" size={24} color="#fff" />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    )}
                </View>

                <Text style={styles.photoLimitText}>
                    Photos: {photos.length}/5 - Choose your product's main photo first
                </Text>

                {/* Form */}
                <View style={styles.formContainer}>

                    <Input
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputText}
                    />

                    {/* Category Dropdown */}
                    <Pressable
                        style={[styles.inputContainer, styles.dropdownContainer]}
                        onPress={() => setCategoryModal(true)}
                    >
                        <Text style={category ? styles.inputText : styles.placeholderText}>
                            {category || "Select Category"}
                        </Text>
                        <Ionicons name="caret-down" size={16} color="#000" />
                    </Pressable>

                    <Input
                        placeholder="Price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputText}
                    />

                    <Input
                        placeholder="Location Area"
                        value={location}
                        onChangeText={setLocation}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputText}
                    />

                    <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Description"
                            placeholderTextColor="#222"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                </View>

            </ScrollView>

            {/* Post Button */}
            <View style={styles.bottomContainer}>
                <ActionButton
                    title="Post"
                    buttonStyle={isFilled ? styles.postButtonActive : styles.postButtonInactive}
                    textStyle={isFilled ? styles.postButtonTextActive : styles.postButtonTextInactive}
                    onPress={() => {
                        if (isFilled) handleCreatePost();
                    }}
                />
            </View>

            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.illustrationPlaceholder}>
                            <Ionicons name="document-text" size={60} color="#167738" />
                        </View>
                        <Text style={styles.modalTitle}>Post is pending approval!</Text>
                        <ActionButton
                            title="View"
                            buttonStyle={styles.modalViewButton}
                            textStyle={styles.modalViewButtonText}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('SellerAllPosts', { activeTab: 'approved' });
                            }}
                        />
                    </View>
                </View>
            </Modal>

            {/* Category Modal */}
            <Modal
                visible={categoryModal}
                transparent
                animationType="fade"
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setCategoryModal(false)}
                >
                    <View style={styles.categoryModal}>
                        {categoriesList.map((item, index) => (
                            <Pressable
                                key={index}
                                style={styles.categoryItem}
                                onPress={() => {
                                    setCategory(item.title || item.name || item.id);
                                    setCategoryId(item.id);
                                    setCategoryModal(false);
                                }}
                            >
                                <Text style={styles.categoryText}>{item.title || item.name || item.id}</Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    goBackContainer: {
        width: 40,
    },

    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.Bold,
        color: '#000',
    },

    headerRight: {
        width: 40,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    photoUploadContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        padding: 20,
        marginBottom: 10,
        minHeight: 120,
        justifyContent: 'center',
    },

    emptyPhotoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    photoLabels: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    addPhotosText: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: fonts.Regular,
        color: '#000',
    },

    addIconButton: {
        backgroundColor: '#115C2B',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    filledPhotoBox: {
        flexDirection: 'column',
    },

    photoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    addPhotosTextSmall: {
        marginLeft: 8,
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#000',
    },

    photosRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    photoWrapper: {
        position: 'relative',
        marginRight: 12,
        marginBottom: 10,
    },

    removePhotoBtn: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    addMoreIconButton: {
        backgroundColor: '#115C2B',
        borderRadius: 8,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    photoLimitText: {
        fontSize: 12,
        color: '#6B7280',
        fontFamily: fonts.Regular,
        marginBottom: 20,
        marginLeft: 5,
    },

    formContainer: {
        marginTop: 5,
    },

    inputContainer: {
        backgroundColor: '#F3F4F6',
        borderWidth: 0,
        borderRadius: 12,
        height: 55,
        marginBottom: 15,
        paddingHorizontal: 15,
    },

    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    inputText: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#000',
        flex: 1,
    },

    placeholderText: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#999',
        flex: 1,
    },

    textAreaContainer: {
        height: 120,
        paddingTop: 15,
        alignItems: 'flex-start',
    },

    textArea: {
        flex: 1,
        width: '100%',
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#000',
    },

    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },

    postButtonInactive: {
        backgroundColor: '#A3CBAF',
        borderRadius: 30,
        height: 55,
    },

    postButtonActive: {
        backgroundColor: '#167738',
        borderRadius: 30,
        height: 55,
    },

    postButtonTextInactive: {
        color: '#fff',
    },

    postButtonTextActive: {
        color: '#fff',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '85%',
        backgroundColor: '#FCFCFC',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },

    illustrationPlaceholder: {
        width: 150,
        height: 120,
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    modalTitle: {
        fontSize: 18,
        fontFamily: fonts.Bold,
        color: '#000',
        marginBottom: 30,
        textAlign: 'center',
    },

    modalViewButton: {
        backgroundColor: '#167738',
        borderRadius: 30,
        width: '100%',
        height: 50,
    },

    modalViewButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    categoryModal: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 10,
        width: '80%',
    },

    categoryItem: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    categoryText: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#000',
    },

});