/** the main screen
 * should include:
 *      search bar
 *      list of contacts
 *      option to add new contact
 * 
 * when a contact's name is clicked it should
 * route to that contact's detail view
 * 
 */
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import data from '../../resources/data.json';
import { AddModal } from '@/src/components/main/add_modal';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import { Toolbar } from "@/src/components/toolbar";

export default function ContactScreen({ navigation }: { navigation: any }) {
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
    <View style={styles.screen}>
             <Toolbar onAdd={handleAddModal}  />
      <AddModal 
      isOpen={isAddModalOpen}
      closeModal={handleCloseAddModal}
      onContactCreate={handleContactCreate}
      />
      <FlatList
        data={data.contacts}
        keyExtractor={(item) => item.number}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Contact', { contact: item })}
            activeOpacity={0.7}
          >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f7', // iOS-style light grey
  },
  listContent: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: 'gray',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d1d1d6',
    marginLeft: 76, // lines up under text, not under avatar
  },
});
