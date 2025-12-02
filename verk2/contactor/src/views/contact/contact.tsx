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

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ContactList } from '@/src/components/contact/contact_list';

export default function ContactScreen() {
  return (
    <View style={{ flex: 1}}>
      <ContactList/>
    </View>
  )
}

