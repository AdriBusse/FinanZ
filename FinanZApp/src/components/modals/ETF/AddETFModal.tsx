import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import * as yup from 'yup';
import {GETETFDATA} from '../../../queries/GetETFData';
import {CREATEETF} from '../../../queries/mutations/ETF/CreateETF';
import {globalStyles} from '../../../styles/global';
import CustomButton from '../../shared/Button';
import ErrorAlert from '../../shared/ErrorAlert';
import FText from '../../shared/FText';
import CModal from '../../shared/Modal';
import CTextInput from '../../shared/TextInput';

const transSchema = yup.object({
  name: yup.string().required(),
  short: yup.string().required(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddETFModal({visible, toggle}: Props) {
  const [addETF] = useMutation(CREATEETF, {
    refetchQueries: [{query: GETETFDATA}],
  });
  return (
    <CModal size="half" visible={visible} onClose={toggle}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{name: '', short: ''}}
          validationSchema={transSchema}
          onSubmit={values => {
            addETF({
              variables: {
                name: values.name,
                short: values.short.toUpperCase(),
              },
            });
            toggle(false);
          }}>
          {formikProps => {
            return (
              <View style={[globalStyles.container, globalStyles.scroll]}>
                <FText heading={true}>Add a new ETF:</FText>
                <CTextInput
                  placeholder="Name"
                  onChangeText={formikProps.handleChange('name')}
                  value={formikProps.values.name}
                  onBlur={() => formikProps.handleBlur('name')}
                  selectTextOnFocus={false}
                  keyboardType={'default'}
                />

                {formikProps.errors.name && formikProps.touched.name && (
                  <ErrorAlert>{formikProps.errors.name}</ErrorAlert>
                )}
                <CTextInput
                  value={formikProps.values.short}
                  onChangeText={formikProps.handleChange('short')}
                  placeholder={'Short Display Name'}
                  selectTextOnFocus={false}
                  keyboardType={'default'}
                />

                {formikProps.errors.short && formikProps.touched.short && (
                  <ErrorAlert>{formikProps.errors.short}</ErrorAlert>
                )}
                <CustomButton
                  title="ETF Hinzuf??gen"
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

export default AddETFModal;
