import React from 'react';
import {View} from 'react-native';
import CButton from '../../shared/CButton';
import * as yup from 'yup';
import {Formik} from 'formik';
import {globalStyles} from '../../../styles/global';
import {useMutation} from '@apollo/client';
import {CREATEETFTRANSACTION} from '../../../queries/mutations/ETF/CreateETFTransaction';
import {GETETFDETAIL} from '../../../queries/GetETFDetails';
import CText from '../../shared/CText';
import ErrorAlert from '../../shared/ErrorAlert';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';

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
    <CModal size="half" visible={visible} onClose={toggle}>
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
                <CText heading={true}>Add a Transaction:</CText>
                <CTextInput
                  value={formikProps.values.amount}
                  onChangeText={formikProps.handleChange('amount')}
                  placeholder={'Amount of Investment'}
                  selectTextOnFocus={false}
                  keyboardType={'numeric'}
                  onBlur={() => formikProps.handleBlur('amount')}
                />
                {formikProps.touched.amount && formikProps.errors.amount && (
                  <ErrorAlert>{formikProps.errors.amount}</ErrorAlert>
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

export default AddETFTransactionModal;
