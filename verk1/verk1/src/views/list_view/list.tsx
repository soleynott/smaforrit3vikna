import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { ListTasks } from "@/src/components/list/list_tasks";
import { Toolbar } from "@/src/components/toolbar";
import { useState } from "react";
import { AddTaskModal } from "@/src/components/list/add_task_modal"
import { EditTaskModal } from "@/src/components/list/edit_task_modal"
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import { useTasks } from "@/src/context/TaskContext";

export function List(){
    const params = useLocalSearchParams();
    const listId = Number(params.id);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();

    const handleAddTask = () => {
        setIsAddModalOpen(true);
    };

    const handleEditTask = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleTaskToggle = (taskId: number) => {
        toggleTask(taskId);
    };

    const handleTaskCreate = (newTask: TasksThumbnail) => {
        addTask(newTask);
    };

    const handleTaskUpdate = (updatedTask: TasksThumbnail) => {
        updateTask(updatedTask);
        setIsEditModalOpen(false);
    };

    const handleTaskDelete = (taskId: number) => {
        deleteTask(taskId);
        setIsEditModalOpen(false);
    };

    const filteredTasks = tasks.filter(task => task.listId === listId);

    return (
        <View style ={{ flex: 1 }}>
            <ListTasks listId={listId} tasks={tasks} onTaskToggle={handleTaskToggle} onTaskDelete={handleTaskDelete}/>
            <Toolbar name={"Tasks"} onAdd={handleAddTask} onEdit={handleEditTask}/>
            <AddTaskModal 
                isOpen={isAddModalOpen}
                closeModal={handleCloseAddModal}
                onTaskCreate={handleTaskCreate}
                listId={listId}
                nextId = {tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1} //check next available id
            />
            <EditTaskModal 
                isOpen={isEditModalOpen}
                closeModal={handleCloseEditModal}
                tasks={filteredTasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
            />
        </View>
    );
}