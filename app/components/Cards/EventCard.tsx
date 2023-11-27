// CustomActivityComponent.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

interface EventProps {
  activityName: string;
  description: string;
  dateTime: string;
  image: any;
}

const EventCard: React.FC<EventProps> = ({
    activityName,
    description,
    dateTime,
    image,
  }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
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
        paddingHorizontal: 25,
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 8,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius: 15,
        overflow: 'hidden',
    },
    overlay: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width:'100%',
        height:'100%',
        borderRadius: 15,
    },
    activityName: {
        AppTextSizes: 16,
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
