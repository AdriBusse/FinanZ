import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../shared/Button';
import * as yup from 'yup';
import {Formik} from 'formik';
import {globalStyles} from '../../../styles/global';
import {useMutation} from '@apollo/client';
import {GETETFDETAIL} from '../../../queries/GetETFDetails';
import {CREATEETFSNAPSHOT} from '../../../queries/mutations/ETF/CreateETFSnapshot';
import FText from '../../shared/FText';
import ErrorAlert from '../../shared/ErrorAlert';
import CModal from '../../shared/Modal';
import CTextInput from '../../shared/TextInput';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  etfId: string;
}
const inputSchema = yup.object({
  value: yup.number().required(),
  id: yup.string(),
});

function AddETFSnapshotModal({visible, toggle, etfId}: Props) {
  const [addSnapshot] = useMutation(CREATEETFSNAPSHOT, {
    refetchQueries: [{query: GETETFDETAIL, variables: {id: etfId}}],
    onCompleted: dada => {
      console.log(dada);
    },
    onError: err => {
      console.log(err);
    },
  });
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{value: '', id: etfId}}
          onSubmit={values => {
            addSnapshot({
              variables: {
                value: parseFloat(values.value),
                etfId: values.id,
              },
            });
            toggle(false);
          }}
          validationSchema={inputSchema}>
          {formikProps => {
            return (
              <View style={[globalStyles.container, globalStyles.scroll]}>
                <FText heading={true}>Add a Snapshot:</FText>
                <CTextInput
                  value={formikProps.values.value}
                  onChangeText={formikProps.handleChange('value')}
                  placeholder={'Actual Value'}
                  selectTextOnFocus={false}
                  keyboardType={'default'}
                  onBlur={() => formikProps.handleBlur('value')}
                />

                {formikProps.touched.value && formikProps.errors.value && (
                  <ErrorAlert>{formikProps.errors.value}</ErrorAlert>
                )}
                <CustomButton
                  title="add Snapshot"
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

export default AddETFSnapshotModal;
