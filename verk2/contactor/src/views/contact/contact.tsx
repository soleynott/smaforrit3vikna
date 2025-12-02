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

export default function ContactScreen() {
  const { name, number, image } = useLocalSearchParams<{
    name?: string;
    number?: string;
    image?: string;
  }>();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Edit pressed")}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image source={{ uri: image.toString() }} style={styles.photo} />
      )}

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phone}>{number}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
name: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
phone: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f2f2f7',
    textAlign: 'center',
  },
header: {
    position: 'absolute',
    top: 0,
    right: 20,
    paddingTop: 10,
    zIndex: 10,
},
edit: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f2f2f7',
},
});

