// CustomActivityComponent.tsx
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { AppTextSizes } from '../../styles/AppTheme';

interface EventProps {
  activityName: string;
  description: string;
  dateTime: string;
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
              <Text style={styles.dateTime}>{dateTime}</Text>
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
    minHeight: 180,
    minWidth: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 8,
  },
  backgroundImage: {
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
  },
  overlay: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    borderRadius: 15,
  },
  activityName: {
    fontSize: AppTextSizes.sm,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 10,
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginRight: 30,
    marginVertical: 15,
  },
  dateTime: {
    fontSize: 12,
    color: 'white',
    paddingTop: 10,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
  }
});

export default EventCard;
