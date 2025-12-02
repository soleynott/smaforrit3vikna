import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import conta

export default function EditContactScreen() {
  const { name, number, image } = useLocalSearchParams<{
    name?: string;
    number?: string;
    image?: string;
  }>();

  const [newName, setNewName] = useState(name ?? "");
  const [newNumber, setNewNumber] = useState(number ?? "");
  const [newImage, setNewImage] = useState(image ?? "");

  const handleSave = () => {
    // You can later save this somewhere (async storage, API, etc)
    console.log("Updated contact:", {
      name: newName,
      number: newNumber,
      image: newImage,
    });

    // go back to previous screen
    router.back();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Edit Contact</Text>

      {newImage !== "" && (
        <Image source={{ uri: newImage }} style={styles.photo} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={newImage}
        onChangeText={setNewImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        onChangeText={setNewName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={newNumber}
        onChangeText={setNewNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});
