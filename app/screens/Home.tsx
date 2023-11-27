import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, } from 'react-native';
import EventCard from '../components/Cards/EventCard';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TAppLayoutProps } from '../layouts/AppLayout';
import { TNoHeaderLayoutProps } from '../layouts/NoHeaderLayout'
import { useActivities } from '../hooks/useActivities';
import { AppColors, AppFonts, AppTextSizes } from '../styles/AppTheme';
import HeaderLabel from '../components/HeaderLabel';
import ActivityDetailsModal from '../components/Modals/ActivityDetailsModal';

type TAppRouts = TAppLayoutProps & TNoHeaderLayoutProps;

type THomeProps = NativeStackScreenProps<TAppRouts>;

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const { activities, updateSelectedActivity } = useActivities();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOnpress = (activityId: string) => {
    updateSelectedActivity(activityId)
    toggleModal();
  }

  const testImage01 = require('../../assets/img01.jpg');
  const testImage02 = require('../../assets/img02.jpg');
  const testImage03 = require('../../assets/img03.jpg');
  const testImage04 = require('../../assets/img04.jpg');

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
        <HeaderLabel text="Eventos" />
      </View>
      <ScrollView contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
      }} >
  {/*       {activities?.map((activity) => (
          <EventCard
            key={activity.id}
            activityName={activity.name}
            dateTime={activity.date}
            description={activity.description}
            image={testImage01}
            onPress={() => handleOnpress(activity.id)}
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
          onPress={() => toggleModal()}
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
      <ActivityDetailsModal visible={modalVisible} onClose={toggleModal} />
    </View>
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
