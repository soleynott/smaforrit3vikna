import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from './toolbar_styles';
import { Ionicons } from '@expo/vector-icons';

interface ToolbarProps {
	onAdd: () => void;
	onImport?: () => void;
	onFilter?: () => void;
}

export function Toolbar(props: ToolbarProps) {

	return (
		<View style={styles.toolbar}>
			<TouchableOpacity style={styles.search} onPress={props.onFilter}>
				<Ionicons name="search" size={24} color="black" />
			</TouchableOpacity>

			<View style={styles.rightActions}>
				{props.onImport && (
					<TouchableHighlight style={styles.toolbarAction} onPress={props.onImport}>
						<Text style={styles.toolbarActionImport}>↓</Text>
					</TouchableHighlight>
				)}

				<TouchableHighlight style={styles.toolbarAction} onPress={props.onAdd}>
					<Text style={styles.toolbarActionPlus}>+</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}

