import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

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
        setTags([...tags, text.trim()]);
      }
      setText('');
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const editTag = (index) => {
    const tagToEdit = tags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={tagStyles.tagText}>Áreas de interés</Text>
      <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 1 }}>
        <TextInput
          style={tagStyles.input}
          placeholder="Añade una etiqueta"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTag}
        />
        <TouchableOpacity onPress={addTag}
          style={tagStyles.addButton}>
          <Text style={tagStyles.buttonText}>
            {editIndex !== null ? 'Actualizar' : 'Añadir'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tagStyles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index}
            style={tagStyles.tagWrapper}>
            <TouchableOpacity
              onPress={() => editTag(index)}
              style={tagStyles.tag}>
              <Text style={tagStyles.tagText}>
                {tag}
              </Text>
              <TouchableOpacity
                onPress={() => removeTag(index)}
                style={tagStyles.removeButton}>
                <Text style={tagStyles.removeButtonText}>
                  x
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const tagStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: AppColors.orangeGhost,
  },
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
    width: '100%',
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: AppTextSizes.sm,
    fontFamily: AppFonts.bold,
  },
});

export default TagsInput
