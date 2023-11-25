import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AddForm from '../components/Forms/AddForm';
import { AppColors } from '../styles/AppTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';

type TAddProps = NativeStackScreenProps<TAppLayoutProps>;

const Add: React.FC<TAddProps> = ({ navigation }) => {
  return (
    <View style={styles.container} >
      <View style={styles.signUpContainer}>
        <AddForm navigation={navigation} />
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

export default Add;