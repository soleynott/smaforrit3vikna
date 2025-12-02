/** the main screen
 * should include:
 *      search bar
 *      list of contacts
 *      option to add new contact
 *
 * when a contact's name is clicked it should
 * route to that contact's detail view
 */


import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';           // 👈 NEW
import data from '../../resources/data.json';
import { AddModal } from '@/src/components/main/add_modal';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import { Toolbar } from "@/src/components/toolbar";
import { ContactsList } from '@/src/components/main/main_list';

export default function MainScreen() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contact, setContact] = useState<ContactThumbnail[]>([]);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  }

  const handleContactCreate = (newContact: ContactThumbnail) => {
    setContact([...contact, newContact]); //Change this
  }

  const handleAddModal = () => {
    setIsAddModalOpen(true);
  }
  return (
    <View style={{ flex: 1 }}>
      <Toolbar onAdd={handleAddModal}  />
      <AddModal 
      isOpen={isAddModalOpen}
      closeModal={handleCloseAddModal}
      onContactCreate={handleContactCreate}
      />
      <ContactsList/>
     

    </View>
  );
}
