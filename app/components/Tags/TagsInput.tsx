import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';
import { useField } from 'formik';

type TagsInputProps = {
  name: string;
  label: string;
};

const TagsInput = (props:TagsInputProps) => {
  const { name,label } = props;

  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [, meta, helpers] = useField(name);

  const addTag = () => {
    if (text.trim() !== '') {
      if (editIndex !== null) {
        // If editing an existing tag
        const newTags = [...tags];
        newTags[editIndex] = text.trim();
        setTags(newTags);
        setEditIndex(null);
      } else {
        // If adding a new tag
        setTags([text.trim(),...tags]);
      }
      setText('');
      helpers.setValue(tags); // Update Formik field value
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    helpers.setValue(newTags); // Update Formik field value
  };

  const editTag = (index) => {
    const tagToEdit = tags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={tagStyles.tagText}>{label}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 1,flexShrink:1 }}>
      <View style={{ flexDirection: 'row', flexShrink:1 }}>
        <TextInput
          style={[tagStyles.input, editIndex !== null ? {width: '60%'} : {width: '70%'}]}
          placeholder="Añade una etiqueta"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTag}
        />
        </View>
        <TouchableOpacity onPress={addTag} style={tagStyles.addButton}>
          <Text style={tagStyles.buttonText}>
            {editIndex !== null ? 'Actualizar' : 'Añadir'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tagStyles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={tagStyles.tagWrapper}>
            <TouchableOpacity onPress={() => editTag(index)} style={tagStyles.tag}>
              <Text style={tagStyles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(index)} style={tagStyles.removeButton}>
                <Text style={tagStyles.removeButtonText}>x</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
    </View>
  );
};

const tagStyles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 5
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.gray,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: AppColors.notBlack,
    fontFamily: AppFonts.regular,
    fontSize: AppTextSizes.sm,
  },
  removeButton: {
    marginLeft: 5,
    borderRadius: 100,
    backgroundColor: AppColors.gray,
  },
  removeButtonText: {
    color: AppColors.notBlack,
    fontSize: AppTextSizes.sm,
    fontFamily: AppFonts.bold,
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: AppColors.gray,
    backgroundColor: AppColors.white,
    fontSize: AppTextSizes.sm,
    fontFamily: AppFonts.ligth,
  },
  addButton: {
    backgroundColor: AppColors.greenSolid,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: AppTextSizes.sm,
    fontFamily: AppFonts.bold,
  },
});

export default TagsInput
