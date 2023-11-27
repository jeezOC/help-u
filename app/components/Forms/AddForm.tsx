import React, { useState } from 'react';
import Button from '../Button/Button';
import { Formik } from 'formik';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../FormToolkit/components/Inputs/Input';
import TagsInput from '../Tags/TagsInput';
import Icon from '../Icon/Icon';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';
import DateTimePickerModal from '../Modals/DateTimePicker';
import activityService from '../../services/activityService';
import { TActivity } from '../../types/Activity';
import { useAuth } from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { useActivities } from '../../hooks/useActivities';
import PickerImage from '../ImagePicker/ImagePicker';
import { ScrollView } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const Add = ({ navigation }) => {
  const [date, setDate] = useState<DateType>(dayjs());
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const { setActivities } = useActivities()

  const handleSubmit = async (values) => {
    
    const newActivity: Omit<TActivity, 'id'> = {
      owner: user.id,
      name: values.name,
      description: values.desc,
      date,
      location: {
        province: values.location.province,
        canton: values.location.canton,
        district: values.location.district,
        details: values.location.details,
      },
      areasOfInterest: values.areasOfInterest,
      images: values.images,
      bannerImg: values.bannerImg,
      registeredVolunteers: [],
    };
    console.log(newActivity);
    const { success, data, message } = await activityService.create(newActivity as TActivity);
    if (success) {
      toast({
        message: 'Actividad creada con éxito',
        type: 'success',
      })
      setActivities((currentActivities) => [data, ...currentActivities])
      navigation.navigate('Inicio');
    } else {
      toast({
        message: 'Error al crear la actividad',
        type: 'error',
      })
      console.log(message);
    }
  }


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
        location: {
          details: '',
          canton: '',
          province: '',
          district: '',
        },
        bannerImg: '',
        images: [],
        org: '',
      }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer} >

          <View style={styles.rowContainer}>
            <Text style={[styles.text, { width: '50%' }]}>Selecciona la imagen principal del evento</Text>
            <View style={{ width: '50%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <PickerImage name='bannerImg'/>
            </View>
          </View>

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
          <DateTimePickerModal visible={modalVisible} onClose={toggleModal} setValue={setDate} value={date} />

          <Input name='location.province' label='Provincia' />
          <Input name='location.canton' label='Cantón' />
          <Input name='location.district' label='Distrito' />
          <Input name='location.details' label='Detalles' multiline />

          <TagsInput name='areasOfInterest' label='Areas de Interés' />

          <Text style={[styles.text, { width: '100%' }]}>Selecciona imágenes del evento</Text>
          <View style={styles.rowContainer}>
            <ScrollView horizontal={true} style={{ paddingBottom: 5 }}>
              <PickerImage name='images[0]' />
              <PickerImage name='images[1]' />
              <PickerImage name='images[2]' />
              <PickerImage name='images[3]' />
            </ScrollView>
          </View>

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
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: AppColors.notBlack,
    fontSize: AppTextSizes.sm,
    fontFamily: AppFonts.regular,
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