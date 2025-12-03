//search for contacts, filter contactlist by string entered by user
import { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import { Modal } from '../modal/modal';
import { ContactsList } from '../main/main_list';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import styles from '../main/styles/search_modal_styles';

interface SearchModalProps {
	isOpen: boolean;
	closeModal: () => void;
	contacts: ContactThumbnail[];
}

export function SearchModal({ isOpen, closeModal, contacts }: SearchModalProps) {
	const [search, setSearch] = useState('');

	const filteredContacts = contacts.filter((c) =>
		c.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<Modal title="search" isOpen={isOpen} closeModal={closeModal}>
			<View style={styles.modalContainer}>
				{/* Fixed search bar */}
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
					onSelect={() => {
						closeModal();
					}}
				/>
			</View>
		</Modal>
	);
}
