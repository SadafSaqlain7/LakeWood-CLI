import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import GobackArrow from '../components/ui/GobackArrow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../../theme/theme';
import ActionButton from '../components/ui/ActionButton';
import Input from '../components/ui/Input';

export default function AddPost({ navigation }) {
    // State to simulate photo upload and form filling
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // Check if form is partially filled (simulating the filled state)
    const isFilled = title.trim() !== '' || category.trim() !== '' || price.trim() !== '' || location.trim() !== '' || description.trim() !== '' || photos.length > 0;

    const handleAddPhoto = () => {
        // Simulating adding photos
        if (photos.length < 5) {
            setPhotos([...photos, 'https://i.pravatar.cc/150?img=' + (Math.floor(Math.random() * 50))]);
            // For demo purposes, auto-fill some text when adding a photo if empty
            if (title === '') setTitle('Suga leather shoes');
            if (category === '') setCategory('Clothing');
            if (price === '') setPrice('$80');
            if (location === '') setLocation('45 Ave, 3411 Phill.');
            if (description === '') setDescription('Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.');
        }
    };

    const handleRemovePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.mainContainer}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.goBackContainer}>
                    <GobackArrow />
                </View>
                <Text style={styles.headerTitle}>Add Post</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Photo Upload Box */}
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
                                {photos.map((photoUri, index) => (
                                    <View key={index} style={styles.photoWrapper}>
                                        <Image source={{ uri: photoUri }} style={styles.uploadedPhoto} />
                                        <Pressable style={styles.removePhotoBtn} onPress={() => handleRemovePhoto(index)}>
                                            <Ionicons name="close" size={12} color="#fff" />
                                        </Pressable>
                                    </View>
                                ))}
                                {photos.length < 5 && (
                                    <Pressable style={styles.addMoreIconButton} onPress={handleAddPhoto}>
                                        <Ionicons name="add" size={24} color="#fff" />
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    )}
                </View>

                {/* Photo Limit Text */}
                <Text style={styles.photoLimitText}>
                    Photos: {photos.length}/5 - Choose your product's main photo first
                </Text>

                {/* Form Inputs */}
                <View style={styles.formContainer}>
                    <Input
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputText}
                    />

                    {/* Simulating Category Dropdown with Input look */}
                    <View style={[styles.inputContainer, styles.dropdownContainer]}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Category"
                            placeholderTextColor="#222"
                            value={category}
                            onChangeText={setCategory}
                        />
                        <Ionicons name="caret-down" size={16} color="#000" style={styles.dropdownIcon} />
                    </View>

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

                    {/* Multiline Description */}
                    <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Description"
                            placeholderTextColor="#222"
                            value={description}
                            onChangeText={setDescription}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Post Button */}
            <View style={styles.bottomContainer}>
                <ActionButton
                    title="Post"
                    buttonStyle={isFilled ? styles.postButtonActive : styles.postButtonInactive}
                    textStyle={isFilled ? styles.postButtonTextActive : styles.postButtonTextInactive}
                    onPress={() => {
                        if (isFilled) {
                            setModalVisible(true);
                        }
                    }}
                />
            </View>
            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Placeholder for the illustration illustration */}
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
                                navigation.navigate('SellerAllPosts', { activeTab: 'Pending' });
                            }}
                        />
                    </View>
                </View>
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
        backgroundColor: '#F3F4F6', // Light gray background
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
        backgroundColor: '#115C2B', // Dark Green
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
    uploadedPhoto: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#000',
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
        backgroundColor: '#115C2B', // Dark Green
        borderRadius: 8,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    photoLimitText: {
        fontSize: 12,
        color: '#6B7280', // Gray color
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
    dropdownIcon: {
        marginLeft: 10,
    },
    inputText: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#000',
        flex: 1, // Ensures text takes full width in dropdown
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
        backgroundColor: '#A3CBAF', // Lighter green for inactive
        borderRadius: 30,
        height: 55,
    },
    postButtonActive: {
        backgroundColor: '#167738', // Darker green for active
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
        backgroundColor: '#FCFCFC', // Very slight mint/white background from design
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
        marginBottom: 0,
    },
    modalViewButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
