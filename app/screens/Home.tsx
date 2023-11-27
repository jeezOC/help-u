import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, } from 'react-native';
import EventCard from '../components/Cards/EventCard';
import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { TNoHeaderLayoutProps } from '../layouts/NoHeaderLayout'
import { useActivities } from '../hooks/useActivities';
import { AppColors, AppFonts, AppTextSizes } from '../styles/AppTheme';

type TAppRouts = TAppLayoutProps & TNoHeaderLayoutProps;

type THomeProps = NativeStackScreenProps<TAppRouts>;

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const { activities } = useActivities();
  const testImage01 = require('../../assets/img01.jpg');
  const testImage02 = require('../../assets/img02.jpg');
  const testImage03 = require('../../assets/img03.jpg');
  const testImage04 = require('../../assets/img04.jpg');

  return (
    <ScrollView contentContainerStyle={{
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 20,
    }} >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/favicon.png')}
            onError={(e) => console.log(e)}
            style={styles.image}
          />
          <Text style={styles.title} >
            Eventos
          </Text>
        </View>
      </View>
{/*       {activities?.map((activity) => (
        <EventCard
          key={activity.id}
          activityName={activity.name}
          dateTime={activity.date}
          description={activity.description}
          image={testImage01}
        />
      ))
      } */}
      <EventCard
        activityName='Protección de tortugas'
        dateTime='27/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage01}
      />
      <EventCard
        activityName='Comida a inmigrantes'
        dateTime='27/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage02}
      />
      <EventCard
        activityName='Cuido de adultos mayores'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage03}
      />
      <EventCard
        activityName='Limpieza de bosques'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage04}
      />
      <EventCard
        activityName='Protección de tortugas'
        dateTime='27/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage01}
      />
      <EventCard
        activityName='Comida a inmigrantes'
        dateTime='27/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage02}
      />
      <EventCard
        activityName='Cuido de adultos mayores'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage03}
      />
      <EventCard
        activityName='Limpieza de bosques'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare.'
        image={testImage04}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
  }
});

export default Home;
