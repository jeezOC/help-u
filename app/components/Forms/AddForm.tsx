import React, { useState } from 'react';
import Button from '../Button/Button';
import { Formik } from 'formik';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../FormToolkit/components/Inputs/Input';
import TagsInput from '../Tags/TagsInput';
import Icon from '../Icon/Icon';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';
import DateTimePickerModal from '../Modals/DateTimePicker';

const Add = ({ navigation }) => {

  const handleSubmit = (values) => {
    navigation.replace('add');
  }

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        photos: '',
        org: '',
      }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer} >
          <Input name='name' label='Nombre' />

          <Input name='desc' label='Descripción' multiline />

          <TouchableOpacity
            style={styles.button}
            onPress={toggleModal}>
            <Icon iconName={'calendar'} iconSize={'md'} iconColor={AppColors.white}></Icon>
            <Text style={styles.buttonText}>
              {'Seleccionar fecha y hora'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal visible={modalVisible} onClose={toggleModal} />

          <Input name='location' label='Ubicación' multiline />

          <TagsInput></TagsInput>

          <Input name='org' label='Organización asociada' />

          <Button onPress={() => handleSubmit()} label='Crear' size={'lg'}
            style={{
              width: '90%',
              marginTop: 20,
            }} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: AppColors.greenSolid,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: AppTextSizes.sm,
    fontFamily: AppFonts.bold,
  },
});

export default Add;