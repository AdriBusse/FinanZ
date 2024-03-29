import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { GETEXPENSES } from '../../../queries/GetExpenses';
import { CREATEEXPENSE } from '../../../queries/mutations/Expenses/CreateExpense';
import { globalStyles } from '../../../styles/global';
import CButton from '../../shared/CButton';
import ErrorAlert from '../../shared/ErrorAlert';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';
import {
  ICreateExpense,
  IReturn,
} from '../../../queries/types/mutations/Expense/ICreateExpense';

const transSchema = yup.object({
  title: yup.string().required(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddExpenseModal({ visible, toggle }: Props) {
  const [addExpense] = useMutation<IReturn, ICreateExpense>(CREATEEXPENSE, {
    refetchQueries: [{ query: GETEXPENSES }],
  });
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <Formik
          initialValues={{ title: '' }}
          validationSchema={transSchema}
          onSubmit={values => {
            addExpense({
              variables: {
                title: values.title,
              },
            });
            toggle(false);
          }}>
          {formikProps => {
            return (
              <View style={globalStyles.container}>
                <View style={styles.pB}>
                  <CText heading={true}>Add a Expense Topic:</CText>
                  <CTextInput
                    value={formikProps.values.title}
                    onChangeText={formikProps.handleChange('title')}
                    placeholder={'Name'}
                    selectTextOnFocus={false}
                    keyboardType={'default'}
                    onBlur={() => formikProps.handleBlur('title')}
                  />
                  {formikProps.errors.title && formikProps.touched.title && (
                    <ErrorAlert>{formikProps.errors.title}</ErrorAlert>
                  )}
                </View>
                <CButton
                  title="Expense Hinzufügen"
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
export default AddExpenseModal;
