import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AddForm from '../components/Forms/AddForm';
import { AppColors, AppFonts, AppTextSizes } from '../styles/AppTheme';
import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';

type TAddProps = NativeStackScreenProps<TAppLayoutProps>;

const Add: React.FC<TAddProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container} >
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../../assets/favicon.png')}
              onError={(e) => console.log(e)}
              style={styles.image}
            />
            <Text style={styles.title} >
              Creación del evento
            </Text>
          </View>
        </View>
        <View style={styles.addContainer}>
          <AddForm navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: AppColors.background,
  },
  addContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginRight: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: AppTextSizes.lg,
    fontFamily: AppFonts.bold,
    color: AppColors.greenSolid,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 5,
  }
});

export default Add;