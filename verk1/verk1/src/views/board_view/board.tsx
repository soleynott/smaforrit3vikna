import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { BoardList } from "@/src/components/board_list/board_lists"
import { Toolbar } from "@/src/components/toolbar";
import { useState, useEffect } from "react";
import { AddListModal } from "@/src/components/board_list/add_list_modal"
import { EditListModal } from "@/src/components/board_list/edit_list_modal"
import { ListsThumbnail } from "@/src/types/lists_thumbnail";
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

  // Load lists on app start
  useEffect(() => {
    loadlists();
  }, []);

  // Save lists to AsyncStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      savelists(lists);
    }
  }, [lists, isLoading]);

  const loadlists = async () => {
    try {
      const savedlists = await AsyncStorage.getItem('lists');
      if (savedlists) {
        // Use saved lists if they exist
        setLists(JSON.parse(savedlists));
      } else {
        // First time app is opened, use JSON data
        const jsonlists = data.lists as unknown as ListsThumbnail[];
        setLists(jsonlists);
        await AsyncStorage.setItem('lists', JSON.stringify(jsonlists));
      }
    } catch (error) {
      console.error('Error loading lists:', error);
      // Fallback to JSON data if AsyncStorage fails
      const jsonlists = data.lists as unknown as ListsThumbnail[];
      setLists(jsonlists);
    } finally {
      setIsLoading(false);
    }
  };

  const savelists = async (listsToSave: ListsThumbnail[]) => {
    try {
      await AsyncStorage.setItem('lists', JSON.stringify(listsToSave));
    } catch (error) {
      console.error('Error saving lists:', error);
    }
  };

  const handleAddList = () => {
    setIsAddModalOpen(true);
  };

  const handleEditList = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleListCreate = (newList: ListsThumbnail) => {
    setLists([...lists, newList]);
  };

  const handleListUpdate = (updatedList: ListsThumbnail) => {
    setLists(lists.map(list => 
      list.id === updatedList.id ? updatedList : list
    ));
    setIsEditModalOpen(false);
  };

  const handleListDelete = (listId: number) => {
    setLists(lists.filter(list => list.id !== listId));
    setIsEditModalOpen(false);
  };
 
  const filteredLists = lists.filter(list => list.boardId === boardId);
  return (

    <View style={{ flex: 1 }}>
      <BoardList boardId={boardId} />
      <Toolbar name={"Lists"} onAdd={handleAddList} onEdit={handleEditList}/>
      <AddListModal 
        isOpen={isAddModalOpen}
        closeModal={handleCloseAddModal}
        onListCreate={handleListCreate}
        boardId={boardId}
        nextId = {lists.length > 0 ? Math.max(...lists.map(l => l.id)) + 1 : 1} //check next available id
      />
      <EditListModal 
        isOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        lists={filteredLists}
        onListUpdate={handleListUpdate}
        onListDelete={handleListDelete}
      />
    </View>
  );
}

