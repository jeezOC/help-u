// AccountLinkingModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from '../Icon/Icon';
import { AppColors, AppTextSizes, AppFonts } from '../../styles/AppTheme';
import Button from '../Button/Button';

interface AccountLinkingModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AccountLinkingModal: React.FC<AccountLinkingModalProps> = ({ isVisible, onClose }) => {
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([]);

  // Función para manejar la vinculación de cuentas
  const linkAccount = (provider: string) => {
    // Lógica para vincular la cuenta con el proveedor especificado
    // Aquí deberías agregar la lógica real para vincular cuentas con Google, Facebook, Twitter, etc.
    setLinkedAccounts((prevAccounts) => [...prevAccounts, provider]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Image
                source={require('../../../assets/favicon.png')}
                onError={(e) => console.log(e)}
                style={styles.image}
            />
            <Text style={styles.title}>Vincular Cuentas</Text>
          </View>

          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='google' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Vincular con Google</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='twitter' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Vincular con Twitter</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.leftContent}>
                <Icon iconName='facebook' iconSize={'md'} iconColor='gray' />
                <Text style={styles.text}>Vincular con Facebook</Text>
              </View>
              <Icon iconName='angle-right' iconSize={'md'} iconColor='gray' />
            </TouchableOpacity>
          </View>

          <Button onPress={onClose}
            label='Cerrar' size={'sm'}
            accent="cancel"
            style={{
              width: '60%',
              alignSelf: 'center',
            }}
          />
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
    fontWeight: AppFonts.bold,
    marginBottom: 10,
    color: AppColors.greenSolid,
  },
  title:{
    fontFamily: AppFonts.bold,
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
});

export default AccountLinkingModal;
