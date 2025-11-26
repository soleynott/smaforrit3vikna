import {View, Text} from "react-native"

interface ListItemProps {
    id: number;
    name: string;
    color: string;
    boardId: number;
}

export function ListItem(props: ListItemProps) {
    return ( 
        <View>
            <Text>{props.name}</Text>
        </View>
    );
}