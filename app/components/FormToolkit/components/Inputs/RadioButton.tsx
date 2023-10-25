import { useField } from 'formik'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RadioButton as PaperRadioButton } from 'react-native-paper'
import { AppColors } from './../../../../styles/AppTheme'

interface CustomRadioButton {
  name: string
  label: string
  options: { value: string; label: string }[]
  onOptionSelect?: (value: string) => void
}

const RadioButton: React.FC<CustomRadioButton> = ({
  name,
  label,
  options,
  onOptionSelect
}) => {
  const [field, meta, helpers] = useField(name)

  const handleValueChange = (value: string) => {
    helpers.setValue(value)
    if (onOptionSelect) onOptionSelect(value)
  }

  const selectedOption = field.value

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.8}}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.RadioButton}>
        <PaperRadioButton.Group
          onValueChange={(value: string) => {
            handleValueChange(value)
          }}
          value={selectedOption}
        >
          <View style={styles.radioButtonContainer}>
            {options.map((option) => (
              <View style={styles.radioButton} key={option.value}>
                <Text
                  style={{
                    color:
                      selectedOption === option.value
                        ? AppColors.orangeSolid
                        : AppColors.gray
                  }}
                >
                  {option.label}
                </Text>
                <PaperRadioButton
                  value={option.value}
                  color={
                    selectedOption === option.value
                      ? AppColors.orangeSolid
                      : AppColors.gray
                  }
                />
              </View>
            ))}
          </View>
        </PaperRadioButton.Group>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10
  },
  label: {
    flex: 1,
    marginRight: 10,
    color: AppColors.notBlack,
    fontWeight: '500'
  },
  RadioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  }
})

export default RadioButton
