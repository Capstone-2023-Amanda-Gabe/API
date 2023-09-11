import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import DropdownComponent from "../components/dropdown";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import data from "../Redux/data";

export default function CreateClothesPage() {
  const [image, setImage] = useState(null);
  const [Brandvalue, setBrandValue] = useState(null);
  const [name, setName] = useState(null);
  const selectedBrand = useSelector((state) => state.selectedBrand.value);

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

  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: (clothes) => {
      // return axios.post('http://127.0.0.1:8900/clothes', clothes)
      // // axios({
      // //   method: "post",
      // //   url: "http://127.0.0.1:8900/clothes",
      // //   data: clothes,
      // //   headers: { "Content-Type": "multipart/form-data" },
      // // })
      // //   .then(function (response) {
      // //     //handle success
      // //     console.log(response);
      // //   })
      // //   .catch(function (response) {
      // //     //handle error
      // //     console.log(response);
      // //   });

      const result = axios.post("https://127.0.0.1:8900/clothes", clothes, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });
      console.log(result);
      return result;
    },
  });

  console.log("reload");
  const postClothes = async (formData) => {
    const result = await fetch("http://127.0.0.1:8900/clothes", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    },
    );
    console.log(result)
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", selectedBrand);
    formData.append("user_id", user.id);
    // formData.append("image", image);
    formData.append("image", {
      uri: image,
      name: "image.png",
      fileName: "image",
      type: "image/png",
    });

    postClothes(formData)
    // console.log();
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
        />
        <DropdownComponent
          value={Brandvalue}
          setValue={setBrandValue}
        ></DropdownComponent>
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    </View>
  );
}
