import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useField } from 'formik';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';
import Icon from 'react-native-vector-icons/FontAwesome';

const PickerImage = ({ name }) => {
  const [image, setImage] = useState(null);
  const [, meta, helpers] = useField(name);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      helpers.setValue(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={imagePickerStyles.container}>
      <TouchableOpacity onPress={pickImage} style={imagePickerStyles.imageContainer}>
        {!image ? (
          <Icon name="photo" size={50} color={AppColors.white} />
        ) : (
          <Image source={{ uri: image }} style={imagePickerStyles.image} />
        )}
      </TouchableOpacity>
      {meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};

const imagePickerStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.gray,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 25,
  },
});

export default PickerImage;
