
import { HomeBoards } from "@/src/components/home/home_boards";
import { Toolbar } from "@/src/components/toolbar";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { AddModal } from "@/src/components/home/add_modal";
import { EditModal } from "@/src/components/home/edit_modal";
import { BoardThumbnail } from "@/src/types/board_thumbnail";
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from "@/src/resources/data.json";

export function Home(){
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [boards, setBoards] = useState<BoardThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load boards on app start
  useEffect(() => {
    loadBoards();
  }, []);
  // reset local storage
  useEffect(() => {
    const resetStorage = async () => {
      await AsyncStorage.clear();
    };
    resetStorage();
}, []);
  // Save boards to AsyncStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveBoards(boards);
    }
  }, [boards, isLoading]);

  const loadBoards = async () => {
    try {
      const savedBoards = await AsyncStorage.getItem('boards');
      if (savedBoards) {
        // Use saved boards if they exist
        setBoards(JSON.parse(savedBoards));
      } else {
        // First time app is opened, use JSON data
        const jsonBoards = data.boards as unknown as BoardThumbnail[];
        setBoards(jsonBoards);
        await AsyncStorage.setItem('boards', JSON.stringify(jsonBoards));
      }
    } catch (error) {
      console.error('Error loading boards:', error);
      // Fallback to JSON data if AsyncStorage fails
      const jsonBoards = data.boards as unknown as BoardThumbnail[];
      setBoards(jsonBoards);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBoards = async (boardsToSave: BoardThumbnail[]) => {
    try {
      await AsyncStorage.setItem('boards', JSON.stringify(boardsToSave));
    } catch (error) {
      console.error('Error saving boards:', error);
    }
  };

  const handleAddBoard = () => {
    setIsAddModalOpen(true);
  };

  const handleEditBoard = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleBoardCreate = (newBoard: BoardThumbnail) => {
    setBoards([...boards, newBoard]);
  };

  const handleBoardUpdate = (updatedBoard: BoardThumbnail) => {
    setBoards(boards.map(board => 
      board.id === updatedBoard.id ? updatedBoard : board
    ));
    setIsEditModalOpen(false);
  };

  const handleBoardDelete = (boardId: number) => {
    setBoards(boards.filter(board => board.id !== boardId));
    setIsEditModalOpen(false);
  };
 
  return (
    <View style={{flex:1}}>
      <HomeBoards boards={boards}/>
      <Toolbar name={"Boards"} onAdd={handleAddBoard} onEdit={handleEditBoard}/>
      <AddModal 
        isOpen={isAddModalOpen}
        closeModal={handleCloseAddModal}
        onBoardCreate={handleBoardCreate}
      />
      <EditModal 
        isOpen={isEditModalOpen}
        closeModal={handleCloseEditModal}
        boards={boards}
        onBoardUpdate={handleBoardUpdate}
        onBoardDelete={handleBoardDelete}
      />
    </View>
  );
}
