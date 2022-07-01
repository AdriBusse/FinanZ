import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {TextInput, View} from 'react-native';
import * as yup from 'yup';
import {GETEXPENSES} from '../../../queries/GetExpenses';
import {CREATEEXPENSE} from '../../../queries/mutations/Expenses/CreateExpense';
import {Colors1} from '../../../styles/color';
import {globalStyles} from '../../../styles/global';
import CustomButton from '../../shared/Button';
import ErrorAlert from '../../shared/ErrorAlert';
import FText from '../../shared/FText';
import CModal from '../../shared/Modal';

const transSchema = yup.object({
  title: yup.string().required(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddExpenseModal({visible, toggle}: Props) {
  const [addExpense] = useMutation(CREATEEXPENSE, {
    refetchQueries: [{query: GETEXPENSES}],
  });
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <Formik
          initialValues={{title: ''}}
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
                <FText heading={true}>Add a Expense Topic:</FText>
                <TextInput
                  style={globalStyles.Input}
                  placeholder="Name"
                  placeholderTextColor={Colors1.secondaryText}
                  onChangeText={formikProps.handleChange('title')}
                  value={formikProps.values.title}
                  onBlur={
                    formikProps.handleBlur(
                      'title',
                    ) /*with out text will show just when press button*/
                  }
                />
                {formikProps.errors.title && formikProps.touched.title && (
                  <ErrorAlert>{formikProps.errors.title}</ErrorAlert>
                )}

                <CustomButton
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

export default AddExpenseModal;
