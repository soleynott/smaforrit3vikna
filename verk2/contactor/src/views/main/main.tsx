/** the main screen
 * should include:
 *      search bar
 *      list of contacts
 *      option to add new contact
 *
 * when a contact's name is clicked it should
 * route to that contact's detail view
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import data from '../../resources/data.json';
import { AddModal } from '@/src/components/main/add_modal';
import { ImportContactsModal } from '@/src/components/main/import_modal';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import { Toolbar } from '@/src/components/toolbar';
import { ContactsList } from '@/src/components/main/main_list';
import { saveContact, getAllContacts } from '@/src/services/file-service';
import { SearchModal } from '@/src/components/main/search_modal';

export default function MainScreen() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isImportModalOpen, setIsImportModalOpen] = useState(false);
	const [contacts, setContacts] = useState<ContactThumbnail[]>([]);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const sortContacts = (list: ContactThumbnail[]) =>
    list.slice().sort((a, b) => a.name.localeCompare(b.name));


	useEffect(() => {
		const loadContacts = async () => {
			const loadedContacts = await getAllContacts();
			const contactData = loadedContacts
				.map((item) => ({ ...item.contact, filename: item.filename }))
				.filter((c) => c !== null);
			setContacts(sortContacts(contactData as ContactThumbnail[]));
		};
		loadContacts();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			const loadContacts = async () => {
				const loadedContacts = await getAllContacts();
				const contactData = loadedContacts
					.map((item) => ({ ...item.contact, filename: item.filename }))
					.filter((c) => c !== null);
				setContacts(sortContacts(contactData as ContactThumbnail[]));
			};
			loadContacts();
		}, []),
	);

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
	};

	const handleCloseImportModal = () => {
		setIsImportModalOpen(false);
	};

	const handleContactCreate = async (newContact: ContactThumbnail) => {
		const result = await saveContact(newContact);
		setContacts((prev) => sortContacts([...prev, { ...newContact, filename: result.filename }]));
	};

	const handleContactsImport = async (importedContacts: ContactThumbnail[]) => {
		const savedContacts = await Promise.all(
			importedContacts.map(async (contact) => {
				const result = await saveContact(contact);
				return { ...contact, filename: result.filename };
			})
		);
		setContacts((prev) => sortContacts([...prev, ...savedContacts]));
	};

	const handleAddModal = () => {
		setIsAddModalOpen(true);
	};

	const handleImportModal = () => {
		setIsImportModalOpen(true);
	};

	const handleSearchModal = () => {
		setIsSearchOpen(true);
	};

	const handleCloseSearchModal = () => {
		setIsSearchOpen(false);
	};
	if(isSearchOpen) {
		return (
			<View style={{ flex: 1 }}>
				<SearchModal
					isOpen={isSearchOpen}
					closeModal={handleCloseSearchModal}
					contacts={contacts}
				/>
		</View>
		)
	}
	else {
		return (
			<View style={{ flex: 1 }}>
				<Toolbar
					onAdd={handleAddModal}
					onImport={handleImportModal}
					onFilter={handleSearchModal}
				/>
				<AddModal
					isOpen={isAddModalOpen}
					closeModal={handleCloseAddModal}
					onContactCreate={handleContactCreate}
				/>
				<ImportContactsModal
					isOpen={isImportModalOpen}
					closeModal={handleCloseImportModal}
					onContactsImport={handleContactsImport}
				/>
				
				<ContactsList contacts={contacts} />
			</View>
		);
	}
}
