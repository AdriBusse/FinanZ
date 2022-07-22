import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, View} from 'react-native';
import * as yup from 'yup';
import {GETDEPOTS} from '../../../queries/GetDepots';
import {CREATESAVINGDEPOT} from '../../../queries/mutations/Savings/CreateSavingDepot';
import {globalStyles} from '../../../styles/global';
import CustomButton from '../../shared/Button';
import ErrorAlert from '../../shared/ErrorAlert';
import FText from '../../shared/FText';
import CTextInput from '../../shared/TextInput';
import CloseModal from '../helper/CloseModal';

const transSchema = yup.object({
  name: yup.string().required(),
  short: yup.string().min(1).max(3).required(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddDepotModal({visible, toggle}: Props) {
  const [addDepot] = useMutation(CREATESAVINGDEPOT, {
    refetchQueries: [{query: GETDEPOTS}],
  });
  return (
    <Modal
      statusBarTranslucent={true}
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => toggle(false)}>
      <View style={globalStyles.modal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.modalContent}>
            <CloseModal closeFunktion={() => toggle(false)} />
            <View style={[globalStyles.container, globalStyles.scroll]}>
              <Formik
                initialValues={{name: '', short: ''}}
                validationSchema={transSchema}
                onSubmit={values => {
                  addDepot({
                    variables: {
                      name: values.name,
                      short: values.short.toUpperCase(),
                    },
                  });
                  toggle(false);
                }}>
                {formikProps => {
                  return (
                    <View style={globalStyles.container}>
                      <FText heading={true}>Add a new Saving Depot:</FText>
                      <CTextInput
                        value={formikProps.values.name}
                        onChangeText={formikProps.handleChange('name')}
                        placeholder={'Name'}
                        selectTextOnFocus={false}
                        keyboardType={'default'}
                        onBlur={() => formikProps.handleBlur('name')}
                      />
                      {formikProps.errors.name && formikProps.touched.name && (
                        <ErrorAlert>{formikProps.errors.name}</ErrorAlert>
                      )}
                      <CTextInput
                        value={formikProps.values.short}
                        onChangeText={formikProps.handleChange('short')}
                        placeholder={'Kürzel 3 Zeichen'}
                        selectTextOnFocus={false}
                        keyboardType={'default'}
                        onBlur={() => formikProps.handleBlur('short')}
                      />
                      {formikProps.errors.short &&
                        formikProps.touched.short && (
                          <ErrorAlert>{formikProps.errors.short}</ErrorAlert>
                        )}

                      <CustomButton
                        title="Depot Hinzufügen"
                        onPress={formikProps.handleSubmit}
                      />
                    </View>
                  );
                }}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

export default AddDepotModal;
