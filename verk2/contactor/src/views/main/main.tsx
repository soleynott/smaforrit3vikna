/** the main screen
 * should include:
 *      search bar
 *      list of contacts
 *      option to add new contact
 *
 * when a contact's name is clicked it should
 * route to that contact's detail view
 */

import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';           // 👈 NEW
import data from '../../resources/data.json';

export default function MainScreen() {
  const router = useRouter();                      // 👈 NEW

  return (
    <View style={styles.screen}>
      <FlatList
        data={data.contacts}
        keyExtractor={(item) => item.number}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            // 👇 navigate to /contact and pass fields as params
            onPress={() =>
              router.push({
                pathname: '/contact',
                params: {
                  name: item.name,
                  number: item.number,
                  image: item.image,
                },
              })
            }
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
    backgroundColor: '#f2f2f7',
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
    marginLeft: 76,
  },
});