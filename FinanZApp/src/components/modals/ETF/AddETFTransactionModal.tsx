import React from 'react';
import { StyleSheet, View } from 'react-native';
import CButton from '../../shared/CButton';
import * as yup from 'yup';
import { Formik } from 'formik';
import { globalStyles } from '../../../styles/global';
import { useMutation } from '@apollo/client';
import { CREATEETFTRANSACTION } from '../../../queries/mutations/ETF/CreateETFTransaction';
import { GETETFDETAIL } from '../../../queries/GetETFDetails';
import CText from '../../shared/CText';
import ErrorAlert from '../../shared/ErrorAlert';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';
import {
  ICreateETFTransaction,
  IReturn,
} from '../../../queries/types/mutations/ETF/ICreateETFTransaction';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  etfId: string;
}
const inputSchema = yup.object({
  invest: yup.number().required(),
  fee: yup.number().required(),
  id: yup.string(),
});

function AddETFTransactionModal({ visible, toggle, etfId }: Props) {
  const [addTransaction] = useMutation<IReturn, ICreateETFTransaction>(
    CREATEETFTRANSACTION,
    {
      refetchQueries: [{ query: GETETFDETAIL, variables: { id: etfId } }],
      onError: err => {
        console.log('__-Err');
        console.log(err);
      },
    },
  );
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{ invest: '', fee: '0', id: etfId }}
          onSubmit={values => {
            addTransaction({
              variables: {
                invest: parseFloat(values.invest),
                fee: parseFloat(values.fee),
                etfId: values.id,
              },
            });
            toggle(false);
          }}
          validationSchema={inputSchema}>
          {formikProps => {
            return (
              <View style={[globalStyles.container, globalStyles.scroll]}>
                <CText heading={true}>Add a Transaction:</CText>
                <CTextInput
                  value={formikProps.values.invest}
                  onChangeText={formikProps.handleChange('invest')}
                  placeholder={'Amount of Investment'}
                  selectTextOnFocus={false}
                  keyboardType={'numeric'}
                  onBlur={() => formikProps.handleBlur('invest')}
                />
                {formikProps.touched.invest && formikProps.errors.invest && (
                  <ErrorAlert>{formikProps.errors.invest}</ErrorAlert>
                )}

                <View style={styles.mBmT}>
                  <CText>Fees:</CText>
                  <CTextInput
                    value={formikProps.values.fee}
                    onChangeText={formikProps.handleChange('fee')}
                    placeholder={'Fee'}
                    selectTextOnFocus={true}
                    keyboardType={'numeric'}
                    onBlur={() => formikProps.handleBlur('fee')}
                  />
                </View>
                {formikProps.touched.fee && formikProps.errors.fee && (
                  <ErrorAlert>{formikProps.errors.fee}</ErrorAlert>
                )}

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
  mBmT: {
    marginBottom: 10,
    marginTop: 10,
  },
});
export default AddETFTransactionModal;
