//search for contacts, filter contactlist by string entered by user
import { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Modal } from '../modal/modal';
import { ContactsList } from '../main/main_list';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import styles from '../main/styles/search_modal_styles';
import { useRouter } from 'expo-router';

interface SearchModalProps {
	isOpen: boolean;
	closeModal: () => void;
	contacts: ContactThumbnail[];
}

export function SearchModal({ isOpen, closeModal, contacts }: SearchModalProps) {
	const [search, setSearch] = useState('');
    const router = useRouter();

	const filteredContacts = contacts.filter((c) =>
		c.name.toLowerCase().includes(search.toLowerCase()),
	);


	return (
		<Modal isOpen={isOpen} closeModal={closeModal} title={"Search"}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}
			>
				<View style={styles.modalContainer}>
					{/* Fixed search bar at top of modal */}
					<View style={styles.searchBarContainer}>
						<TextInput
							style={styles.searchInput}
							placeholder="Search contacts..."
							value={search}
							onChangeText={setSearch}
							autoFocus
						/>
					</View>

					{/* Dynamic list */}
					<ContactsList
						contacts={filteredContacts}
						onSelect={(c) => {
							closeModal();
							router.push({
								pathname: '/contact',
								params: {
									name: c.name,
									number: c.phoneNumber,
									image: c.thumbnailPhoto,
									filename: c.filename,
								},
							});
						}}
					/>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}
