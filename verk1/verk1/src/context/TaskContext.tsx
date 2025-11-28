import React, { createContext, useState, useContext, useEffect } from "react";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import data from "@/src/resources/data.json";

interface TaskContextType {
  tasks: TasksThumbnail[];
  addTask: (task: TasksThumbnail) => void;
  updateTask: (task: TasksThumbnail) => void;
  deleteTask: (taskId: number) => void;
  toggleTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TasksThumbnail[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize tasks from JSON only once on app start
  useEffect(() => {
    if (!isInitialized) {
      const jsonTasks = data.tasks as unknown as TasksThumbnail[];
      setTasks(jsonTasks);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const addTask = (task: TasksThumbnail) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (task: TasksThumbnail) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const toggleTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isFinished: !t.isFinished } : t,
      ),
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
}
