import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { useSelector } from "react-redux";
import DropdownComponent from '../components/dropdown';
import { useQuery, useMutation } from 'react-query'
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';
import data from '../Redux/data';

export default function CreateClothesPage() {
  const [image, setImage] = useState(null);
  const [Brandvalue, setBrandValue] = useState(null);

  const selectedBrand = useSelector(state => state.selectedBrand.value)

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
  console.log("Reloaded")
  const mutation = useMutation({
    mutationFn: (clothes) => {
      return axios.post('http://127.0.0.1:8900/clothes', clothes)
    },
  })

  return (
    <View >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Formik
        initialValues={{ name: ''}}
        onSubmit={values => {
          // const data = new FormData(values)
          // data.append("image", image);
          // data.append("description", selectedBrand.label);
          // data.append("user_id", user.id);
          // console.log(data);
          // data = {
          //   name: values.name,
          //   image: image,
          //   description: selectedBrand,
          //   user_id: user.id,
          // }
          
          const data = new FormData(data);
          data.append("image", image);
          data.append("description", selectedBrand.label);
          data.append("user_id", user.id);
          data.append("name", values.name);
          console.log(data.keys())
          mutation.mutate(data);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <DropdownComponent value={Brandvalue} setValue={setBrandValue}></DropdownComponent>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>

  );
}

