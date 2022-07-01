import React from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FlatButton from '../Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import {globalStyles} from '../../styles/global';
import {useMutation} from '@apollo/client';
import {GETETFDETAIL} from '../../queries/GetETFDetails';
import {CREATEETFSNAPSHOT} from '../../queries/mutations/CreateETFSnapshot';
import FText from '../shared/FText';
import CloseModal from './helper/CloseModal';
import {Colors1} from '../../styles/color';
import ErrorAlert from '../shared/ErrorAlert';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  etfId: string;
}
const inputSchema = yup.object({
  value: yup.number().required(),
  id: yup.string(),
});

function AddETFSnapshotModal({visible, toggle, etfId}: Props) {
  const [addSnapshot] = useMutation(CREATEETFSNAPSHOT, {
    refetchQueries: [{query: GETETFDETAIL, variables: {id: etfId}}],
    onCompleted: dada => {
      console.log(dada);
    },
    onError: err => {
      console.log(err);
    },
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
          <View style={styles.modalContent}>
            <CloseModal closeFunktion={() => toggle(false)} />
            <View style={globalStyles.container}>
              <Formik
                initialValues={{value: '', id: etfId}}
                onSubmit={values => {
                  addSnapshot({
                    variables: {
                      value: parseFloat(values.value),
                      etfId: values.id,
                    },
                  });
                  toggle(false);
                }}
                validationSchema={inputSchema}>
                {formikProps => {
                  return (
                    <View style={[globalStyles.container, globalStyles.scroll]}>
                      <FText heading={true}>Add a Snapshot:</FText>

                      <TextInput
                        style={globalStyles.Input}
                        placeholder="Actual Value"
                        placeholderTextColor={Colors1.secondaryText}
                        onChangeText={formikProps.handleChange('value')}
                        value={formikProps.values.value}
                        onBlur={
                          formikProps.handleBlur(
                            'value',
                          ) /*with out text will show just when press button*/
                        }
                      />
                      {formikProps.touched.value &&
                        formikProps.errors.value && (
                          <ErrorAlert>{formikProps.errors.value}</ErrorAlert>
                        )}
                      <Text style={globalStyles.errorText}></Text>
                      <FlatButton
                        title="add Snapshot"
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

export default AddETFSnapshotModal;
const styles = StyleSheet.create({
  container: {},
  modalContent: {
    flex: 1,
  },
});
