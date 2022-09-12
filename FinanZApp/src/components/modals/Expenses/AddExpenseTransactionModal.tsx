import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CButton from '../../shared/CButton';
import * as yup from 'yup';
import { Formik } from 'formik';
import { globalStyles } from '../../../styles/global';
import { useMutation } from '@apollo/client';
import ErrorAlert from '../../shared/ErrorAlert';
import CText from '../../shared/CText';
import { CREATEEXPANSETRANSACTION } from '../../../queries/mutations/Expenses/CreateExpenseTransaction';
import CModal from '../../shared/CModal';
import CategoryDropDown from '../../Expense/CategoryDropDown';
import CTextInput from '../../shared/CTextInput';
import { GETEXPENSE } from '../../../queries/GetExpense';
import DateSelect from '../../shared/DateSelect';
import {
  ICreateExpenseTransaction,
  IReturn,
} from '../../../queries/types/mutations/Expense/ICreateExpenseTransaction';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  expenseId: string;
}
const inputSchema = yup.object({
  describtion: yup.string().min(3).required(),
  amount: yup.number().required(),
  id: yup.string(),
  categoryId: yup.string(),
});

function AddExpenseTransactionModal({ visible, toggle, expenseId }: Props) {
  const [date, setDate] = useState(new Date());

  const [addTransaction] = useMutation<IReturn, ICreateExpenseTransaction>(
    CREATEEXPANSETRANSACTION,
    {
      refetchQueries: [{ query: GETEXPENSE, variables: { id: expenseId } }],
      onError: err => {
        console.log(err.message);
      },
    },
  );

  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <Formik
          initialValues={{
            describtion: '',
            amount: '',
            expenseId: expenseId,
            categoryId: undefined,
          }}
          onSubmit={({ describtion, amount, categoryId }) => {
            addTransaction({
              variables: {
                expenseId,
                describtion,
                amount: parseFloat(amount),
                categoryId,
                date: date.getTime(),
              },
            });
            toggle(false);
          }}
          validationSchema={inputSchema}>
          {formikProps => {
            return (
              <View style={globalStyles.container}>
                <View style={styles.pB}>
                  <CText heading={true}>Add a Transaction:</CText>
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
                </View>
                <View style={styles.pB}>
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
                </View>
                <View style={styles.pB}>
                  <CategoryDropDown
                    value={formikProps.values.categoryId}
                    changeValue={formikProps.handleChange('categoryId')}
                  />
                </View>
                <View style={styles.pB}>
                  <DateSelect setDate={setDate} date={date} />
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
    </CModal>
  );
}
const styles = StyleSheet.create({
  pB: {
    paddingBottom: 5,
  },
});
export default AddExpenseTransactionModal;
