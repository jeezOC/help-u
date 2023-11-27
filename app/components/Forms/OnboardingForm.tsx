import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../FormToolkit/components/Inputs/Input';
import { FieldArray, Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import MultiStepForm, { FormStep } from '../FormToolkit/components/Wrappers/MultiStepForm/MultistepForm';
import { TIdType, TInformation, TOrganizator, TUser, TUserType, TVolunteer } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import informationService from '../../services/informationService';
import userService from '../../services/userService';
import TagsInput from '../Tags/TagsInput';


const OnboardingForm = ({ navigation }) => {

  const [profileTarget, setProfileTarget] = useState<TUserType>('volunteer'); //TODO: ADD SELECT TO TOGGLE BETWEEN PROFILE TYPES
  const [idType, setIdType] = useState<TIdType>(); //TODO: ADD SELECT TO TOGGLE BETWEEN ID TYPES
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user, updateSession } = useAuth();
  const toast = useToast();

  const isOrganizator = profileTarget === 'organizator';
  const isLegal = idType === 'legal';

  const initialInformationValues: Partial<Omit<TInformation, 'id | location'>> =
    user.information
      ? user.information
      : {
        identification: '',
        name: '',
        lastName: '',
        idType: 'legal',
        userType: profileTarget,
        location: {
          details: '',
          canton: '',
          province: '',
          district: '',
        },
        organizator: {
          description: '',
          focusAreas: [],
        },
        volunteer: {
          areasOfInterest: [],
          skills: [],
          biography: '',
        }
      }

  const handleSaveInformation = async (values) => {
    setIsSubmitting(true);

    const information: Partial<TInformation> = {
      id: user.id,
      identification: values.identification,
      name: values.name,
      lastName: values.lastName,
      idType: values.idType,
      userType: profileTarget,
      location: {
        details: values.location.details,
        canton: values.location.canton,
        province: values.location.province,
        district: values.location.district,
      },
    }

    const { success, data: informationSaved, message } = await informationService.create(information as TInformation);
    if (success) {
      const { success, data: userUpdated, message } = await userService.update({ ...user, information: informationSaved, onBoardingStep: 2 });
      if (success) {
        toast({
          type: 'success',
          message,
        })
        await updateSession({ ...userUpdated, information: informationSaved });
      } else {
        toast({
          type: 'error',
          message,
        })
      }
    }
    setIsSubmitting(false);
    return success;
  }

  const handleUpdateInformation = async (values) => {
    setIsSubmitting(true);
    const information: Partial<TInformation> = isOrganizator
      ? { organizator: values.organizator }
      : { volunteer: values.volunteer }
    const { success, data: informationUpdated, message } = await informationService.update({ ...user.information, ...information } as TInformation);
    if (success) {
      const { data: userUpdated, message } = await userService.update({ ...user, onBoardingStep: 3, onBoardingCompleted: true });
      toast({
        type: 'success',
        message,
      })
      await updateSession({ ...userUpdated, information: informationUpdated });
    } else {
      toast({
        type: 'error',
        message,
      })
    }
    setIsSubmitting(false);
    return success;
  }


  const handleFinalSubmit = async (values) => {
    navigation.replace('App');
  }

  let focusAreasIndex = 0;
  let skillsIndex = 0;
  let areasOfInterestIndex = 0;

  return (
    <View style={styles.formContainer} >
      <MultiStepForm
        initialValues={initialInformationValues}
        onSubmit={values => handleFinalSubmit(values)}
        isSubmitting={isSubmitting}
        externalSstepNumer={user ? user.onBoardingStep : undefined}
      >

        <FormStep
          stepName='Información de perfil'
          onSubmit={values => handleSaveInformation(values)}
        >
          <View style={styles.content}>

            <View style={{ justifyContent: 'space-between', marginVertical: 10, gap: 10 }}>
              <Text>¿Qué tipo de perfil quieres crear?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                  label='Voluntario'
                  size='sm'
                  onPress={() => setProfileTarget('volunteer')}
                  variant={profileTarget === 'volunteer' ? 'solid' : 'ghost'}
                />
                <Button
                  label='Organizador'
                  size='sm'
                  onPress={() => setProfileTarget('organizator')}
                  variant={profileTarget === 'organizator' ? 'solid' : 'ghost'}
                />
              </View>
            </View>
            <View>
              <Input
                name='name'
                label='Nombre'
              />
              {!isOrganizator && <Input
                name='lastName'
                label='Apellido'
              />}
              {/* todo add select */}
              <Input
                name='idType'
                label='Tipo de cédula'
              />
              <Input
                name='identification'
                label='Cédula'

              />
              <Input
                name='location.province'
                label='Provincia'
              />
              <Input
                name='location.canton'
                label='Cantón'
              />
              <Input
                name='location.district'
                label='Distrito'
              />
              <Input
                name='location.details'
                label='Detalles'
                multiline
              />
            </View>
          </View>
        </FormStep>
        <FormStep
          stepName={isOrganizator
            ? 'Cuentanos sobre tu organización'
            : 'Cuentanos sobre ti'
          }
          onSubmit={values => handleUpdateInformation(values)}
        >
          <View style={styles.content}>
            {isOrganizator
              ? <>
                <Input
                  name='organizatorDescription'
                  label='Descripción '
                  multiline
                />
                {/* <FieldArray
                  name='organizator.focusAreas'>
                  {({ push, remove, form }) => (
                    <>
                      <Text>Áreas de enfoque</Text>
                      <View >
                        <Input
                          name={`organizator.focusAreas[${focusAreasIndex}]`}
                          label='Área de enfoque'
                        />
                        <Button
                          label='Agregar'
                          onPress={() => { push(''); focusAreasIndex++ }}
                        />
                      </View>
                      {form.values.organizator?.focusAreas?.map((area, index) => (
                        <>
                          <Text key={index}>{area}</Text>
                          <Button
                            label='X'
                            onPress={() => remove(index)}
                          />
                        </>
                      ))}
                      <View>
                      </View>
                    </>
                  )}
                </FieldArray> */}
                <TagsInput name='organizator.focusAreas' label='Áreas de enfoque' />
              </>
              : <>
                {/* <FieldArray
                  name='volunteer.areasOfInterest'>
                  {({ push, remove, form }) => (
                    <>
                      <Text>Áreas de interés</Text>
                      <View >
                        <Input
                          name={`volunteer.areasOfInterest[${areasOfInterestIndex}]`}
                          label='Área de interés'
                        />
                        <Button
                          label='Agregar'
                          onPress={() => { push(''); areasOfInterestIndex++ }}
                        />
                      </View>
                      {form.values.volunteer?.areasOfInterest?.map((area, index) => (
                        <>
                          <Text key={index}>{area}</Text>
                          <Button
                            label='X'
                            onPress={() => remove(index)}
                          />
                        </>
                      ))}
                      <View>
                      </View>
                    </>
                  )}
                </FieldArray>
                <FieldArray
                  name='volunteer.skills'>
                  {({ push, remove, form }) => (
                    <>
                      <Text>Habilidades</Text>
                      <View >
                        <Input
                          name={`volunteer.skills[${skillsIndex}]`}
                          label='Habilidad'
                        />
                        <Button
                          label='Agregar'
                          onPress={() => { push(''); skillsIndex++ }}
                        />
                      </View>
                      {form.values.volunteer?.skills?.map((area, index) => (
                        <>
                          <Text key={index}>{area}</Text>
                          <Button
                            label='X'
                            onPress={() => remove(index)}
                          />
                        </>
                      ))}
                      <View>
                      </View>
                    </>
                  )}
                </FieldArray> */}
                <TagsInput name='volunteer.areasOfInterest' label='Areas de Interés' />
                <TagsInput name='volunteer.skills' label='Habilidades' />
                <Input
                  name='volunteer.biography'
                  label='Biografía'
                  multiline
                />
              </>
            }
          </View>
        </FormStep>
      </MultiStepForm>
    </View >
  );
};
const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    flex: 1,
    flexGrow: 1,
    height: '100%',
    maxWidth: 300,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    width: '100%',
    flex: 1,
    flexGrow: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default OnboardingForm;
