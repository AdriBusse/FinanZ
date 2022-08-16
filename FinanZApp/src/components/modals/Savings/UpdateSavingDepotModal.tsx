import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {View} from 'react-native';
import {GETDEPOT} from '../../../queries/GetDepot';
import {
  InputType,
  UPDATESAVINGDEPOT,
} from '../../../queries/mutations/Savings/UpdateSavingDepot';
import {globalStyles} from '../../../styles/global';
import CButton from '../../shared/CButton';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  id: string;
  name: string;
  short: string;
}
function UpdateSavingDepotModal({visible, toggle, id, name, short}: Props) {
  const [newName, setNewName] = useState(name);
  const [newShort, setNewShort] = useState(short);
  const [updateSavingDepot] = useMutation<any, InputType>(UPDATESAVINGDEPOT, {
    onError: err => {
      console.log(err);
    },
    refetchQueries: [{query: GETDEPOT, variables: {id}}],
  });
  return (
    <CModal size="half" visible={visible} onClose={() => toggle(false)}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <View style={{paddingBottom: 5}}>
          <CText>Name:</CText>
          <CTextInput
            value={newName}
            onChangeText={setNewName}
            placeholder={'Name'}
            selectTextOnFocus={false}
            keyboardType={'default'}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <CText>Short:</CText>
          <CTextInput
            value={newShort}
            onChangeText={setNewShort}
            placeholder={'Symbol'}
            selectTextOnFocus={true}
            keyboardType={'default'}
          />
        </View>
      </View>
      <CButton
        title="Update"
        onPress={() => {
          updateSavingDepot({
            variables: {
              id,
              name: newName,
              short: newShort,
            },
          });
          toggle(false);
        }}
      />
    </CModal>
  );
}
export default UpdateSavingDepotModal;
