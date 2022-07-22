import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../shared/Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import {globalStyles} from '../../../styles/global';
import {useMutation} from '@apollo/client';
import ErrorAlert from '../../shared/ErrorAlert';
import FText from '../../shared/FText';
import {GETEXPENSES} from '../../../queries/GetExpenses';
import {CREATEEXPANSETRANSACTION} from '../../../queries/mutations/Expenses/CreateExpenseTransaction';
import CModal from '../../shared/Modal';
import CategoryDropDown from '../../Expense/CategoryDropDown';
import CTextInput from '../../shared/TextInput';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  expenseId: string;
}
const inputSchema = yup.object({
  describtion: yup.string().min(4).required(),
  amount: yup.number().required(),
  id: yup.string(),
  categoryId: yup.string(),
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
                <CTextInput
                  value={formikProps.values.describtion}
                  onChangeText={formikProps.handleChange('describtion')}
                  placeholder={'what did you spend'}
                  selectTextOnFocus={false}
                  keyboardType={'default'}
                  onBlur={() => formikProps.handleBlur('describtion')}
                />
                {formikProps.errors.describtion &&
                  formikProps.touched.describtion && (
                    <ErrorAlert>
                      {formikProps.touched.describtion &&
                        formikProps.errors.describtion}
                    </ErrorAlert>
                  )}
                <CTextInput
                  value={formikProps.values.amount}
                  onChangeText={formikProps.handleChange('amount')}
                  placeholder={'Add the expense amount'}
                  selectTextOnFocus={false}
                  keyboardType={'numeric'}
                  onBlur={() => formikProps.handleBlur('amount')}
                />

                {formikProps.touched.amount && formikProps.errors.amount && (
                  <ErrorAlert>{formikProps.errors.amount}</ErrorAlert>
                )}
                <CategoryDropDown
                  value={formikProps.values.categoryId}
                  changeValue={formikProps.handleChange('categoryId')}
                />

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
