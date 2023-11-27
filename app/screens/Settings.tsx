import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsForm from '../components/Forms/SettingsForm';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { AppColors, AppTextSizes, AppFonts } from '../styles/AppTheme';
import HeaderLabel from '../components/HeaderLabel';

type TSettingsProps = NativeStackScreenProps<TAppLayoutProps>;

const Settings: React.FC<TSettingsProps> = ({ navigation }) => {

  return (
    <View
      style={styles.container}
    >
      <HeaderLabel text="Información de usuario" />
      <View style={styles.buttonContainer}>
        <SettingsForm navigation={navigation} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinear al principio verticalmente
    alignItems: 'center',
  },
  buttonContainer: {

    justifyContent: 'center',
    width: '100%', // Hacer que el contenedor ocupe el 100% del ancho de la pantalla
    paddingHorizontal: 35,
  },
  image: {
    height: 30,
    width: 30,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default Settings;
