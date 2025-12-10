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


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCinemas } from '../redux/cinemaSlice';
import { RootState, AppDispatch } from '../redux/store';
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Cinema } from '../types/cinema_type';
import { CinemaList } from '../components/cinemascreen/cinemascreen_list';
import styles from "./styles/cinemas_styles";

export default function CinemasScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { cinemas, loading, error } = useSelector(
    (state: RootState) => state.cinemas
  );

  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading cinemas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!cinemas || cinemas.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No cinemas found</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <CinemaList cinemas={cinemas}/>
    </View>
  )
}