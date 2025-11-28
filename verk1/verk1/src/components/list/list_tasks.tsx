import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TaskItem } from "./task_item";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";

//displays all tasks in one list
type TaskListProps = {
  listId: number;
  tasks: TasksThumbnail[];
  onTaskToggle: (id: number) => void;
  onTaskDelete: (id: number) => void;
};

export function ListTasks({
  listId,
  tasks,
  onTaskToggle,
  onTaskDelete,
}: TaskListProps) {
  // Filter tasks for what list they belong to
  const filteredTasks = tasks.filter((t) => t.listId === listId);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            name={item.name}
            description={item.description}
            isFinished={item.isFinished}
            listId={item.listId}
            onToggle={() => onTaskToggle(item.id)}
            onDelete={() => onTaskDelete(item.id)}
          />
        )}
      />
    </View>
  );
}
