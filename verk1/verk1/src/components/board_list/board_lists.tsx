/*in board view, each list in one board*/
import React from "react"
import { lists } from "../../resources/data.json"

// const BoardList: React.FC
export const BoardList = (boardId: number) => {
  return lists.filter(list => list.boardId === boardId);
};