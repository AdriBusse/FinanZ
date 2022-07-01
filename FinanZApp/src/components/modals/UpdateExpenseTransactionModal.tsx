import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {
  Keyboard,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {UPDATEEXPENSETRANSACTION} from '../../queries/mutations/UpdateExpenseTransaction';
import {globalStyles} from '../../styles/global';
import FlatButton from '../Button';
import FText from '../shared/FText';
import CloseModal from './helper/CloseModal';

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
    <Modal
      statusBarTranslucent={true}
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => toggle(false)}>
      <View style={globalStyles.modalFull}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={globalStyles.modalContent}>
            <CloseModal closeFunktion={() => toggle(false)} />
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
            <FlatButton
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
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

export default UpdateExpenseTransactionModal;
