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
import {CREATESAVINGTRANSACTION} from '../../queries/mutations/CreateSavingTransaction';
import {GETDEPOTS} from '../../queries/GetDepots';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  depotId: string;
}
const inputSchema = yup.object({
  describtion: yup.string().min(4).required(),
  amount: yup.number().required(),
  id: yup.string(),
});

function AddSavingTransactionModal({visible, toggle, depotId}: Props) {
  const [addTransaction] = useMutation(CREATESAVINGTRANSACTION, {
    refetchQueries: [{query: GETDEPOTS, variables: {id: depotId}}],
    onCompleted: dada => {
      console.log(dada);
    },
    onError: err => {
      console.log(err);
    },
  });
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => toggle(false)}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
          <View style={globalStyles.container}>
            <Formik
              initialValues={{describtion: '', amount: '', id: depotId}}
              onSubmit={values => {
                addTransaction({
                  variables: {
                    describtion: values.describtion,
                    amount: parseFloat(values.amount),
                    depotId: values.id,
                  },
                });
                toggle(false);
              }}
              validationSchema={inputSchema}>
              {formikProps => {
                return (
                  <View style={globalStyles.container}>
                    <Text style={globalStyles.heading}>Add a Transaction:</Text>
                    <TextInput
                      style={globalStyles.Input}
                      placeholder="for what is this transaction"
                      onChangeText={formikProps.handleChange('describtion')}
                      value={formikProps.values.describtion}
                      onBlur={
                        formikProps.handleBlur(
                          'describtion',
                        ) /*with out text will show just when press button*/
                      }
                    />
                    <Text style={globalStyles.errorText}>
                      {
                        formikProps.touched.describtion &&
                          formikProps.errors
                            .describtion /*that error just showed when form was selected already*/
                      }
                    </Text>

                    <TextInput
                      style={globalStyles.Input}
                      placeholder="Add a negativ or positiv Number | use ."
                      onChangeText={formikProps.handleChange('amount')}
                      value={formikProps.values.amount}
                      onBlur={
                        formikProps.handleBlur(
                          'amount',
                        ) /*with out text will show just when press button*/
                      }
                    />
                    <Text style={globalStyles.errorText}>
                      {
                        formikProps.touched.amount &&
                          formikProps.errors
                            .amount /*that error just showed when form was selected already*/
                      }
                    </Text>
                    <FlatButton
                      title="add Transaction"
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                );
              }}
            </Formik>
          </View>
          <FlatButton
            title="X"
            onPress={() => {
              toggle(false);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AddSavingTransactionModal;
const styles = StyleSheet.create({
  container: {},
  modalContent: {
    flex: 1,
  },
});
