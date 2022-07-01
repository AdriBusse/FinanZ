import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {UPDATEEXPENSETRANSACTION} from '../../../queries/mutations/Expenses/UpdateExpenseTransaction';
import {globalStyles} from '../../../styles/global';
import CustomButton from '../../shared/Button';
import FText from '../../shared/FText';
import CModal from '../../shared/Modal';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  transactionId: String;
  describtion: string;
  amount: number;
}
function UpdateExpenseTransactionModal({
  visible,
  toggle,
  transactionId,
  describtion,
  amount,
}: Props) {
  const [newDesc, setNewDesc] = useState(describtion);
  const [newAmount, setNewAmount] = useState(amount.toString());
  const [updateExpenseTransaction] = useMutation<
    any,
    {transactionId: String; amount: Number; describtion: String}
  >(UPDATEEXPENSETRANSACTION);
  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <FText>Describtion:</FText>
        <TextInput
          selectTextOnFocus
          style={globalStyles.Input}
          value={newDesc}
          onChangeText={setNewDesc}
        />
        <FText>Amount:</FText>
        <TextInput
          keyboardType="number-pad"
          selectTextOnFocus
          style={globalStyles.Input}
          value={newAmount}
          onChangeText={setNewAmount}
        />
      </View>
      <CustomButton
        title="Update"
        onPress={() => {
          updateExpenseTransaction({
            variables: {
              amount: parseFloat(newAmount),
              describtion: newDesc,
              transactionId,
            },
          });
        }}
      />
    </CModal>
  );
}

export default UpdateExpenseTransactionModal;
