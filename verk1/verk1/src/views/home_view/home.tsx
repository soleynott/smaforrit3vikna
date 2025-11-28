
import { HomeBoards } from "@/src/components/home/home_boards";
import { Toolbar } from "@/src/components/toolbar";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { AddModal } from "@/src/components/home/add_modal";
import { EditModal } from "@/src/components/home/edit_modal";
import { BoardThumbnail } from "@/src/types/board_thumbnail";
import data from "@/src/resources/data.json";

export function Home(){
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [boards, setBoards] = useState<BoardThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load boards from JSON on app start
  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      // Always load from JSON - deletions are session-only
      const jsonBoards = data.boards as unknown as BoardThumbnail[];
      setBoards(jsonBoards);
    } catch (error) {
      console.error('Error loading boards:', error);
    } finally {
      setIsLoading(false);
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
