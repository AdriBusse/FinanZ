import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {GETEXPENSE} from '../../../queries/GetExpense';
import {UPDATEEXPENSE} from '../../../queries/mutations/Expenses/UpdateExpense';
import {Colors1} from '../../../styles/color';
import {globalStyles} from '../../../styles/global';
import CButton from '../../shared/CButton';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  id: string;
  title: string;
  currency: string;
  archived: boolean;
}
function UpdateExpenseModal({
  visible,
  toggle,
  id,
  title,
  currency,
  archived,
}: Props) {
  const [newTitle, setNewTitle] = useState(title);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [newArchived, setArchived] = useState(archived);
  const [updateExpense] = useMutation<
    any,
    {
      id: String;
      title: String;
      currency: String;
      archived: Boolean;
    }
  >(UPDATEEXPENSE, {
    onError: err => {
      console.log(err);
    },
    refetchQueries: [{query: GETEXPENSE, variables: {id}}],
  });
  return (
    <CModal size="half" visible={visible} onClose={() => toggle(false)}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <View style={style.pB}>
          <CText>Title:</CText>
          <CTextInput
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder={'Title'}
            selectTextOnFocus={false}
            keyboardType={'default'}
          />
        </View>
        <View style={style.pB}>
          <CText>Currency Symbol:</CText>
          <CTextInput
            value={newCurrency}
            onChangeText={setNewCurrency}
            placeholder={'Symbol'}
            selectTextOnFocus={true}
            keyboardType={'default'}
          />
        </View>
        <View style={style.pB}>
          <CText>Archived:</CText>
          <Switch
            trackColor={{false: '#767577', true: Colors1.button}}
            thumbColor={!newArchived ? '#767577' : Colors1.button}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setArchived(!newArchived)}
            value={newArchived}
            style={style.switch}
          />
        </View>
      </View>
      <CButton
        title="Update"
        onPress={() => {
          updateExpense({
            variables: {
              id,
              title: newTitle,
              currency: newCurrency,
              archived: newArchived,
            },
          });
          toggle(false);
        }}
      />
    </CModal>
  );
}
const style = StyleSheet.create({
  switch: {marginRight: 'auto'},
  pB: {
    paddingBottom: 5,
  },
});
export default UpdateExpenseModal;
