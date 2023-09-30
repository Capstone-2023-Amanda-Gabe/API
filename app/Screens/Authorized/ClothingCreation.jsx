import React, { useState, useEffect, useContext } from "react";
import { Button, Image, View, Platform, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropdownComponent from "../../components/Dropdown";
import { StyleSheet } from "react-native";
import AppContext from "../../context/appContext";
import { FIREBASE_BUCKET } from "../../FirebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
export default function ClothingCreationScreen() {
  const [uploading, setUploading] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const { clothingBrand } = useContext(AppContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }

  const handleSubmit = async () => {
    setUploading(true);
    rootRef = ref(FIREBASE_BUCKET);
    fileRef = ref(FIREBASE_BUCKET, Date.now() + "");
    uriToBlob(image).then((blob) => {
      uploadBytes(fileRef, blob).then((snapshot) => {
        alert("upload success");
        console.log(fileRef);
      })
    })
    // try {
    //   const blob = await uriToBlob(image)
    //   rootRef = ref(FIREBASE_BUCKET);
    //   fileRef = ref(FIREBASE_BUCKET, Date.now() + "");
    //   uploadBytes(fileRef, blob).then((snapshot) => {
    //     alert("upload success");
    //   }).then((snapshot)=>{

    //     blob.close();

    //     resolve(snapshot);

    //   }).catch((error)=>{

    //     reject(error);

    //   });
    //   setImage(null);
    // } catch (error) {
    //   console.log(error);
    //   alert("Photo not uploaded!");
    // }

    // setUploading(false);

  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter Name of clothing"
          value={name}
          onChangeText={(name) => setName(name)}
          mode="outlined"
        />
        <DropdownComponent></DropdownComponent>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  imageContainer: { alignItems: "center", justifyContent: "center" },
});
