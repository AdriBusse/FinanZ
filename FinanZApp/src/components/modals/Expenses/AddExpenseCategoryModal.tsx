import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import {GETEXPENSECATEGORIES} from '../../../queries/GetExpenseCategories';
import {CREATEEXPANSECATEGORY} from '../../../queries/mutations/Expenses/CreateExpenseCategory';
import {globalStyles} from '../../../styles/global';
import ColorDropDown from '../../DropDown/ColorDropDown';
import IconDropDown from '../../DropDown/IconDropDown';
import CButton from '../../shared/CButton';
import ErrorAlert from '../../shared/ErrorAlert';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';

const transSchema = yup.object({
  name: yup.string().required(),
  icon: yup.string(),
  color: yup.string(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddExpenseCategoryModal({visible, toggle}: Props) {
  const [addExpense] = useMutation(CREATEEXPANSECATEGORY, {
    refetchQueries: [{query: GETEXPENSECATEGORIES}],
  });
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <Formik
          initialValues={{name: '', icon: '', color: ''}}
          validationSchema={transSchema}
          onSubmit={values => {
            addExpense({
              variables: {
                name: values.name,
                icon: values.icon,
                color: values.color,
              },
            });
            toggle(false);
          }}>
          {formikProps => {
            return (
              <View style={globalStyles.container}>
                <View style={styles.pB}>
                  <CText heading={true}>Add a Category:</CText>
                  <CTextInput
                    value={formikProps.values.name}
                    onChangeText={formikProps.handleChange('name')}
                    placeholder={'Name'}
                    selectTextOnFocus={false}
                    keyboardType={'default'}
                    onBlur={() => formikProps.handleBlur('name')}
                  />
                  {formikProps.errors.name && formikProps.touched.name && (
                    <ErrorAlert>{formikProps.errors.name}</ErrorAlert>
                  )}
                </View>
                <View style={styles.pB}>
                  <IconDropDown
                    value={formikProps.values.icon}
                    changeValue={formikProps.handleChange('icon')}
                  />
                </View>
                <View style={styles.pB}>
                  <ColorDropDown
                    value={formikProps.values.icon}
                    changeValue={formikProps.handleChange('color')}
                  />
                </View>
                <CButton
                  title="Add Category"
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
export default AddExpenseCategoryModal;
