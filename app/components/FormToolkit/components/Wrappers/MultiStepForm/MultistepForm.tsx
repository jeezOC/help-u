import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Formik, FormikProps } from 'formik'
import FormNavigation from './FormNavigation'
import { AppColors, AppTextSizes } from '../../../../../styles/AppTheme'

export interface IMultiStepForm<TValues> {
  children: React.ReactNode
  initialValues: TValues
  onSubmit: (values: TValues) => void
  isSubmitting?: boolean
  externalSstepNumer?: number,
}

const MultiStepForm = <TValues extends {}>({
  children,
  initialValues,
  onSubmit,
  isSubmitting,
  externalSstepNumer
}: IMultiStepForm<TValues>) => {

  const [stepNumber, setStepNumber] = useState(externalSstepNumer ? externalSstepNumer - 1 : 0)
  const [snapshot, setSnapshot] = useState<Partial<TValues>>(initialValues)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stepList = React.Children.toArray(children) as any[]
  const currentStep = stepList[stepNumber]
  const isFinalStep = stepNumber === stepList.length - 1

  const nextStep = (values: Partial<TValues>) => {
    setStepNumber(stepNumber + 1)
    setSnapshot(values)
  }

  const previousStep = (values: Partial<TValues>) => {
    setStepNumber(stepNumber - 1)
    setSnapshot(values)
  }

  const handleSubmit = async (values: Partial<TValues>) => {
    let canContinue = true
    if (currentStep.props.onSubmit) {
      const success = await currentStep.props.onSubmit(values)
      canContinue = success;
    }
    if (canContinue) {
      if (isFinalStep) {
        onSubmit(values as TValues)
      } else {
        nextStep(values)
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Text
          style={{
            fontWeight: '500',
            fontSize: AppTextSizes.lg,
            color: AppColors.notBlack,
            marginVertical: 15,
          }}
        >
          {currentStep?.props?.stepName}
        </Text>
        <Text>
          {stepNumber + 1} / {stepList.length}
        </Text>
      </View>
      <Formik
        initialValues={snapshot}
        validationSchema={currentStep.props.validationSchema}
        onSubmit={handleSubmit}
        margin={0}
        
      >
        {(formikProps: FormikProps<Partial<TValues>>) => (
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            {/* {(formikProps)=> currentStep} */}
            {currentStep}
            <FormNavigation
              isFinalStep={isFinalStep}
              hasPreviousStep={stepNumber > 0}
              goToNextStep={() => handleSubmit(formikProps.values)}
              goToPreviousStep={() => previousStep(formikProps.values)}
              isSubmitting={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default MultiStepForm

export interface IFormStep {
  stepName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: any) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formikProps?: FormikProps<Partial<Record<string, any>>>
}

export const FormStep: React.FC<IFormStep> = ({ children }) => (
  <>{children}</>
)
