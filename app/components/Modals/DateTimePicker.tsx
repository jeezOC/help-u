import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AppColors, AppFonts } from '../../styles/AppTheme';

const DateTimePickerModal = ({ visible, onClose }) => {

  const [value, setValue] = useState<DateType>(dayjs());

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePicker}>
            <DateTimePicker
              value={value}
              displayFullDays={true}
              locale={'es'}
              onValueChange={(date) => setValue(date)}
              headerButtonColor={AppColors.greenSolid}
              selectedItemColor={AppColors.greenSolid}
              selectedTextStyle={{
                fontFamily: AppFonts.bold,
                color: AppColors.white,
              }}
              todayContainerStyle={{
                borderWidth: 1,
              }}
              mode="datetime"
            />
            <View style={styles.footerContainer}>
              <Text>
                {dayjs(value).locale('es').format('DD, MMMM, YYYY - HH:mm')}
              </Text>
              <Pressable
                onPress={() => {
                  setValue(dayjs());
                }}
                accessibilityRole="button"
                accessibilityLabel="Today"
              >
                <View
                  style={[
                    styles.todayButton,
                    { backgroundColor: AppColors.greenSolid },
                  ]}
                >
                  <Text
                    style={[
                      styles.todayButtonText,
                      { color: AppColors.white },
                    ]}
                  >
                    Hoy
                  </Text>
                </View>
              </Pressable>
            </View>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Agendar"
              style={{width: 95}}
            >
              <View
                style={[
                  styles.todayButton,
                  { backgroundColor: AppColors.orangeSolid },
                ]}
              >
                <Text
                  style={[
                    styles.todayButtonText,
                    { color: AppColors.white },
                  ]}
                >
                  Agendar
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    alignItems: 'center',
  },
  datePicker: {
    width: 330,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  todayButtonText: {
    fontFamily: AppFonts.bold,
  },
});

export default DateTimePickerModal;
