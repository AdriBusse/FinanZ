import {useMutation} from '@apollo/client';
import {Formik} from 'formik';
import React from 'react';
import {
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';
import {GETDEPOTS} from '../../queries/GetDepots';
import {CREATESAVINGDEPOT} from '../../queries/mutations/CreateSavingDepot';
import {globalStyles} from '../../styles/global';
import FlatButton from '../Button';

const transSchema = yup.object({
  name: yup.string().required(),
  short: yup.string().min(1).max(3).required(),
});

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddDepotModal({visible, toggle}: Props) {
  const [addDepot] = useMutation(CREATESAVINGDEPOT, {
    refetchQueries: [{query: GETDEPOTS}],
  });
  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.modalContent}>
          <View style={globalStyles.container}>
            <Formik
              initialValues={{name: '', short: ''}}
              validationSchema={transSchema}
              onSubmit={values => {
                addDepot({
                  variables: {
                    name: values.name,
                    short: values.short.toUpperCase(),
                  },
                });
                toggle(false);
              }}>
              {formikProps => {
                return (
                  <View style={globalStyles.container}>
                    <Text style={globalStyles.heading}>Add a Transaction:</Text>
                    <TextInput
                      style={globalStyles.Input}
                      placeholder="Name"
                      onChangeText={formikProps.handleChange('name')}
                      value={formikProps.values.name}
                      onBlur={
                        formikProps.handleBlur(
                          'name',
                        ) /*with out text will show just when press button*/
                      }
                    />
                    <Text style={globalStyles.errorText}>
                      {
                        formikProps.touched.name &&
                          formikProps.errors
                            .name /*that error just showed when form was selected already*/
                      }
                    </Text>

                    <TextInput
                      style={globalStyles.Input}
                      placeholder="Kürzel 3 Zeichen"
                      onChangeText={formikProps.handleChange('short')}
                      value={formikProps.values.short}
                      onBlur={
                        formikProps.handleBlur(
                          'short',
                        ) /*with out text will show just when press button*/
                      }
                    />
                    <Text style={globalStyles.errorText}>
                      {
                        formikProps.touched.short &&
                          formikProps.errors
                            .short /*that error just showed when form was selected already*/
                      }
                    </Text>
                    <FlatButton
                      title="Depot Hinzufügen"
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                );
              }}
            </Formik>
          </View>

          <FlatButton title="X" onPress={() => toggle(false)} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default AddDepotModal;
