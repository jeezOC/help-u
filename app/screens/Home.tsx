import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, } from 'react-native';
import EventCard from '../components/Cards/EventCard';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { TNoHeaderLayoutProps } from '../layouts/NoHeaderLayout'
import { useActivities } from '../hooks/useActivities';
import { AppColors } from '../styles/AppTheme';


type TAppRouts = TAppLayoutProps & TNoHeaderLayoutProps;

type THomeProps = NativeStackScreenProps<TAppRouts>;

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const { activities } = useActivities();
  const testImage = require('../../assets/img.jpg');
  return (
    <View
      style={{
        flex: 1,
       
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 25,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'left',
            color: AppColors.notBlack
          }}
        >
          Actividades
        </Text>
      </View>
      <ScrollView contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
      }} >
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
    </View>
  );
};

export default Home;
