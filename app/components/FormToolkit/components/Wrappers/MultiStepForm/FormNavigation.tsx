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
          style={{ width: '25%' }}
          label="Previous"
          variant="solid"
          accent="cancel"
          onPress={goToPreviousStep}
        />
      )}
      {isSubmitting ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : isFinalStep ? (
        <Button
          style={{ width: '25%' }}
          label="Submit"
          variant="solid"
          accent="confirm"
          onPress={goToNextStep}
        />
      ) : (
        <Button
          style={{ width: '25%' }}
          label="Next"
          variant="solid"
          onPress={goToNextStep}
        />
      )}
    </View>
  )
}

export default FormNavigation
