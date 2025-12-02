/**the contact detail screen
 * 
 * should include:
 *      contact photo
 *      name
 *      phone number
 *      option to edit contact
 * 
 * back arrow leads back to home screen 
 *
 * 
 */

import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { ContactList } from '@/src/components/contact/contact_list';
import { EditContactModal } from '@/src/components/contact/edit_modal';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import { saveContact, removeContact, getAllContacts } from '@/src/services/file-service';
import { useRouter } from "expo-router";

export default function ContactScreen() {
  const { name, number, image, filename } = useLocalSearchParams<{
    name?: string;
    number?: string;
    image?: string;
    filename?: string;
  }>();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contact, setContact] = useState<ContactThumbnail>({
    name: name || '',
    phoneNumber: number || '',
    thumbnailPhoto: image || null,
    filename: filename,
  });
  
  const handleEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleContactUpdate = async (updatedContact: ContactThumbnail) => {
    console.log('[ContactScreen] Updating contact:', updatedContact);
    console.log('[ContactScreen] Old filename to delete:', updatedContact.filename);
    
    if (updatedContact.filename) {
      await removeContact(updatedContact.filename);
    }
    const result = await saveContact(updatedContact);
    setContact({ ...updatedContact, filename: result.filename });
    setIsEditModalOpen(false);
  };

  const router = useRouter(); 
  const handleContactDelete = async (filename: string) => {
    await removeContact(filename);
    router.back()
    setIsEditModalOpen(false);
    
  };

  return (
    <View style={{ flex: 1 }}>
      <ContactList 
        name={contact.name}
        number={contact.phoneNumber}
        image={contact.thumbnailPhoto}
        onEditPress={handleEditModal}
      />
      <EditContactModal
        isOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        contacts={[contact]}
        onContactUpdate={handleContactUpdate}
        onContactDelete={handleContactDelete}
      />
    </View>
  );
}

