import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';

type THomeProps = NativeStackScreenProps<TAppLayoutProps>;

const Home: React.FC<THomeProps> = ({ navigation }) => {
  return (
    <View 
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
      }}
      >Home</Text>
    </View>
  );
};

export default Home;
