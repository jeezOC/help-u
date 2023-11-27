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
  const testImage = require('../../assets/img.jpg');
  return (
    <ScrollView contentContainerStyle={{
      justifyContent: 'flex-start',
      paddingHorizontal: 25,
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
      {activities?.map((activity) => (
        <EventCard
          key={activity.id}
          activityName={activity.name}
          dateTime={activity.date}
          description={activity.description}
          image={testImage}
        />
      ))
      }
      <EventCard
        activityName='Weler perico'
        dateTime='27/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
        image={testImage}
      />
      <EventCard
        activityName='Tomar waro'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
        image={testImage}
      />
      {/* <EventCard
          activityName='Fumar Mariwanas'
          dateTime='29/11/2023'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
          image={testImage}
        /> */}
      <EventCard
        activityName='Tomar waro'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
        image={testImage}
      />
      <EventCard
        activityName='Tomar waro'
        dateTime='29/11/2023'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
        image={testImage}
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
    marginBottom: 5,
  }
});

export default Home;
