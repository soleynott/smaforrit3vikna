import * as ImagePicker from "expo-image-picker";

export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === "granted";
};

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === "granted";
};

export const selectFromCameraRoll = async (): Promise<string> => {
  const permissionGranted = await requestMediaLibraryPermission();
  if (!permissionGranted) {
    throw new Error("Permission denied for accessing camera roll");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    throw new Error("Image selection canceled");
  }
  return result.assets[0].uri;
};
