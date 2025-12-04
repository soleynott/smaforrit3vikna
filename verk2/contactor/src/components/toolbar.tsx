import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from './toolbar_styles';

interface ToolbarProps {
	onAdd: () => void;
	onImport?: () => void;
	onFilter?: () => void;
	isSearchOpen: boolean;
}

export function Toolbar(props: ToolbarProps) {
	if(props.isSearchOpen) return;
	else {
	return (
		<View style={styles.toolbar}>
			<TouchableOpacity style={styles.search} onPress={props.onFilter}>
				<Text style={styles.toolbarActionPlus}>🔍</Text>
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
}