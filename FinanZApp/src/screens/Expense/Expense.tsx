import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import ErrorAlert from '../../components/shared/ErrorAlert';
import {GETEXPENSES} from '../../queries/GetExpenses';
import {IGetExpenses} from '../../queries/types/IGetExpenses';
import {DELETEEXPENSE} from '../../queries/mutations/DeleteExpense';
import FlatButton from '../../components/Button';
import {globalStyles} from '../../styles/global';
import Card from '../../components/Card';
import FText from '../../components/shared/FText';
import Icon from 'react-native-vector-icons/Feather';
import {Colors1} from '../../styles/color';
import AddExpenseModal from '../../components/modals/AddExpenseModal';

const Expense = (props: {
  navigation: {navigate: (arg0: string, arg1: {expenseId: any}) => void};
}) => {
  const [visibleModal, setVisibleModal] = React.useState(false); //if Modal for add Depot is Visible

  const {data, loading, error} = useQuery<IGetExpenses>(GETEXPENSES, {
    fetchPolicy: 'network-only',
  });
  const [deleteExpense] = useMutation(DELETEEXPENSE, {
    refetchQueries: [{query: GETEXPENSES}],
  });
  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete a Expense',
      'Are you sure you want delete the Expense? Maybe some Transactions get lost',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteExpense({variables: {id}}),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };
  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={[globalStyles.container]}>
      <AddExpenseModal toggle={setVisibleModal} visible={visibleModal} />
      <FlatButton title="add a Topic" onPress={() => setVisibleModal(true)} />
      <FlatList
        data={data!.getExpenses}
        renderItem={({item}) => {
          //console.log(item.trans);
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ExpenseDetails', {
                  expenseId: item.id,
                })
              }>
              <Card>
                <View style={globalStyles.transCard}>
                  <FText bold={true}>{item.title}</FText>

                  <FText>{`${item.sum} €`}</FText>
                  <Icon
                    onPress={() => handleDelete(item.id)}
                    name="trash"
                    size={20}
                    color={Colors1.secondaryText}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Expense;
