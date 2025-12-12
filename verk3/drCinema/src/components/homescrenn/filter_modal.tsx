import React from 'react';
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter, clearFilters } from '../../redux/filterSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { FilterState } from '../../redux/filterSlice';
import styles from './styles/filter_styles';

interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
	const dispatch = useDispatch<AppDispatch>();
	const filters = useSelector((state: RootState) => state.filters);

	const PG_OPTIONS = [
  { label: 'Öllum leyfð', value: 'Öllum leyfð' },
  { label: '12 ára', value: '12 ára' },
  { label: '16 ára', value: '16 ára' },
  { label: '18 ára', value: '18 ára' },
];


	const updateFilterValue = (key: keyof FilterState, value: string) => {
		dispatch(updateFilter({ key, value }));
	};

	const clearAll = () => {
		dispatch(clearFilters());
	};

	return (
		<Modal visible={isOpen} animationType="slide">
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Filter Movies</Text>
					<TouchableOpacity onPress={onClose}>
						<Ionicons name="close" size={24} color="#333" />
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.body}>
					{/* Title */}
					<View style={styles.field}>
						<Text style={styles.label}>Title</Text>
						<TextInput
							style={styles.input}
							placeholder="Search title..."
							placeholderTextColor="#777"
							value={filters.title}
							onChangeText={(v) => updateFilterValue('title', v)}
						/>
					</View>

					{/* IMDb + Rotten Side-by-Side */}
					<View style={styles.row}>
						{/* IMDb Column */}
						<View style={[styles.column, styles.flex1]}>
							<Text style={styles.label}>IMDb Rating</Text>
							<View style={styles.row}>
								<TextInput
									style={styles.input}
									placeholder="Min"
									placeholderTextColor="#777"
									value={filters.imdbMin}
									onChangeText={(v) => updateFilterValue('imdbMin', v)}
									keyboardType="decimal-pad"
								/>
								<TextInput
									style={[styles.input, styles.marginLeft]}
									placeholder="Max"
									placeholderTextColor="#777"
									value={filters.imdbMax}
									onChangeText={(v) => updateFilterValue('imdbMax', v)}
									keyboardType="decimal-pad"
								/>
							</View>
						</View>

						{/* Rotten Column */}
						<View style={[styles.column, styles.flex1, styles.marginLeft]}>
							<Text style={styles.label}>Rotten Tomatoes</Text>
							<View style={styles.row}>
								<TextInput
									style={styles.input}
									placeholder="Min"
									placeholderTextColor="#777"
									value={filters.rottenMin}
									onChangeText={(v) => updateFilterValue('rottenMin', v)}
									keyboardType="number-pad"
								/>
								<TextInput
									style={[styles.input, styles.marginLeft]}
									placeholder="Max"
									placeholderTextColor="#777"
									value={filters.rottenMax}
									onChangeText={(v) => updateFilterValue('rottenMax', v)}
									keyboardType="number-pad"
								/>
							</View>
						</View>
					</View>

					{/* Showtime */}
					<View style={styles.field}>
						<Text style={styles.label}>Showtime (HH:MM)</Text>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								placeholder="From 20:00"
								placeholderTextColor="#777"
								value={filters.showtimeStart}
								onChangeText={(v) => updateFilterValue('showtimeStart', v)}
							/>
							<TextInput
								style={[styles.input, styles.marginLeft]}
								placeholder="To 22:00"
								placeholderTextColor="#777"
								value={filters.showtimeEnd}
								onChangeText={(v) => updateFilterValue('showtimeEnd', v)}
							/>
						</View>
					</View>

					{/* Actors */}
					<View style={styles.field}>
						<Text style={styles.label}>Actors</Text>
						<TextInput
							style={[styles.input, styles.multiline]}
							placeholder="e.g., Tom Cruise, Brad Pitt"
							placeholderTextColor="#777"
							value={filters.actors}
							onChangeText={(v) => updateFilterValue('actors', v)}
							multiline
						/>
					</View>

					{/* Directors */}
					<View style={styles.field}>
						<Text style={styles.label}>Directors</Text>
						<TextInput
							style={[styles.input, styles.multiline]}
							placeholder="e.g., Christopher Nolan, Steven Spielberg"
							placeholderTextColor="#777"
							value={filters.directors}
							onChangeText={(v) => updateFilterValue('directors', v)}
							multiline
						/>
					</View>

					<View style={styles.field}>
					<Text style={styles.label}>PG Rating</Text>

					{PG_OPTIONS.map((option) => {
						const selected = filters.pgRating === option.value;

						return (
						<TouchableOpacity
							key={option.value}
							style={styles.checkboxRow}
							onPress={() => updateFilterValue('pgRating', option.value)}
							activeOpacity={0.7}
						>
							<Ionicons
							name={selected ? 'checkbox' : 'square-outline'}
							size={20}
							color={selected ? 'black' : '#999'}
							/>
							<Text style={styles.checkboxLabel}>{option.label}</Text>
						</TouchableOpacity>
						);
					})}
					</View>

					{/* Buttons */}
					<View style={styles.actions}>
						<TouchableOpacity style={styles.buttonClear} onPress={clearAll}>
							<Text style={styles.buttonClearText}>Clear</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonApply} onPress={onClose}>
							<Text style={styles.buttonApplyText}>Apply</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
}
