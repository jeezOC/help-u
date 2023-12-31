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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: AppColors.background,
  },
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
    height: 250,
    width: 200,
    objectFit: 'contain',
    resizeMode: 'contain',
  },
});

export default SignUp;
