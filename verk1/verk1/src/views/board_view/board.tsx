import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { BoardList } from "@/src/components/board_list/board_lists";
import { Toolbar } from "@/src/components/toolbar";
import { useState, useEffect } from "react";
import { AddListModal } from "@/src/components/board_list/add_list_modal";
import { EditListModal } from "@/src/components/board_list/edit_list_modal";
import { ListsThumbnail } from "@/src/types/lists_thumbnail";
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

  const loadlists = async () => {
    try {
      const jsonlists = data.lists as unknown as ListsThumbnail[];
      setLists(jsonlists);
    } catch (error) {
      console.error("Error loading lists:", error);
    } finally {
      setIsLoading(false);
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
    setLists(
      lists.map((list) => (list.id === updatedList.id ? updatedList : list)),
    );
    setIsEditModalOpen(false);
  };

  const handleListDelete = (listId: number) => {
    setLists(lists.filter((list) => list.id !== listId));
    setIsEditModalOpen(false);
  };

  const filteredLists = lists.filter((list) => list.boardId === boardId);
  return (
    <View style={{ flex: 1 }}>
      <BoardList lists={filteredLists} />
      <Toolbar name={"Lists"} onAdd={handleAddList} onEdit={handleEditList} />
      <AddListModal
        isOpen={isAddModalOpen}
        closeModal={handleCloseAddModal}
        onListCreate={handleListCreate}
        boardId={boardId}
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
