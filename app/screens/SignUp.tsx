// import { Image } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SignUpForm from '../components/Forms/SignUpForm';
import { AppColors } from '../styles/AppTheme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


type TSignUpProps = NativeStackScreenProps<TAppLayoutProps>;

const SignUp: React.FC<TSignUpProps> = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView style={styles.scrollContainer}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      showsVerticalScrollIndicator={true}
      extraScrollHeight={-1000}
    >
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: AppColors.background,
  },
  signUpContainer: {
    width: '100%',
    flex: 1,
    flexGrow: 1,
    height: '100%',
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
