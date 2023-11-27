import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsForm from '../components/Forms/SettingsForm';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { AppColors, AppTextSizes, AppFonts } from '../styles/AppTheme';

type HeaderLabelProps = {
  text: string;
};
const HeaderLabel = (props: HeaderLabelProps) => {
  const { text } = props;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/favicon.png')}
          onError={(e) => console.log(e)}
          style={styles.image}
        />

        <Text style={{ fontSize: AppTextSizes.lg, color: AppColors.greenSolid, fontFamily: AppFonts.bold }} >
          {text}
        </Text>
      </View>

    </View>
  );
}


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
    // flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
  }
});


export default HeaderLabel;