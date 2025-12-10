
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Cinema } from '../../types/cinema_type';

interface CinemaListProps {
  cinemas: Cinema[]; 
}

export function CinemaList (props: CinemaListProps) {

    return (
      <ScrollView style={styles.container}>
        {props.cinemas.map((cinema: Cinema, index: number) => (
          <View key={`${cinema.id} || index}`} style={styles.cinemaItem}>
            <View style={styles.cinemaInfo}>
              <View>
                <Text style={styles.name}>{cinema.name}</Text>
                <Text style={styles.website}>{cinema.website}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
}