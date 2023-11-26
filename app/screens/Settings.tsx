import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsForm from '../components/Forms/SettingsForm';
import { TAppLayoutProps } from '../layouts/AppLayout';

type TSettingsProps = NativeStackScreenProps<TAppLayoutProps>;

const Settings: React.FC<TSettingsProps> = ({ navigation }) => {

  return (
    <View
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/HelpU_Icon.png')}
            onError={(e) => console.log(e)}
            style={styles.image}
          />

          <Text style={styles.title} >
            Información de Usuario
          </Text>
        </View>
      </View>
      <SettingsForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: 45,
    width: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerContainer: {
    justifyContent: 'center',
  },
});

export default Settings;
