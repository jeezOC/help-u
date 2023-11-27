// CustomActivityComponent.tsx
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';
import { parseStringToDate } from '../../utils/dateHelpers';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';

interface EventProps {
  activityName: string;
  description: string;
  dateTime: any;
  image?: any;
  onPress?: () => void;
}

const EventCard: React.FC<EventProps> = ({
  activityName,
  description,
  dateTime,
  image,
  onPress,
}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.overlay}>
            <View style={styles.headerCard}>
              <Text style={styles.activityName}>{activityName}</Text>
              <Text style={styles.dateTime}>{parseStringToDate(dateTime)}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /* minHeight: 180,
    minWidth: 200,
    borderRadius: 15,
    overflow: 'hidden',*/
    marginVertical: 8, 
  },
  backgroundImage: {
    minHeight: 180,
    minWidth: 200,
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'blue',
  },
  overlay: {
    minHeight: 180,
    minWidth: 200,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: 200,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  activityName: {
    fontFamily: AppFonts.regular,
    fontSize: AppTextSizes.sm,
    color: AppColors.white,
    paddingTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,

  },
  description: {
    width: '100%',
    fontFamily: AppFonts.ligth,
    fontSize: AppTextSizes.sm,
    color: AppColors.white,
    alignSelf: 'flex-end',
    paddingRight: 30,
    marginVertical: 15,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  dateTime: {
    fontFamily: AppFonts.ligth,
    fontSize: AppTextSizes.sm,
    color: AppColors.white,
    paddingTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,

  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: '10%',
    borderRadius: 10,
  }
});

export default EventCard;
