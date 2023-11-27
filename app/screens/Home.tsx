import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, ScrollView,} from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import EventCard from '../components/Cards/EventCard';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { useAuth } from '../hooks/useAuth';
import { TNoHeaderLayoutProps } from '../layouts/NoHeaderLayout'

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
      <ScrollView>
        <EventCard 
          activityName='Weler perico'
          dateTime='27/11/2023'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
          image={require('/assets/img.jpg')}
        />
        <EventCard 
          activityName='Tomar waro'
          dateTime='29/11/2023'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
          image={require('/assets/img.jpg')}
        />
        <EventCard 
          activityName='Fumar Mariwanas'
          dateTime='29/11/2023'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
          image={require('/assets/img.jpg')}
        />
        <EventCard 
          activityName='Tomar waro'
          dateTime='29/11/2023'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
          image={require('/assets/img.jpg')}
        />
        <EventCard 
          activityName='Tomar waro'
          dateTime='29/11/2023'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan eros nec arcu congue, vel suscipit nulla ornare. Proin varius sapien ac leo viverra, in fringilla urna eleifend. Suspendisse non mi non quam eleifend vestibulum vitae ac ipsum.'
          image={require('/assets/img.jpg')}
        />
      </ScrollView>
      

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
