/**
 * cinemas screen
 *
 * should include
 *      -see a list of all cinemas
 *          -alphabetically ordered (ascending)
 *          -display name and website
 *      -each cinema in the list should be clickable
 *      and on click should navigate to a detailed screen
 *      of the selected cinema
 */


import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles/cinemas_styles';
import { getCinemas } from '@/src/api/kvikmyndir';

type Cinema = {
  id: string;
  name: string;
  website: string;
};

interface CinemaListProps {
  cinemas: Cinema[];
  // You can use this to navigate to your Cinema screen
  onCinemaPress: (cinema: Cinema) => void;
}

export function CinemasScreen({ cinemas, onCinemaPress }: CinemaListProps) {

  
  // Sort cinemas alphabetically by name (ascending)
  const sortedCinemas = React.useMemo(
    () =>
      [...cinemas].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      ),
    [cinemas]
  );

  const renderItem = ({ item }: { item: Cinema }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onCinemaPress(item)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemWebsite}>{item.website}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={sortedCinemas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
