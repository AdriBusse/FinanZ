import React from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FlatButton from '../Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import {globalStyles} from '../../styles/global';
import {useMutation} from '@apollo/client';
import {CREATEETFTRANSACTION} from '../../queries/mutations/CreateETFTransaction';
import {GETETFDETAIL} from '../../queries/GetETFDetails';
import FText from '../shared/FText';
import ErrorAlert from '../shared/ErrorAlert';
import CloseModal from './helper/CloseModal';
import {Colors1} from '../../styles/color';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  etfId: string;
}
const inputSchema = yup.object({
  amount: yup.number().required(),
  id: yup.string(),
});

function AddETFTransactionModal({visible, toggle, etfId}: Props) {
  const [addTransaction] = useMutation(CREATEETFTRANSACTION, {
    refetchQueries: [{query: GETETFDETAIL, variables: {id: etfId}}],
    onCompleted: dada => {
      console.log(dada);
    },
    onError: err => {
      console.log('__-Err');

      console.log(err);
    },
  });
  return (
    <Modal
      statusBarTranslucent={true}
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => toggle(false)}>
      <View style={globalStyles.modal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <CloseModal closeFunktion={() => toggle(false)} />
            <View style={globalStyles.container}>
              <Formik
                initialValues={{amount: '', id: etfId}}
                onSubmit={values => {
                  addTransaction({
                    variables: {
                      amount: parseFloat(values.amount),
                      etfId: values.id,
                    },
                  });
                  toggle(false);
                }}
                validationSchema={inputSchema}>
                {formikProps => {
                  return (
                    <View style={[globalStyles.container, globalStyles.scroll]}>
                      <FText heading={true}>Add a Transaction:</FText>

                      <TextInput
                        style={globalStyles.Input}
                        placeholder="Amount of Investment"
                        placeholderTextColor={Colors1.secondaryText}
                        onChangeText={formikProps.handleChange('amount')}
                        value={formikProps.values.amount}
                        onBlur={
                          formikProps.handleBlur(
                            'amount',
                          ) /*with out text will show just when press button*/
                        }
                      />
                      {formikProps.touched.amount &&
                        formikProps.errors.amount && (
                          <ErrorAlert>{formikProps.errors.amount}</ErrorAlert>
                        )}

                      <FlatButton
                        title="add Transaction"
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

export default AddETFTransactionModal;
const styles = StyleSheet.create({
  container: {},
  modalContent: {
    flex: 1,
  },
});
