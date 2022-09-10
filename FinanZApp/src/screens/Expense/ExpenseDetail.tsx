import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, Pressable, SectionList } from 'react-native';
import CCard from '../../components/shared/CCard';
import { globalStyles } from '../../styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CText from '../../components/shared/CText';
import moment from 'moment';
import { GETEXPENSE } from '../../queries/GetExpense';
import { IGetExpense } from '../../queries/types/IGetExpense';
import AddExpenseTransactionModal from '../../components/modals/Expenses/AddExpenseTransactionModal';
import { DELETEEXPENSETRANSACTION } from '../../queries/mutations/Expenses/DeleteExpenseTransaction';
import { GETEXPENSES } from '../../queries/GetExpenses';
import UpdateExpenseTransactionModal from '../../components/modals/Expenses/UpdateExpenseTransactionModal';
import { Colors1 } from '../../styles/color';
import UpdateExpenseModal from '../../components/modals/Expenses/UpdateExpenseModal';
import CFloatingButton from '../../components/shared/CFloatingButton';
import OptionHeader from '../../components/shared/OptionHeader';
import ShowExpenseByCategoryModal from '../../components/modals/Expenses/ShowExpenseByCategory';
import Spinner from '../../components/shared/Spinner';
import { formatNumber } from '../../helpers/formatNumber';
import { groupExpenseTransactions } from '../../helpers/groupExpenseTransactions';
import { abs } from 'react-native-reanimated';
import DeleteIcon from '../../components/shared/DeleteIcon';
import CButton from '../../components/shared/CButton';
import EmptyList from '../../components/shared/EmptyList';

export default function ExpenseDetails({ route }: any) {
  const { expenseId } = route.params;

  const { data, loading, error } = useQuery<IGetExpense>(GETEXPENSE, {
    variables: { id: expenseId },
    skip: !expenseId,
    //fetchPolicy: 'network-only',
  });

  const [showSeeAdd, setShowSeeAdd] = React.useState(false); //if Modal for add Transaction is Visible
  const [showSeeUpdate, setShowSeeUpdate] = React.useState(false); //if Modal for update Transaction is Visible
  const [showShowUpdateExpense, setShowUpdateExpense] = React.useState(false); //if Modal for update Transaction is Visible
  const [showDetails, setShowDetails] = React.useState(false); //if Modal for Details is Visible
  const [focusItem, setFocusItem] = React.useState<{
    transactionId: string;
    amount: number;
    describtion: string;
    categoryId: string;
    createdAt: string;
  }>();
  const [deleteTrans] = useMutation(DELETEEXPENSETRANSACTION, {
    onError: err => {
      console.log(err.message);
    },
    refetchQueries: [
      GETEXPENSES,
      { query: GETEXPENSE, variables: { id: expenseId } },
    ],
  });
  const showUpdate = (
    id: string,
    amount: number,
    describtion: string,
    categoryId: string,
    createdAt: string,
  ) => {
    setFocusItem({
      transactionId: id,
      amount: amount,
      describtion: describtion,
      categoryId,
      createdAt,
    });
    setShowSeeUpdate(true);
  };
  const clickDeleteTrans = (deleteId: string) => {
    deleteTrans({
      variables: { id: deleteId },
    });
  };

  if (error) {
    console.log(error);
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return <Spinner />;
  }
  const { title, sum, currency, archived, transactions, expenseByCategory } =
    data!.getExpense;

  let groupedSectionDate =
    transactions &&
    transactions.map(tr => {
      return {
        ...tr,
        createdAt: moment(tr.createdAt).format('YYYY-MM-DD'),
      };
    });
  return (
    <View style={globalStyles.container}>
      <CFloatingButton
        onPress={() => {
          setShowSeeAdd(true);
        }}
      />
      <AddExpenseTransactionModal
        expenseId={expenseId}
        toggle={setShowSeeAdd}
        visible={showSeeAdd}
      />
      <UpdateExpenseModal
        visible={showShowUpdateExpense}
        toggle={setShowUpdateExpense}
        id={expenseId}
        title={title}
        currency={currency}
        archived={archived}
      />
      {expenseByCategory && (
        <ShowExpenseByCategoryModal
          visible={showDetails}
          toggle={() => setShowDetails(false)}
          categories={expenseByCategory}
          all={sum}
        />
      )}
      {focusItem && (
        <UpdateExpenseTransactionModal
          visible={showSeeUpdate}
          expenseId={expenseId}
          toggle={() => {
            setShowSeeUpdate(false);
            setFocusItem(undefined);
          }}
          transactionId={focusItem?.transactionId}
          amount={focusItem?.amount}
          describtion={focusItem?.describtion}
          category={focusItem.categoryId}
          createdAt={focusItem?.createdAt}
        />
      )}
      <OptionHeader>
        <View style={{ marginRight: 'auto' }}>
          <CText heading>{title + ':'}</CText>
        </View>
        <Icon
          onPress={() => {
            setShowUpdateExpense(true);
          }}
          name="edit"
          size={20}
          color={Colors1.secondaryText}
        />
      </OptionHeader>
      <TouchableOpacity onPress={() => setShowDetails(true)}>
        <CText heading={true}>{`${formatNumber(sum)} ${currency}`}</CText>
      </TouchableOpacity>
      {data?.getExpense.transactions.length === 0 && (
        <EmptyList
          heading={'No Transactions until now.'}
          subHeading={'Create your first one...'}
          createNew={() => setShowSeeAdd(true)}
        />
      )}
      <SectionList
        sections={groupExpenseTransactions(groupedSectionDate)}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={item => (
          <CText style={{ fontWeight: 'bold', marginTop: 5 }}>
            {moment(item.section.title).format('DD MMM, YY')}
          </CText>
        )}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                showUpdate(
                  item.id,
                  item.amount,
                  item.describtion,
                  item.category?.id ? item.category.id : '',
                  item.createdAt,
                )
              }>
              <CCard>
                <View style={[globalStyles.transCard]}>
                  <CText bold={true}>{item.describtion}</CText>
                  <CText>{`${formatNumber(item.amount)} ${currency}`}</CText>
                  <CText>{moment(item.createdAt).format('DD MMM, YY')}</CText>
                  <DeleteIcon onDelete={() => clickDeleteTrans(item.id)} />
                </View>
              </CCard>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
