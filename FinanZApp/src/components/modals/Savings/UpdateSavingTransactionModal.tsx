import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStyles} from '../../../styles/global';
import CButton from '../../shared/CButton';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';

import {
  InputType,
  UPDATESAVINGTRANSACTION,
} from '../../../queries/mutations/Savings/UpdateSavingTransaction';
import {GETDEPOTS} from '../../../queries/GetDepots';
import {GETDEPOT} from '../../../queries/GetDepot';
import DateSelect from '../../shared/DateSelect';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  transactionId: string;
  describtion: string;
  amount: number;
  createdAt: string;
  depotId: string;
}
function UpdateSavingTransactionModal({
  visible,
  toggle,
  transactionId,
  describtion,
  amount,
  createdAt,
  depotId,
}: Props) {
  const [newDesc, setNewDesc] = useState(describtion);
  const [newAmount, setNewAmount] = useState(amount.toString());
  const [date, setDate] = useState(new Date(createdAt));

  const [updateSavingTransaction] = useMutation<any, InputType>(
    UPDATESAVINGTRANSACTION,
    {
      onError: err => {
        console.log(err.message);
      },
      onCompleted: () => {
        toggle(false);
      },
      refetchQueries: [GETDEPOTS, {query: GETDEPOT, variables: {id: depotId}}],
    },
  );
  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <View style={{paddingBottom: 5}}>
          <CText>Describtion:</CText>
          <CTextInput
            value={newDesc}
            onChangeText={setNewDesc}
            placeholder={'Describtion'}
            selectTextOnFocus={false}
            keyboardType={'default'}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <CText>Amount:</CText>
          <CTextInput
            value={newAmount}
            onChangeText={setNewAmount}
            placeholder={'Describtion'}
            selectTextOnFocus={true}
            keyboardType={'numeric'}
          />
        </View>
        <View style={{paddingBottom: 5}}>
          <DateSelect setDate={setDate} date={date} />
        </View>
      </View>
      <CButton
        title="Update"
        onPress={() => {
          updateSavingTransaction({
            variables: {
              id: parseFloat(transactionId),
              amount: parseFloat(newAmount),
              describtion: newDesc,
              date: date.toISOString(),
            },
          });
        }}
      />
    </CModal>
  );
}

export default UpdateSavingTransactionModal;
