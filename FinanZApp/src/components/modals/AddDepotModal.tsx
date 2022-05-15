import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {
  Keyboard,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import {GETDEPOTS} from '../../queries/GetDepots';
import {CREATESAVINGDEPOT} from '../../queries/mutations/CreateSavingDepot';
import {globalStyles} from '../../styles/global';
import FlatButton from '../Button';
import ErrorAlert from '../shared/ErrorAlert';
import FText from '../shared/FText';

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
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => toggle(false)}>
      <View style={globalStyles.modal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.modalContent}>
            <View style={globalStyles.container}>
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
                      <FText heading={true}>Add a Transaction:</FText>
                      <TextInput
                        style={globalStyles.Input}
                        placeholder="Name"
                        placeholderTextColor={'#fdfeff'}
                        onChangeText={formikProps.handleChange('name')}
                        value={formikProps.values.name}
                        onBlur={
                          formikProps.handleBlur(
                            'name',
                          ) /*with out text will show just when press button*/
                        }
                      />
                      {formikProps.errors.name && formikProps.touched.name && (
                        <ErrorAlert>{formikProps.errors.name}</ErrorAlert>
                      )}

                      <TextInput
                        style={globalStyles.Input}
                        placeholder="Kürzel 3 Zeichen"
                        placeholderTextColor={'#fdfeff'}
                        onChangeText={formikProps.handleChange('short')}
                        value={formikProps.values.short}
                        onBlur={
                          formikProps.handleBlur(
                            'short',
                          ) /*with out text will show just when press button*/
                        }
                      />
                      {formikProps.errors.short &&
                        formikProps.touched.short && (
                          <ErrorAlert>{formikProps.errors.short}</ErrorAlert>
                        )}

                      <FlatButton
                        title="Depot Hinzufügen"
                        onPress={formikProps.handleSubmit}
                      />
                    </View>
                  );
                }}
              </Formik>
            </View>

            <FlatButton title="X" onPress={() => toggle(false)} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

export default AddDepotModal;
