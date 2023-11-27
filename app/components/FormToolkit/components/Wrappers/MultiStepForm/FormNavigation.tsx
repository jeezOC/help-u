import { AppColors } from '../../../../../styles/AppTheme'
import Button from '../../../../Button/Button'
import { ActivityIndicator, View } from 'react-native'
interface IFormNavigation {
  hasPreviousStep: boolean
  isFinalStep: boolean
  goToNextStep: () => void
  goToPreviousStep: () => void
  isSubmitting?: boolean
  
}
const FormNavigation = ({
  hasPreviousStep,
  isFinalStep,
  goToPreviousStep,
  goToNextStep,
  isSubmitting
}: IFormNavigation) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: hasPreviousStep ? 'space-between' : 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
        marginBottom: 20
      }}
    >
      {hasPreviousStep && (
        <Button
          style={{ width: '45%' }}
          label="Anterior"
          variant="outline"
          size='sm'
          disabled={isSubmitting}
          onPress={goToPreviousStep}
        />
      )}
      {isFinalStep
        ? (
          <Button
            style={{ width: '45%' }}
            label="Confirmar"
            variant="solid"
            accent="confirm"
            size='sm'
            isLoading={isSubmitting}
            onPress={goToNextStep}
          />
        ) : (
          <Button
            style={{ width: '45%' }}
            label="Siguiente"
            variant="solid"
            size='sm'
            isLoading={isSubmitting}
            onPress={goToNextStep}
          />
        )}
    </View>
  )
}

export default FormNavigation
