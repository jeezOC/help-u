import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsForm from '../components/Forms/SettingsForm';
import { TAppLayoutProps } from '../layouts/AppLayout';

type TSettingsProps = NativeStackScreenProps<TAppLayoutProps>;

const Settings: React.FC<TSettingsProps> = ({ navigation }) => {

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

      }}
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
      {/* <View style={styles.buttonContainer}>
        <Button label='Desconectarse' size='lg'></Button>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: 45,
    width: 40,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  }
});

export default Settings;
