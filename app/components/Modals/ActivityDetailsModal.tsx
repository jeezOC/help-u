import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme';
import Button from '../Button/Button';
import { useActivities } from '../../hooks/useActivities';


const ActivityDetailsModal = ({ visible, onClose }) => {
  const { selectedActivity } = useActivities()
  // const image = { uri: selectedActivity?.images[0] }
  const image = require('../../../assets/img01.jpg');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {
            false
              ? <ActivityIndicator size="large" color={AppColors.greenSolid} />
              : (<>
                <Text style={styles.modalTitle}>Detalles de la actividad</Text>
                <View style={styles.formContainer}>
                  {/* <Text style={styles.title}>Nombre:</Text>
                  <Text style={styles.text}>{selectedActivity.name}</Text>
                  <Text style={styles.title}>Descripción:</Text>
                  <Text style={styles.text}>{selectedActivity.description}</Text>
                  <Text style={styles.title}>Fecha:</Text>
                  <Text style={styles.text}>{selectedActivity.date}</Text>
                  <Text style={styles.title}>Ubicación:</Text>
                  <Text style={styles.text}>{`${selectedActivity.location.province}, ${selectedActivity.location.canton}, ${selectedActivity.location.district}`}</Text>
                  <Text style={styles.title}>Organización:</Text>
                  <Text style={styles.text}>{selectedActivity.owner}</Text> */}
                </View>
                <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover" />
                <Button onPress={onClose}
                  label='Cerrar' size={'sm'}
                  accent="cancel"
                  style={{
                    width: '60%',
                    marginTop: 15,
                    alignSelf: 'center',
                  }}
                />
              </>)}
        </View>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: AppTextSizes.md,
    fontFamily: AppFonts.bold,
    marginBottom: 10,
    color: AppColors.greenSolid,
  },
  title: {
    fontSize: AppTextSizes.md,
    color: AppColors.greenSolid,
  },
  linkButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
  },
  closeButton: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  image: {
    height: 30,
    width: 30,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBtn: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 45,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: AppFonts.regular,
    paddingHorizontal: 10,
    color: 'gray',
  },
  formContainer: {
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default ActivityDetailsModal;
