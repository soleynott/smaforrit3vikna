import {
	TouchableOpacity,
	View,
	Text,
	Image,
	ScrollView,
	Alert,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { Modal } from '../modal/modal';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import { importContactsFromDevice } from '@/src/services/file-service';
import styles from '../toolbar_styles';

interface ImportContactsModalProps {
	isOpen: boolean;
	closeModal: () => void;
	onContactsImport: (contacts: ContactThumbnail[]) => void;
}

export function ImportContactsModal(props: ImportContactsModalProps) {
	const [importedContacts, setImportedContacts] = useState<ContactThumbnail[]>([]);
	const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
	const [isLoading, setIsLoading] = useState(false);
	const [isSelectingContacts, setIsSelectingContacts] = useState(false);

	const handleImportContacts = async () => {
		setIsLoading(true);
		try {
			const contacts = await importContactsFromDevice();
			if (contacts.length === 0) {
				Alert.alert('No Contacts', 'No contacts found on your device.');
				setIsLoading(false);
				return;
			}
			setImportedContacts(contacts);
			setSelectedContacts(new Set(contacts.map((_, idx) => idx)));
			setIsSelectingContacts(true);
		} catch (error) {
			Alert.alert(
				'Error',
				error instanceof Error ? error.message : 'Failed to import contacts',
			);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleContactSelection = (index: number) => {
		const newSelected = new Set(selectedContacts);
		if (newSelected.has(index)) {
			newSelected.delete(index);
		} else {
			newSelected.add(index);
		}
		setSelectedContacts(newSelected);
	};

	const handleSaveSelectedContacts = () => {
		const contactsToSave = importedContacts.filter((_, idx) => selectedContacts.has(idx));

		if (contactsToSave.length === 0) {
			Alert.alert('No Selection', 'Please select at least one contact to import.');
			return;
		}

		props.onContactsImport(contactsToSave);
		resetForm();
		props.closeModal();
	};

	const resetForm = () => {
		setImportedContacts([]);
		setSelectedContacts(new Set());
		setIsSelectingContacts(false);
	};

if (isSelectingContacts) {
  return (
    <Modal
      title="Select Contacts to Import"
      isOpen={props.isOpen}
      closeModal={() => setIsSelectingContacts(false)}
    >
      <View style={styles.selectContainer}>
        {importedContacts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No contacts available</Text>
          </View>
        ) : (
          <ScrollView
            nestedScrollEnabled={true}
            style={styles.contactList}
          >
            {importedContacts.map((contact, index) => {
              const isSelected = selectedContacts.has(index);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.contactRow,
                    isSelected && styles.contactRowSelected,
                  ]}
                  onPress={() => toggleContactSelection(index)}
                >
                  {contact.thumbnailPhoto ? (
                    <Image
                      source={{ uri: contact.thumbnailPhoto }}
                      style={styles.contactAvatar}
                    />
                  ) : (
                    <View style={styles.placeholderAvatar}>
                      <Entypo name="user" size={20} color="#999" />
                    </View>
                  )}

                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>
                      {contact.name}
                    </Text>
                    <Text style={styles.contactPhone}>
                      {contact.phoneNumber}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Entypo name="check" size={16} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.createButton, styles.importButton]}
            onPress={handleSaveSelectedContacts}
          >
            <Text style={styles.createButtonText}>
              Import ({selectedContacts.size})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.createButton, styles.cancelButton]}
            onPress={() => {
              resetForm();
            }}
          >
            <Text style={styles.createButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Initial loading state
return (
  <Modal
    title="Import Contacts"
    isOpen={props.isOpen}
    closeModal={props.closeModal}
  >
    <View style={styles.initialContainer}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading contacts...</Text>
        </View>
      ) : (
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Import contacts from your device&apos;s address book
          </Text>

          <TouchableOpacity
            style={[styles.createButton, styles.importButton]}
            onPress={handleImportContacts}
          >
            <Entypo
              name="upload"
              size={20}
              color="white"
              style={styles.uploadIcon}
            />
            <Text style={styles.createButtonText}>Import Contacts</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </Modal>
)};
