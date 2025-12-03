import { TouchableOpacity, View, Text, TextInput, Image, ScrollView, Alert } from 'react-native';
import { Modal } from '../modal/modal';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ContactThumbnail } from '../../types/contact_thumbnail';
import styles from '../toolbar_styles';
import {
	requestCameraPermission,
	requestMediaLibraryPermission,
} from '../../services/image-service';

interface AddModalProps {
	isOpen: boolean;
	closeModal: () => void;
	onContactCreate: (contact: ContactThumbnail) => void;
}

export function AddModal(props: AddModalProps) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [imageUri, setImageUri] = useState<string | null>(null);
	const [selectedPhotoMode, setSelectedPhotoMode] = useState<'camera' | 'gallery' | null>(null);

	const takePhoto = async () => {
		const permissionGranted = await requestCameraPermission();
		if (!permissionGranted) {
			Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
			setSelectedPhotoMode(null);
		}
	};

	const selectFromGallery = async () => {
		const permissionGranted = await requestMediaLibraryPermission();
		if (!permissionGranted) {
			Alert.alert(
				'Permission Denied',
				'Media library permission is required to select photos.',
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
			setSelectedPhotoMode(null);
		}
	};

	const handleCreateContact = async () => {
		if (!name || !phone || !imageUri) {
			alert('Please fill in all fields and select an image');
			return;
		}
		const newContact: ContactThumbnail = {
			name: name,
			phoneNumber: phone,
			thumbnailPhoto: imageUri,
		};
		try {
			await props.onContactCreate(newContact);
			resetForm();
			props.closeModal();
		} catch (error) {
			console.error('Error creating contact:', error);
			alert('Failed to create contact');
		}
	};

	const resetForm = () => {
		setName('');
		setPhone('');
		setImageUri(null);
		setSelectedPhotoMode(null);
	};

	if (selectedPhotoMode) {
		return (
			<Modal title="Add Image" isOpen={props.isOpen} closeModal={() => setSelectedPhotoMode(null)}>
				<View style={styles.optionsContainer}>
					<TouchableOpacity style={styles.option} onPress={takePhoto}>
						<Entypo name="camera" size={48} color={'blue'} style={styles.icon}></Entypo>
						<Text style={styles.optionText}>Take Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.option} onPress={selectFromGallery}>
						<Entypo name="image" size={48} color={'blue'} style={styles.icon}></Entypo>
						<Text style={styles.optionText}>Choose Image</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
	return (
		<Modal title="Add New Contact" isOpen={props.isOpen} closeModal={props.closeModal}>
			<ScrollView style={styles.formContainer}>
				{imageUri && (
					<View style={styles.imagePreviewContainer}>
						<Image source={{ uri: imageUri }} style={styles.imagePreview} />
						<TouchableOpacity
							style={styles.removeImageButton}
							onPress={() => setImageUri(null)}
						>
							<Text style={styles.removeImageText}>Remove Image</Text>
						</TouchableOpacity>
					</View>
				)}

				<TouchableOpacity
					style={styles.imagePickerButton}
					onPress={() => setSelectedPhotoMode('camera')}
				>
					<Entypo name="image" size={24} color={'white'} />
					<Text style={styles.imagePickerButtonText}>
						{imageUri ? 'Change Image' : 'Select Image'}
					</Text>
				</TouchableOpacity>

				<TextInput
					style={styles.input}
					placeholder="Contact Name"
					value={name}
					onChangeText={setName}
					placeholderTextColor="#999"
				/>

				<TextInput
					inputMode="numeric"
					keyboardType="number-pad"
					returnKeyType="done"
					//blurOnSubmit={true}
					submitBehavior="blurAndSubmit"
					style={styles.input}
					placeholder="Contact Phone"
					value={phone}
					onChangeText={setPhone}
					multiline
					numberOfLines={4}
					placeholderTextColor="#999"
				/>

				<TouchableOpacity style={styles.createButton} onPress={handleCreateContact}>
					<Text style={styles.createButtonText}>Create Contact</Text>
				</TouchableOpacity>
			</ScrollView>
		</Modal>
	);
}
