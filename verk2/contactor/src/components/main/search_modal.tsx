//search for contacts, filter contactlist by string entered by user
import { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { Modal } from '../modal/modal';
import { ContactsList } from '../main/main_list';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import styles from '../main/styles/search_modal_styles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SearchModalProps {
	isOpen: boolean;
	closeModal: () => void;
	contacts: ContactThumbnail[];
}

export function SearchModal({ isOpen, closeModal, contacts }: SearchModalProps) {
	const [search, setSearch] = useState('');

	if (!isOpen) return null;

	const filteredContacts = contacts.filter((c) =>
		c.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<SafeAreaView style={styles.overlayContainer}>
			{/* Fixed search bar */}
			<View style={styles.searchHeader}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search contacts..."
					value={search}
					onChangeText={setSearch}
					autoFocus
				/>
				<TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
			</View>

			{/* Dynamic list */}
			<ContactsList
				contacts={filteredContacts}
				onSelect={() => {
					closeModal();
				}}
			/>
		</SafeAreaView>
	);
}
