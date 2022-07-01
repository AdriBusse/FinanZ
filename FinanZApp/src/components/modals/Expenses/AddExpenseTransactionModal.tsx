import React from 'react';
import {TextInput, View} from 'react-native';
import CustomButton from '../../shared/Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import {globalStyles} from '../../../styles/global';
import {useMutation} from '@apollo/client';
import ErrorAlert from '../../shared/ErrorAlert';
import FText from '../../shared/FText';
import {Colors1} from '../../../styles/color';
import {GETEXPENSES} from '../../../queries/GetExpenses';
import {CREATEEXPANSETRANSACTION} from '../../../queries/mutations/Expenses/CreateExpenseTransaction';
import CModal from '../../shared/Modal';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  expenseId: string;
}
const inputSchema = yup.object({
  describtion: yup.string().min(4).required(),
  amount: yup.number().required(),
  id: yup.string(),
  //categoryId: yup.string(),
});

function AddExpenseTransactionModal({visible, toggle, expenseId}: Props) {
  const [addTransaction] = useMutation(CREATEEXPANSETRANSACTION, {
    refetchQueries: [
      {
        query: GETEXPENSES,
      },
    ],
    onCompleted: dada => {
      console.log(dada);
    },
    onError: err => {
      console.log(err);
    },
  });
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <Formik
          initialValues={{
            describtion: '',
            amount: '',
            expenseId: expenseId,
            categoryId: null,
          }}
          onSubmit={({describtion, amount, categoryId}) => {
            addTransaction({
              variables: {
                expenseId,
                describtion,
                amount: parseFloat(amount),
                categoryId,
              },
            });
            toggle(false);
          }}
          validationSchema={inputSchema}>
          {formikProps => {
            return (
              <View style={globalStyles.container}>
                <FText heading={true}>Add a Transaction:</FText>
                <TextInput
                  style={globalStyles.Input}
                  placeholder="what did you spend"
                  placeholderTextColor={Colors1.secondaryText}
                  onChangeText={formikProps.handleChange('describtion')}
                  value={formikProps.values.describtion}
                  onBlur={
                    formikProps.handleBlur(
                      'describtion',
                    ) /*with out text will show just when press button*/
                  }
                />
                {formikProps.errors.describtion &&
                  formikProps.touched.describtion && (
                    <ErrorAlert>
                      {formikProps.touched.describtion &&
                        formikProps.errors.describtion}
                    </ErrorAlert>
                  )}

                <TextInput
                  style={globalStyles.Input}
                  placeholder="Add the expense amount"
                  placeholderTextColor={Colors1.secondaryText}
                  onChangeText={formikProps.handleChange('amount')}
                  value={formikProps.values.amount}
                  onBlur={
                    formikProps.handleBlur(
                      'amount',
                    ) /*with out text will show just when press button*/
                  }
                />
                {formikProps.touched.amount && formikProps.errors.amount && (
                  <ErrorAlert>{formikProps.errors.amount}</ErrorAlert>
                )}

                <CustomButton
                  title="add Transaction"
                  onPress={formikProps.handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </CModal>
  );
}

export default AddExpenseTransactionModal;
