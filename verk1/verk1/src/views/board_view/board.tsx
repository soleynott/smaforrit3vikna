import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { BoardList } from "@/src/components/board_list/board_lists"
import { Toolbar } from "@/src/components/toolbar";
import { useState, useEffect } from "react";
import { EditListModal } from "@/src/components/board_list/edit_list_modal"
import { ListsThumbnail } from "@/src/types/boards_thumbnail";
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from "@/src/resources/data.json";

export function Board() {
  const params = useLocalSearchParams();
  const boardId = Number(params.id); 
  const boardName = params.name as string;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [lists, setLists] = useState<ListsThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (

    <View style={{ flex: 1 }}>
      <BoardList boardId={boardId} />
      <Toolbar onAdd={handleAddList} onEdit={handleEditList}/>
      <AddModal 
        isOpen={isAddModalOpen}
        closeModal={handleCloseAddModal}
        onBoardCreate={handleBoardCreate}
      />
      <EditListModal 
        isOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        lists={lists}
        onListUpdate={handleLisUpdate}
        onListDelete={HandleListDelete}
      />
    </View>
  );
}

