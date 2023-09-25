import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropdownComponent from '../../components/Dropdown';

export default function ClothingCreationScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [value, setValue] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
    <Button title="Pick an image from camera roll" onPress={pickImage} />
    {image && (
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    )}
    <View>
      <TextInput
        placeholder="Enter Name of clothing"
        value={name}
        onChangeText={(name) => setName(name)}
        mode='outlined'
      />
      <DropdownComponent value={value} setValue={setValue}></DropdownComponent>
      <Button title="Submit" />
    </View>
  </View>
  );
}
