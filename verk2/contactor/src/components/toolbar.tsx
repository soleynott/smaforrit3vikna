import { View, Text, TouchableHighlight } from 'react-native';
import styles from './toolbar_styles';

interface ToolbarProps {
	onAdd: () => void;
	onImport?: () => void;
	onFilter?: () => void;
}

export function Toolbar(props: ToolbarProps) {
	return (
		<View style={styles.toolbar}>
			<TouchableHighlight style={styles.search} onPress={props.onFilter}>
				<Text style={styles.toolbarActionText}>🔍</Text>
			</TouchableHighlight>

			<View style={styles.rightActions}>
				{props.onImport && (
					<TouchableHighlight style={styles.toolbarAction} onPress={props.onImport}>
						<Text style={styles.toolbarActionText}>↓</Text>
					</TouchableHighlight>
				)}

				<TouchableHighlight style={styles.toolbarAction} onPress={props.onAdd}>
					<Text style={styles.toolbarActionText}>+</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}
