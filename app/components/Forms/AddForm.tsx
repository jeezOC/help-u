import React from 'react';
import Button from '../Button/Button';
import { Formik } from 'formik';
import { StyleSheet, View, Text } from 'react-native';
import Input from '../FormToolkit/components/Inputs/Input';
import TagsInput from '../Tags/TagsInput';
import activityService from '../../services/activityService';
import { TActivity } from '../../types/Activity';
import { useAuth } from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { useActivities } from '../../hooks/useActivities';

const Add = ({ navigation }) => {
  const { user } = useAuth();
  const toast = useToast();

  const handleSubmit = async (values) => {
    const { setActivities } = useActivities()


    // const newActivity: TActivity = {
    //   owner: user.id,
    //   // TODO: COMPLETE THE ACTIVITY TYPE | DANAH
    //   // name: values.name,
    //   // description: values.desc,
    //   // date: values.date,
    //   // time: values.time,
    //   // location: values.location,
    //   // photos: values.photos,
    //   // organization: values.org,
    // };
    // const { success, data, message } = await activityService.create(newActivity as TActivity);
    // if (success) {
    //   toast({
    //     message: 'Actividad creada con éxito',
    //     type: 'success',
    //   })
    //   setActivities((currentActivities) => [data, ...currentActivities])
    //   navigation.navigate('Home');
    // } else {
    //   toast({
    //     message: 'Error al crear la actividad',
    //     type: 'error',
    //   })
    //   console.log(message);
    // }
  }

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
          <Input name='desc' label='Descripción' />
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
});

export default Add;