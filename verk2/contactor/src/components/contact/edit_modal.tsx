import {
	TouchableOpacity,
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	Alert,
	FlatList,
} from 'react-native';
import { Modal } from '../modal/modal';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import * as ImagePicker from 'expo-image-picker';
import {
	requestCameraPermission,
	requestMediaLibraryPermission,
} from '@/src/services/image-service';
import styles from '../main/styles/add_modal_styles';

interface EditContactProps {
	isOpen: boolean;
	closeModal: () => void;
	contacts: ContactThumbnail[];
	onContactUpdate: (updateContact: ContactThumbnail) => void;
	onContactDelete: (filename: string) => void;
}

export function EditContactModal(props: EditContactProps) {
	const [selectedContact, setSelectedContact] = useState<ContactThumbnail | null>(null);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [photoUri, setPhotoUri] = useState<string | null>(null);
	const [selectedPhotoMode, setSelectedPhotoMode] = useState<'camera' | 'gallery' | null>(null);
	const [isEditingContact, setIsEditingContact] = useState(false);

	useEffect(() => {
		if (selectedContact && isEditingContact) {
			setName(selectedContact.name);
			setPhone(selectedContact.phoneNumber);
			setPhotoUri(selectedContact.thumbnailPhoto);
		}
	}, [selectedContact, isEditingContact]);

	const handleSelectContact = (contact: ContactThumbnail) => {
		setSelectedContact(contact);
		setIsEditingContact(true);
	};

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
			setPhotoUri(result.assets[0].uri);
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
			setPhotoUri(result.assets[0].uri);
			setSelectedPhotoMode(null);
		}
	};

	const handleUpdateContact = () => {
		if (!name || !phone || !photoUri) {
			alert('Please fill in name, phone number, and select a photo');
			return;
		}

		if (!selectedContact) return;

		const updatedContact: ContactThumbnail = {
			...selectedContact,
			name: name,
			phoneNumber: phone,
			thumbnailPhoto: photoUri,
			filename: selectedContact.filename,
		};

		props.onContactUpdate(updatedContact);
		resetForm();
	};

	const handleDeleteContact = () => {
		if (!selectedContact) return;

		Alert.alert(
			'Delete Contact',
			`Are you sure you want to delete "${selectedContact.name}"? This cannot be undone.`,
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => {
						if (selectedContact.filename) {
							props.onContactDelete(selectedContact.filename);
						}
						resetForm();
					},
					style: 'destructive',
				},
			],
		);
	};

	const resetForm = () => {
		setSelectedContact(null);
		setName('');
		setPhone('');
		setPhotoUri(null);
		setSelectedPhotoMode(null);
		setIsEditingContact(false);
	};

	// Photo selection mode
	if (selectedPhotoMode) {
		return (
			<Modal title="Change Photo" isOpen={props.isOpen} closeModal={props.closeModal}>
				<View style={styles.optionsContainer}>
					<TouchableOpacity style={styles.option} onPress={takePhoto}>
						<Entypo name="camera" size={48} color={'blue'} style={styles.icon} />
						<Text style={styles.optionText}>Take Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.option} onPress={selectFromGallery}>
						<Entypo name="image" size={48} color={'blue'} style={styles.icon} />
						<Text style={styles.optionText}>Choose Image</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}

	// Editing contact mode
	if (isEditingContact && selectedContact) {
		return (
			<Modal title="Edit Contact" isOpen={props.isOpen} closeModal={props.closeModal}>
				<ScrollView style={styles.formContainer}>
					{photoUri && (
						<View style={styles.imagePreviewContainer}>
							<Image source={{ uri: photoUri }} style={styles.imagePreview} />
							<TouchableOpacity
								style={styles.removeImageButton}
								onPress={() => setPhotoUri(null)}
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
							{photoUri ? 'Change Photo' : 'Select Photo'}
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
						style={[styles.input, styles.descriptionInput]}
						placeholder="Contact Phone"
						value={phone}
						onChangeText={setPhone}
						multiline
						numberOfLines={4}
						placeholderTextColor="#999"
					/>

					<TouchableOpacity style={styles.createButton} onPress={handleUpdateContact}>
						<Text style={styles.createButtonText}>Update Contact</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							...styles.createButton,
							backgroundColor: '#e74c3c',
							marginTop: 10,
						}}
						onPress={handleDeleteContact}
					>
						<Text style={styles.createButtonText}>Delete Contact</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							...styles.createButton,
							backgroundColor: '#95a5a6',
							marginTop: 10,
						}}
						onPress={() => setIsEditingContact(false)}
					>
						<Text style={styles.createButtonText}>Back to Contacts</Text>
					</TouchableOpacity>
				</ScrollView>
			</Modal>
		);
	}

	return (
		<Modal title="Edit Contact" isOpen={props.isOpen} closeModal={props.closeModal}>
			<View style={{ minHeight: 200 }}>
				{props.contacts.length === 0 ? (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 40,
						}}
					>
						<Text style={{ fontSize: 16, color: '#999', fontStyle: 'italic' }}>
							No contacts available
						</Text>
					</View>
				) : (
					<FlatList
						data={props.contacts}
						keyExtractor={(item, index) => index.toString()}
						scrollEnabled={true}
						nestedScrollEnabled={true}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingVertical: 12,
									paddingHorizontal: 10,
									marginVertical: 8,
									backgroundColor: '#f5f5f5',
									borderRadius: 10,
									gap: 12,
								}}
								onPress={() => handleSelectContact(item)}
							>
								{item.thumbnailPhoto && (
									<Image
										source={{ uri: item.thumbnailPhoto }}
										style={{ width: 40, height: 40, borderRadius: 20 }}
									/>
								)}
								{!item.thumbnailPhoto && (
									<View
										style={{
											width: 40,
											height: 40,
											borderRadius: 20,
											backgroundColor: '#e0e0e0',
										}}
									/>
								)}
								<View style={{ flex: 1, justifyContent: 'center' }}>
									<Text
										style={{
											fontSize: 15,
											fontWeight: '600',
											color: '#333',
											marginBottom: 4,
										}}
									>
										{item.name}
									</Text>
									<Text style={{ fontSize: 12, color: '#666' }}>
										{item.phoneNumber}
									</Text>
								</View>
								<Entypo name="chevron-right" size={24} color={'#666'} />
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
		</Modal>
	);
}
