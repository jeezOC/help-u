import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginForm from '../components/Forms/LoginForm';
import { AppColors } from '../styles/AppTheme';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { TNoHeaderLayoutProps } from '../layouts/NoHeaderLayout';

type TLoginProps = NativeStackScreenProps<TNoHeaderLayoutProps>;

const Login: React.FC<TLoginProps> = ({ navigation }) => {
  const { replace, navigate } = navigation;
  const { user , isLoading, handleLogout } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.onBoardingCompleted) replace('App')
      else navigate('SignUp')
      // handleLogout();
    }
  }, [user, isLoading])

  return (
    <View style={styles.container} >
      <View style={styles.imageContainer} >
        <Image
          source={require('../../assets/HelpU_VerticalLogo.png')}
          onError={(e) => console.log(e)}
          style={styles.image}
        />
      </View>
      <View style={styles.loginContainer}>
        <LoginForm navigation={navigation} />
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
  loginContainer: {
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

export default Login;
