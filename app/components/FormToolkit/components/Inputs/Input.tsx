import {
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  StyleSheet
} from 'react-native'
import { AppColors, AppFonts } from '../../../../styles/AppTheme'
import { useField } from 'formik'
import { useState } from 'react'

interface IInput {
  name: string
  label: string
  placeholder?: string
  type?: KeyboardTypeOptions | 'password'
  required?: boolean
  disabled?: boolean
  multiline?: boolean
}
const Input = (porps: IInput) => {
  const {
    name,
    label,
    placeholder,
    type = 'default',
    required = false,
    disabled,
    multiline = false
  } = porps
  const [field, meta, helpers] = useField(name)

  const isInvalid = meta.touched && Boolean(meta.error)
  const hasErrors = meta.error
  const isPassword = type === 'password'

  const [isFieldFocused, setIsFieldFocused] = useState(false)

  const handleFocus = () => {
    setIsFieldFocused(true)
  }

  const handleBlur = () => {
    helpers.setTouched(!meta.touched)
    setIsFieldFocused(false)
  }

  const setPassword = (value: string) => {
    helpers.setValue(value)
  }

  return (
    <View style={{ width: '100%', marginBottom: 10 }}>
      <Text style={inputStyles.label}>{label}{required && "*"} </Text>
      <TextInput
        id={name}
        value={field.value || ''}
        onBlur={handleBlur}
        onChangeText={isPassword 
          ? (e) => setPassword(e) 
          : helpers.setValue}
        style={{
          ...(multiline
            ? inputStyles.inputMultiline
            : inputStyles.inputSingleline),
          ...(isFieldFocused && inputStyles.inputFocused),
          ...(isInvalid && inputStyles.inputError)
        }}
        onFocus={handleFocus}
        placeholder={placeholder}
        inputMode={'text'}
        secureTextEntry={isPassword}
        selectionColor={AppColors.orangeSolid}
        {...(multiline && { multiline, numberOfLines: 4 })}
      />
      {isInvalid && hasErrors && <Text>{meta.error}</Text>}
    </View>
  )
}

const inputStyles = StyleSheet.create({
  label: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 1,
    color: AppColors.notBlack,
    fontFamily: AppFonts.regular,
  },
  inputSingleline: {
    width: '100%',
    height: 40,
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    borderColor: AppColors.gray,
    borderWidth: 2,
    backgroundColor: AppColors.white,
    fontFamily: AppFonts.regular,
  },
  inputMultiline: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    padding: 7,
    fontSize: 16,
    backgroundColor: AppColors.white,
    borderColor: AppColors.gray,
    borderWidth: 1.5,
    fontFamily: AppFonts.regular,
  },
  inputFocused: {
    borderColor: AppColors.greenSolid,
    borderWidth: 2,
  },
  inputError: {
    borderColor: AppColors.redSolid,
    borderWidth: 2,
  }
})

export default Input
