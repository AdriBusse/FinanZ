import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {View} from 'react-native';
import {UPDATEEXPENSETRANSACTION} from '../../../queries/mutations/Expenses/UpdateExpenseTransaction';
import {globalStyles} from '../../../styles/global';
import CategoryDropDown from '../../Expense/CategoryDropDown';
import CustomButton from '../../shared/Button';
import FText from '../../shared/FText';
import CModal from '../../shared/Modal';
import CTextInput from '../../shared/TextInput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {GETEXPENSES} from '../../../queries/GetExpenses';
import {GETEXPENSE} from '../../../queries/GetExpense';

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
  const [openDate, setOpenDate] = useState(false);

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
      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        onConfirm={d => {
          setOpenDate(false);
          console.log(d);

          setDate(d);
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
      />
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <FText>Describtion:</FText>
        <CTextInput
          value={newDesc}
          onChangeText={setNewDesc}
          placeholder={'Describtion'}
          selectTextOnFocus={false}
          keyboardType={'default'}
        />
        <FText>Amount:</FText>
        <CTextInput
          value={newAmount}
          onChangeText={setNewAmount}
          placeholder={'Describtion'}
          selectTextOnFocus={true}
          keyboardType={'numeric'}
        />

        <FText>Category:</FText>
        <CategoryDropDown changeValue={setNewCategory} value={category} />

        <FText>Created:</FText>
        <CTextInput
          value={moment(date).format('DD MMM, YY')}
          placeholder={'No Date Selected'}
          onFocus={() => setOpenDate(true)}
          onChangeText={() => {}}
          selectTextOnFocus={false}
          keyboardType={'default'}
        />
      </View>
      <CustomButton
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

export default UpdateExpenseTransactionModal;
