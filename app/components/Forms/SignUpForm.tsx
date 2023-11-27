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

const signUpForm = ({ navigation }) => {

  const [profileTarget, setProfileTarget] = useState<TUserType>('volunteer');
  const [idType, setIdType] = useState<TIdType>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user, handleRegister, updateSession } = useAuth();
  const toast = useToast();
  const isOrganizator = profileTarget === 'organizator';
  const isLegal = idType === 'legal';

  const initialUserValues: { password1: string, password2: string } & Partial<Omit<TUser, 'id'>> = {
    email: '',
    userName: '',
    password1: '',
    password2: '',
  }

  const initialInformationValues: Partial<Omit<TInformation, 'id | location'>> = {
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
  const userExists = user ? user?.onBoardingStep <= 2 : false;
  const externalStep = (userExists ? (user?.onBoardingStep - 1) : user?.onBoardingStep) as number;

  const handleSaveUser = async (values) => {
    setIsSubmitting(true);
    if (!values.email || !values.password1 || !values.password2 || !values.userName) {
      toast({
        type: 'warning',
        message: 'Por favor complete todos los campos'
      })
      setIsSubmitting(false);
      return false;
    }
    if (values.password1 !== values.password2) {
      toast({
        type: 'warning',
        message: 'Las contraseñas no coinciden'
      })
      setIsSubmitting(false);
      return false;
    }
    const password = values.password1;
    const { success } = await handleRegister(values.email, password, values.userName);
    setIsSubmitting(false);
    return success;
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
      organizator: undefined,
      volunteer: undefined
    }
    const { success, data: informationSaved, message } = await informationService.create(information as TInformation);
    if (success) {
      const { success, data: userUpdated, message } = await userService.update({ ...user, onBoardingStep: 3 });
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
    const information: Partial<TInformation> = {
      organizator: values.organizator,
      volunteer: values.volunteer,
    }
    const { success, data: informationUpdated, message } = await informationService.update(information as TInformation);
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
    console.log('handleFinalSubmit')
    navigation.replace('App');
  }

  const initialValues = {
    ...initialUserValues,
    // ...(isOrganizator && initialOrganizationValues),
    // ...(!isOrganizator && initialVolunteerValues),
    ...initialInformationValues,
  }
  let focusAreasIndex = 0;

  return (
    <View style={styles.formContainer} >
      <MultiStepForm
        initialValues={initialValues}
        onSubmit={values => handleFinalSubmit(values)}
        isSubmitting={isSubmitting}
        externalSstepNumer={!user ? externalStep : undefined}
      >
        {!userExists && <FormStep
          stepName='Registro de usuario'
          onSubmit={values => handleSaveUser(values)}
        >
          <View style={styles.content}>
            <Input
              name='userName'
              label='Nombre de usuario'
              placeholder='Nombre de usuario'
            />
            <Input
              name='email'
              label='Correo electrónico'
              placeholder='Correo electrónico'
            />
            <Input
              name='password1'
              label='Contraseña'
              placeholder='Contraseña'
              type='password'
            />
            <Input
              name='password2'
              label='Confirmar contraseña'
              placeholder='Confirmar contraseña'
              type='password' />
          </View>
        </FormStep>}
        <FormStep
          stepName='Información de perfil'
          onSubmit={values => handleSaveInformation(values)}
        >
          <View style={styles.content}>

            <View style={{ justifyContent: 'space-between' }}>
              <Text>¿Qué tipo de perfil quieres crear?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                placeholder='Nombre'
              />
              {!isOrganizator && <Input
                name='lastName'
                label='Apellido'
                placeholder='Apellido'
              />}
              {/* todo add select */}
              <Input
                name='idType'
                label='Tipo de cédula'
                placeholder='Tipo de cédula'
              />
              <Input
                name='identification'
                label='Cédula'
                placeholder='Cédula'

              />
              <Input
                name='location.province'
                label='Provincia'
                placeholder='Provincia'
              />
              <Input
                name='location.canton'
                label='Cantón'
                placeholder='Cantón'
              />
              <Input
                name='location.district'
                label='Distrito'
                placeholder='Distrito'
              />
              <Input
                name='location.details'
                label='Detalles'
                placeholder='Detalles'
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
                  placeholder='Descripción '
                  multiline
                />
                <FieldArray
                  name='organizator.focusAreas'>
                  {({ push, remove, form }) => (
                    <>
                      <Text>Áreas de enfoque</Text>
                      <View >
                        <Input
                          name={`organizator.focusAreas[${focusAreasIndex}]`}
                          label='Área de enfoque'
                          placeholder='Área de enfoque'
                        />
                        <Button
                          label='Agregar'
                          onPress={() => { push(''); focusAreasIndex++ }}
                        />
                      </View>
                      {form.values.organizator.focusAreas.map((area, index) => (
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
              </>
              : <>
                <FieldArray
                  name='volunteer.areasOfInterest'>
                  {({ push, remove, form }) => (
                    <>
                      <Text>Áreas de interés</Text>
                      <View >
                        <Input
                          name={`volunteer.areasOfInterest[${focusAreasIndex}]`}
                          label='Área de interés'
                          placeholder='Área de interés'
                        />
                        <Button
                          label='Agregar'
                          onPress={() => { push(''); focusAreasIndex++ }}
                        />
                      </View>
                      {form.values.volunteer.areasOfInterest.map((area, index) => (
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
                          name={`volunteer.skills[${focusAreasIndex}]`}
                          label='Habilidad'
                          placeholder='Habilidad'
                        />
                        <Button
                          label='Agregar'
                          onPress={() => { push(''); focusAreasIndex++ }}
                        />
                      </View>
                      {form.values.volunteer.skills.map((area, index) => (
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
                <Input
                  name='volunteer.biography'
                  label='Biografía'
                  placeholder='Biografía'
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default signUpForm;