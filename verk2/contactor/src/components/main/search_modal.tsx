//search for contacts, filter contactlist by string entered by user
import { useEffect, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Modal } from '../modal/modal';
import { ContactsList } from '../main/main_list';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';

interface SearchModalProps {
	isOpen: boolean;
	closeModal: () => void;
	contacts: ContactThumbnail[];
}

export function SearchModal({ isOpen, closeModal, contacts }: SearchModalProps) {
	const [query, setQuery] = useState('');
	//check if input matches any contacts names or numbers
	const filteredContacts = contacts.filter(
		(contact) =>
			contact.name.toLowerCase().includes(query.toLowerCase()) ||
			contact.phoneNumber.includes(query),
	);

	return (
		<Modal title="Search Contacts" isOpen={isOpen} closeModal={closeModal}>
			<View>
				{/* search input */}
				<TextInput
					placeholder="Search by name or number"
					value={query}
					onChangeText={setQuery}
					placeholderTextColor="#999"
				></TextInput>
				<View>
					<ContactsList contacts={filteredContacts} />
				</View>
			</View>
		</Modal>
	);
}
