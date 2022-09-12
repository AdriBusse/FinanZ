import React from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CButton from '../../shared/CButton';
import * as yup from 'yup';
import { Formik } from 'formik';
import { globalStyles } from '../../../styles/global';
import { useMutation } from '@apollo/client';
import { CREATESAVINGTRANSACTION } from '../../../queries/mutations/Savings/CreateSavingTransaction';
import { GETDEPOTS } from '../../../queries/GetDepots';
import ErrorAlert from '../../shared/ErrorAlert';
import CText from '../../shared/CText';
import CloseModal from '../helper/CloseModal';
import CTextInput from '../../shared/CTextInput';
import {
  ICreateSavingTransaction,
  IReturn,
} from '../../../queries/types/mutations/Savings/ICreateSavingTransaction';

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

function AddSavingTransactionModal({ visible, toggle, depotId }: Props) {
  const [addTransaction] = useMutation<IReturn, ICreateSavingTransaction>(
    CREATESAVINGTRANSACTION,
    {
      refetchQueries: [{ query: GETDEPOTS, variables: { id: depotId } }],
      onError: err => {
        console.log(err);
      },
    },
  );
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

            <View style={[globalStyles.container, globalStyles.scroll]}>
              <Formik
                initialValues={{ describtion: '', amount: '', id: depotId }}
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
                      <CText heading={true}>Add a Transaction:</CText>
                      <View style={{ paddingBottom: 5 }}>
                        <CTextInput
                          value={formikProps.values.describtion}
                          onChangeText={formikProps.handleChange('describtion')}
                          placeholder={'for what is this transaction'}
                          selectTextOnFocus={false}
                          keyboardType={'default'}
                          onBlur={() => formikProps.handleBlur('describtion')}
                        />
                      </View>
                      {formikProps.errors.describtion &&
                        formikProps.touched.describtion && (
                          <ErrorAlert>
                            {formikProps.touched.describtion &&
                              formikProps.errors.describtion}
                          </ErrorAlert>
                        )}
                      <View style={{ paddingBottom: 5 }}>
                        <CTextInput
                          value={formikProps.values.amount}
                          onChangeText={formikProps.handleChange('amount')}
                          placeholder={'Add a negativ or positiv Number '}
                          selectTextOnFocus={false}
                          keyboardType={'numeric'}
                          onBlur={() => formikProps.handleBlur('amount')}
                        />
                        {formikProps.touched.amount &&
                          formikProps.errors.amount && (
                            <ErrorAlert>{formikProps.errors.amount}</ErrorAlert>
                          )}
                      </View>
                      <CButton
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

export default AddSavingTransactionModal;
const styles = StyleSheet.create({
  container: {},
  modalContent: {
    flex: 1,
  },
});
