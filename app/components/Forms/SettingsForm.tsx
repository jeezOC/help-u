import React, { useState } from 'react';
import Button from '../Button/Button';
import { Formik } from 'formik';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import { AppFonts, AppTextSizes } from '../../styles/AppTheme';
import SettingsModal from '../Modals/SettingsModal';
import AccountLinkingModal from '../Modals/AccountLinkingModal';
import { useAuth } from '../../hooks/useAuth';

const settings = ({ navigation }) => {
  const { handleLogout } = useAuth();
  const handleSubmit = (values) => {
    navigation.replace('settings');
  }
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const { user, updateSession } = useAuth();
  const onLogout = async () => {
    await handleLogout();
    navigation.replace('Login');
  }


  return (
    <Formik
      initialValues={{}}
      onSubmit={values => handleSubmit(values)}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.formContainer}>

          <View style={styles.containerBtn}>
            <View style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='image' iconSize={'md'} iconColor='grey' />
                <View>
                  <Text style={{ fontFamily: AppFonts.bold, color: 'black', marginLeft: 20 }}>{user.userName}</Text>
                  <Text style={{ fontFamily: AppFonts.regular, color: 'grey', marginLeft: 20 }}>{user.email}</Text>
                </View>
              </View>
              <Icon iconName='bell' iconColor='grey' iconSize={'md'} />
            </View>
          </View>
          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='user' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Ajustes de cuenta</Text>
              </View>
              <Icon iconName='edit' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>
            <SettingsModal visible={modalVisible} onClose={toggleModal} />
          </View>
          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <View style={styles.leftContent}>
                <Icon iconName='link' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Vincular cuentas</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>
            <AccountLinkingModal isVisible={modalVisible} onClose={toggleModal} />
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='comment' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Feedback</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='star' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Calificanos</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='download' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Actualizar</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>
          </View>
          <Button onPress={() => onLogout()}
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
    fontSize: AppTextSizes.sm,
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
