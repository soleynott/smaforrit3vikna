import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Modal } from "../modal/modal";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ContactThumbnail } from "@/src/types/contact_thumbnail";
import { Contact } from "@/src/services/file-service";

interface EditContactProps {
    isOpen: boolean
    closeModal: () => void;
    contacts: ContactThumbnail[];
    onContactUpdate: (updateContact: ContactThumbnail) => void;
    onContactDelete: (contactId: number) => void;
}

export function EditContactModal(props: EditContactProps) {
    const [selectedContact, setSelectedContact] = useState<ContactThumbnail | null>(null);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [isEditingContact, setIsEditingContact] = useState(false);

    useEffect(() => {
        if (selectedContact && isEditingContact) {
            setName(selectedContact.name);
            setPhone(selectedContact.phoneNumber)
        }
    }, [selectedContact, isEditingContact]);

    const handleSelectContact = (contact: ContactThumbnail) => {
        setSelectedContact(contact);
        setIsEditingContact(true);
    };

    const handleUpdateContact = () => {
        if (!name || !phone) {
            alert("Please fill in name and phone number");
            return;
        }

        if (!selectedContact) return;

        const updatedContact: ContactThumbnail = {
            ...selectedContact,
            name: name,
            phoneNumber: phone,
            thumbnailPhoto: "k",
        };

        props.onContactUpdate(updatedContact);
        resetForm();
    };

    const handleDeleteContact = () => {
        if (!selectedContact) return;

        Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete "${selectedContact.name}"? This cannot be undone.`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            props.onContactDelete(selectedContact.id);
            resetForm();
          },
          style: "destructive",
        },
      ],
    );
    };
    const resetForm = () => {
        setSelectedContact(null);
        setName("");
        setPhone("");
        setIsEditingContact(false);
    }
}