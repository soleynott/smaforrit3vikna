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

	// Load contacts from file system on mount
	useEffect(() => {
		const loadContacts = async () => {
			const loadedContacts = await getAllContacts();
			const contactData = loadedContacts
				.map((item) => ({ ...item.contact, filename: item.filename }))
				.filter((c) => c !== null);
			setContacts(contactData as ContactThumbnail[]);
		};
		loadContacts();
	}, []);

	// Reload contacts when screen regains focus
	useFocusEffect(
		React.useCallback(() => {
			const loadContacts = async () => {
				const loadedContacts = await getAllContacts();
				const contactData = loadedContacts
					.map((item) => ({ ...item.contact, filename: item.filename }))
					.filter((c) => c !== null);
				setContacts(contactData as ContactThumbnail[]);
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
		// Save to file system
		await saveContact(newContact);
		// Add to state
		setContacts([...contacts, newContact]);
	};

	const handleContactsImport = async (importedContacts: ContactThumbnail[]) => {
		// Save all imported contacts to file system
		await Promise.all(importedContacts.map((contact) => saveContact(contact)));
		// Add to state
		setContacts([...contacts, ...importedContacts]);
	};

	const handleAddModal = () => {
		setIsAddModalOpen(true);
	};

	const handleImportModal = () => {
		setIsImportModalOpen(true);
	};

	return (
		<View style={{ flex: 1 }}>
			<Toolbar onAdd={handleAddModal} onImport={handleImportModal} />
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
