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

interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
	const dispatch = useDispatch<AppDispatch>();
	const filters = useSelector((state: RootState) => state.filters);

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

					{/* PG Rating */}
					<View style={styles.field}>
						<Text style={styles.label}>PG Rating</Text>
						<TextInput
							style={styles.input}
							placeholder="e.g., 12 ára/16 ára/18 ára or Öllum leyfð"
							placeholderTextColor="#777"
							value={filters.pgRating}
							onChangeText={(v) => updateFilterValue('pgRating', v)}
						/>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 50,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	body: {
		padding: 16,
	},
	field: {
		marginBottom: 20,
	},

	label: {
		fontSize: 13,
		fontWeight: '600',
		marginBottom: 6,
		color: '#333',
	},
	label2: {
		fontSize: 13,
		fontWeight: '600',
		marginBottom: 6,
		color: '#333',
		paddingLeft: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		backgroundColor: '#f5f5f5',
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	marginLeft: {
		marginLeft: 8,
	},
	multiline: {
		minHeight: 80,
		textAlignVertical: 'top',
	},
	actions: {
		flexDirection: 'row',
		gap: 8,
		marginVertical: 20,
		marginBottom: 40,
	},
	buttonClear: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#ddd',
		alignItems: 'center',
	},
	buttonClearText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
	},
	buttonApply: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 6,
		backgroundColor: '#4a90e2',
		alignItems: 'center',
	},
	buttonApplyText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
	},
	column: {
		flexDirection: 'column',
	},
	flex1: {
		flex: 1,
	},
});
