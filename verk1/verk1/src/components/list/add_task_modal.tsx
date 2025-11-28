import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { Modal } from "../home/modal";
import { useState } from "react";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import styles from "./list_styles/add_task_styles";

interface AddTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onTaskCreate: (Task: TasksThumbnail) => void;
  listId: number;
}

export function AddTaskModal(props: AddTaskModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
    setIsFinished(false);
  };

  const handleCreateTask = () => {
    if (!name || !description) {
      alert("Please enter a name and description");
      return;
    }

    const newTask: TasksThumbnail = {
      id: Date.now(),
      name: name,
      description: description,
      isFinished: false,
      listId: props.listId,
    };

    props.onTaskCreate(newTask);
    resetForm();
    props.closeModal();
  };

  return (
    <Modal
      title="Add New Task"
      isOpen={props.isOpen}
      closeModal={props.closeModal}
    >
      <ScrollView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Board Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

export default AddTaskModal;
