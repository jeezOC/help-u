import React from 'react';
import Button from '../Button/Button';
import { Formik } from 'formik';
import { StyleSheet, View, Text, Image} from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import { AppFonts } from '../../styles/AppTheme';

const settings = ({ navigation }) => {
  const handleSubmit = (values) => {
    navigation.replace('settings');
  }

  return (
    <Formik
      initialValues={{ }}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer}>

          <View style={styles.containerBtn}>
            <View style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='image' iconSize={'md'} iconColor='grey' />
                <View>
                  <Text style={{ fontFamily: AppFonts.bold, color: 'black', marginLeft:20}}>Nombre de Prueba</Text>
                  <Text style={{ fontFamily: AppFonts.regular, color: 'grey', marginLeft:20}}>Correo de Prueba</Text>
                </View>
              </View>
              <Icon iconName='bell' iconColor='grey' iconSize={'md'} />
            </View>
          </View>

          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='user' iconSize={'md'} iconColor='gray'/>
                <Text style={styles.text}>Ajustes de cuenta</Text>
              </View>
              <Icon iconName='edit' iconSize={'md'} iconColor='gray'/>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='language' iconSize={'md'} iconColor='gray'/>
                <Text style={styles.text}>Idioma</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray'/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='comment' iconSize={'md'} iconColor='gray'/>
                <Text style={styles.text}>Feedback</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='star' iconSize={'md'} iconColor='gray'/>
                <Text style={styles.text}>Calificanos</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='download' iconSize={'md'} iconColor='gray'/>
                <Text style={styles.text}>Actualizar</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray'/>
            </TouchableOpacity>
          </View>
          <Button onPress={() => navigation.navigate('Login')}  
                  label='Cerrar sesión' size={'md'}          
                  accent="cancel"
                  style={{
                    width: '70%',
                    marginTop: 15,
                    alignSelf: 'center',
                  }} 
          />
        </View>
      )}
    </Formik>


  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  containerBtn: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 45,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: AppFonts.regular,
    paddingHorizontal: 10,
    color: 'gray',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default settings;
