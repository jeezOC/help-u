// import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SignUpForm from '../components/Forms/SignUpForm';
import { AppColors } from '../styles/AppTheme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';


type TSignUpProps = NativeStackScreenProps<TAppLayoutProps>;

const SignUp:React.FC<TSignUpProps> = ({navigation}) => {
  return (
    <View style={styles.container} >
        <View style={styles.imageContainer} >
            <Image
            source={require('../../assets/HelpU_VerticalLogo.png')}
            onError={(e) => console.log(e)}
            style={styles.image}
            />
        </View>
        <View style={styles.signUpContainer}>
            <SignUpForm navigation={navigation} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    backgroundColor: AppColors.background,
  },
  signUpContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 115,
    width: 65,
    objectFit: 'contain',
    resizeMode: 'contain',
  },
});

export default SignUp;
