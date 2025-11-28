import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { ListTasks } from "@/src/components/list/list_tasks";
import { Toolbar } from "@/src/components/toolbar";
import { useState } from "react";
import { AddTaskModal } from "@/src/components/list/add_task_modal"
import { EditTaskModal } from "@/src/components/list/edit_task_modal"
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import { useTasks } from "@/src/context/TaskContext";
import data from "@/src/resources/data.json";
import ConfettiCannon from 'react-native-confetti-cannon';

export function List(){
    const params = useLocalSearchParams();
    const listId = Number(params.id);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
    const [confettiForTaskId, setConfettiForTaskId] = useState<number | null>(null);
    const Confetti: any = ConfettiCannon as any;

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
        // determine whether this toggle will mark the task finished
        const task = tasks.find(t => t.id === taskId);
        const willBeFinished = task ? !task.isFinished : false;
        toggleTask(taskId);
        if (willBeFinished) {
            setConfettiForTaskId(taskId);
            setTimeout(() => setConfettiForTaskId(prev => (prev === taskId ? null : prev)), 5000);
        }
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

    const handleTaskMove = (taskId: number, targetListId: number) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        const updated: TasksThumbnail = { ...task, listId: targetListId } as TasksThumbnail;
        updateTask(updated);
        setIsEditModalOpen(false);
    };

    const filteredTasks = tasks.filter(task => task.listId === listId);

    return (
        <View style ={{ flex: 1 }}>
            <ListTasks listId={listId} tasks={tasks} onTaskToggle={handleTaskToggle} onTaskDelete={handleTaskDelete}/>
            {confettiForTaskId !== null && (
                <Confetti key={`confetti-${confettiForTaskId}`} count={80} origin={{ x: -10, y: 0 }} />
            )}
            <Toolbar name={"Tasks"} onAdd={handleAddTask} onEdit={handleEditTask}/>
            <AddTaskModal 
                isOpen={isAddModalOpen}
                closeModal={handleCloseAddModal}
                onTaskCreate={handleTaskCreate}
                listId={listId}
            />
            <EditTaskModal 
                isOpen={isEditModalOpen}
                closeModal={handleCloseEditModal}
                tasks={filteredTasks}
                lists={data.lists}
                onTaskUpdate={handleTaskUpdate}
                onTaskMove={handleTaskMove}
            />
        </View>
    );
}