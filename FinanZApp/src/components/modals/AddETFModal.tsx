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
import {GETETFDATA} from '../../queries/GetETFData';
import {CREATEETF} from '../../queries/mutations/CreateETF';
import {globalStyles} from '../../styles/global';
import FlatButton from '../Button';
import ErrorAlert from '../shared/ErrorAlert';
import FText from '../shared/FText';

const transSchema = yup.object({
  name: yup.string().required(),
  short: yup.string().required(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddETFModal({visible, toggle}: Props) {
  const [addETF] = useMutation(CREATEETF, {
    refetchQueries: [{query: GETETFDATA}],
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
                  addETF({
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
                      <FText heading={true}>Add a new ETF:</FText>
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
                        placeholder="Short Display Name"
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
                        title="ETF Hinzufügen"
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

export default AddETFModal;
