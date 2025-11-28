import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { ListTasks } from "@/src/components/list/list_tasks";
import { Toolbar } from "@/src/components/toolbar";
import { useState, useEffect } from "react";
import { AddTaskModal } from "@/src/components/list/add_task_modal"
import { EditTaskModal } from "@/src/components/list/edit_task_modal"
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from "@/src/resources/data.json";

export function List(){
    const params = useLocalSearchParams();
    const listId = Number(params.id);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [tasks, setTasks] = useState<TasksThumbnail[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const handleTaskCreate = (newTask: TasksThumbnail) => {
    setTasks([...tasks, newTask]);
    };

    const handleTaskUpdate = (updatedTask: TasksThumbnail) => {
    setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
    ));
    setIsEditModalOpen(false);
    };

    const handleTaskDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setIsEditModalOpen(false);
    };

    const filteredTasks = tasks.filter(task => task.listId === listId);

    return (
        <View style ={{ flex: 1 }}>
            <ListTasks listId={listId}/>
            <Toolbar name={"Tasks"} onAdd={handleAddTask} onEdit={handleEditTask}/>
            <AddTaskModal 
                isOpen={isAddModalOpen}
                closeModal={handleCloseAddModal}
                onTaskCreate={handleTaskCreate}
                listId={listId}
                nextId = {tasks.length > 0 ? Math.max(...tasks.map(l => l.id)) + 1 : 1} //check next available id
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