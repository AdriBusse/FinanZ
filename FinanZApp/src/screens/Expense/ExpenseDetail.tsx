import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Pressable} from 'react-native';
import FlatButton from '../../components/Button';
import Card from '../../components/Card';
import {globalStyles} from '../../styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorAlert from '../../components/shared/ErrorAlert';
import FText from '../../components/shared/FText';
import moment from 'moment';
import {GETEXPENSE} from '../../queries/GetExpense';
import {IGetExpense} from '../../queries/types/IGetExpense';
import AddExpenseTransactionModal from '../../components/modals/AddExpenseTransactionModal';
import {DELETEEXPENSETRANSACTION} from '../../queries/mutations/DeleteExpenseTransaction';
import {GETEXPENSES} from '../../queries/GetExpenses';
import UpdateExpenseTransactionModal from '../../components/modals/UpdateExpenseTransactionModal';

export default function ExpenseDetails({route}: any) {
  const {expenseId} = route.params;

  const {data, loading, error} = useQuery<IGetExpense>(GETEXPENSE, {
    variables: {id: expenseId},
    skip: !expenseId,
    fetchPolicy: 'network-only',
  });
  console.log(data);

  const [showSeeAdd, setShowSeeAdd] = React.useState(false); //if Modal for add Transaction is Visible
  const [showSeeUpdate, setShowSeeUpdate] = React.useState(false); //if Modal for update Transaction is Visible
  const [focusItem, setFocusItem] = React.useState<{
    transactionId: string;
    amount: number;
    describtion: string;
  }>();
  const [deleteTrans] = useMutation(DELETEEXPENSETRANSACTION, {
    onError: err => {
      console.log(err.message);
    },
    refetchQueries: [
      GETEXPENSES,
      {query: GETEXPENSE, variables: {id: expenseId}},
    ],
  });
  const showUpdate = (id: string, amount: number, describtion: string) => {
    setFocusItem({transactionId: id, amount: amount, describtion: describtion});
    setShowSeeUpdate(true);
  };
  const clickDeleteTrans = (deleteId: string) => {
    deleteTrans({
      variables: {id: deleteId},
    });
  };

  if (error) {
    console.log(error);
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const {title, sum, transactions, ExpenseByCategory} = data!.getExpense;

  return (
    <View style={globalStyles.container}>
      <AddExpenseTransactionModal
        expenseId={expenseId}
        toggle={setShowSeeAdd}
        visible={showSeeAdd}
      />
      {focusItem && (
        <UpdateExpenseTransactionModal
          visible={showSeeUpdate}
          toggle={setShowSeeUpdate}
          transactionId={focusItem?.transactionId}
          amount={focusItem?.amount}
          describtion={focusItem?.describtion}
        />
      )}
      <FText heading={true}>{`Details for ${title}`}</FText>
      <FText heading={true}>{`${sum} €`}</FText>
      <FlatButton
        title="add Transaction"
        onPress={() => {
          setShowSeeAdd(true);
        }}
      />

      <FlatList
        data={transactions}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() =>
                showUpdate(item.id, item.amount, item.describtion)
              }>
              <Card>
                <View style={[globalStyles.transCard]}>
                  <FText bold={true}>{item.describtion}</FText>
                  <FText>{`${item.amount} €`}</FText>
                  <FText>{moment(item.createdAt).format('DD MMM, YY')}</FText>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('id: ' + item.id);

                      clickDeleteTrans(item.id);
                    }}>
                    <Icon name="trash" size={20} color="#c8cbd6" />
                  </TouchableOpacity>
                </View>
              </Card>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
