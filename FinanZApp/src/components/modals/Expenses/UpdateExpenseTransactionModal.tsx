import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UPDATEEXPENSETRANSACTION} from '../../../queries/mutations/Expenses/UpdateExpenseTransaction';
import {globalStyles} from '../../../styles/global';
import CategoryDropDown from '../../Expense/CategoryDropDown';
import CButton from '../../shared/CButton';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';

import {GETEXPENSES} from '../../../queries/GetExpenses';
import {GETEXPENSE} from '../../../queries/GetExpense';
import DateSelect from '../../shared/DateSelect';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  transactionId: String;
  describtion: string;
  amount: number;
  category: string;
  createdAt: string;
  expenseId: string;
}
function UpdateExpenseTransactionModal({
  visible,
  toggle,
  transactionId,
  describtion,
  amount,
  category,
  createdAt,
  expenseId,
}: Props) {
  const [newDesc, setNewDesc] = useState(describtion);
  const [newAmount, setNewAmount] = useState(amount.toString());
  const [newCategory, setNewCategory] = useState(category);
  const [date, setDate] = useState(new Date(createdAt));

  const [updateExpenseTransaction] = useMutation<
    any,
    {
      transactionId: String;
      amount: Number;
      describtion: String;
      categoryId: string;
      date: String;
    }
  >(UPDATEEXPENSETRANSACTION, {
    onError: err => {
      console.log(err.message);
    },
    onCompleted: () => {
      toggle(false);
    },
    refetchQueries: [
      GETEXPENSES,
      {query: GETEXPENSE, variables: {id: expenseId}},
    ],
  });
  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <View style={styles.pB}>
          <CText>Describtion:</CText>
          <CTextInput
            value={newDesc}
            onChangeText={setNewDesc}
            placeholder={'Describtion'}
            selectTextOnFocus={false}
            keyboardType={'default'}
          />
        </View>
        <View style={styles.pB}>
          <CText>Amount:</CText>
          <CTextInput
            value={newAmount}
            onChangeText={setNewAmount}
            placeholder={'Describtion'}
            selectTextOnFocus={true}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.pB}>
          <CText>Category:</CText>
          <CategoryDropDown changeValue={setNewCategory} value={category} />
        </View>
        <View style={styles.pB}>
          <DateSelect setDate={setDate} date={date} />
        </View>
      </View>
      <CButton
        title="Update"
        onPress={() => {
          updateExpenseTransaction({
            variables: {
              amount: parseFloat(newAmount),
              describtion: newDesc,
              categoryId: newCategory,
              transactionId,
              date: date.toISOString(),
            },
          });
        }}
      />
    </CModal>
  );
}

const styles = StyleSheet.create({
  pB: {
    paddingBottom: 5,
  },
});
export default UpdateExpenseTransactionModal;
