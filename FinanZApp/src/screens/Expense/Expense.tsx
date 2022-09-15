import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ErrorAlert from '../../components/shared/ErrorAlert';
import { GETEXPENSES } from '../../queries/GetExpenses';
import { IGetExpenses } from '../../queries/types/IGetExpenses';
import { DELETEEXPENSE } from '../../queries/mutations/Expenses/DeleteExpense';
import { globalStyles } from '../../styles/global';
import CCard from '../../components/shared/CCard';
import CText from '../../components/shared/CText';
import Icon from 'react-native-vector-icons/Feather';
import { Colors1 } from '../../styles/color';
import AddExpenseModal from '../../components/modals/Expenses/AddExpenseModal';
import CFloatingButton from '../../components/shared/CFloatingButton';
import OptionHeader from '../../components/shared/OptionHeader';
import DeleteIcon from '../../components/shared/DeleteIcon';
import Spinner from '../../components/shared/Spinner';
import { formatNumber } from '../../helpers/formatNumber';
import EmptyList from '../../components/shared/EmptyList';
import { IDeleteExpense } from '../../queries/types/mutations/Expense/IDeleteExpense';

const Expense = (props: {
  navigation: { navigate: (arg0: string, arg1: { expenseId: any }) => void };
}) => {
  const [visibleModal, setVisibleModal] = React.useState(false); //if Modal for add Expense is Visible

  const { data, loading, error } = useQuery<IGetExpenses>(GETEXPENSES, {
    fetchPolicy: 'network-only',
  });

  const [deleteExpense] = useMutation<boolean, IDeleteExpense>(DELETEEXPENSE, {
    refetchQueries: [{ query: GETEXPENSES }],
  });
  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete a Expense',
      'Are you sure you want delete the Expense? Maybe some Transactions get lost',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteExpense({ variables: { id } }),
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
    return <Spinner />;
  }

  return (
    <View style={[globalStyles.container]}>
      <AddExpenseModal toggle={setVisibleModal} visible={visibleModal} />
      <CFloatingButton onPress={() => setVisibleModal(true)} />
      <OptionHeader>
        <View style={{ marginRight: 'auto' }}>
          <CText heading>Expenses</CText>
        </View>
        <Icon
          onPress={() =>
            props.navigation.navigate('ArchivedExpenses', {
              expenseId: undefined,
            })
          }
          style={{ marginRight: 15 }}
          name="archive"
          size={20}
          color={Colors1.secondaryText}
        />
        <Icon
          onPress={() =>
            props.navigation.navigate('CategorySettings', {
              expenseId: undefined,
            })
          }
          name="settings"
          size={20}
          color={Colors1.secondaryText}
        />
      </OptionHeader>
      {data?.getExpenses.length === 0 && (
        <EmptyList
          heading={'No Expenses created.'}
          subHeading={'Get started with your first one...'}
          createNew={() => setVisibleModal(true)}
        />
      )}
      <FlatList
        data={data!.getExpenses}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ExpenseDetails', {
                  expenseId: item.id,
                })
              }>
              <CCard styles={globalStyles.shadow}>
                <View style={[globalStyles.transCard]}>
                  <CText bold={true}>{item.title}</CText>

                  <CText>{`${formatNumber(item.sum)} ${item.currency}`}</CText>
                  <DeleteIcon onDelete={() => handleDelete(item.id)} />
                </View>
              </CCard>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Expense;
