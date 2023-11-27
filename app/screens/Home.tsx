import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { useAuth } from '../hooks/useAuth';
import { TNoHeaderLayoutProps } from '../layouts/NoHeaderLayout';

type TAppRouts = TAppLayoutProps & TNoHeaderLayoutProps;

type THomeProps = NativeStackScreenProps<TAppRouts>;

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
