/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import CButton from '../components/shared/CButton';
import NegativePositiveInput from '../components/shared/NegativePositiveInput';
import PositivNegativeSwitch from '../components/shared/PositivNegativeSwitch';
import CTextInput from '../components/shared/CTextInput';
import { Colors1 } from '../styles/color';
import { globalStyles } from '../styles/global';
import { SUMMARY } from '../queries/Summary';
import { ISummary } from '../queries/types/summary';
import CText from '../components/shared/CText';
import CCard from '../components/shared/CCard';
import UpdateExpenseTransactionModal from '../components/modals/Expenses/UpdateExpenseTransactionModal';
import Spinner from '../components/shared/Spinner';

export default function Home(props: {
  navigation: {
    navigate: (
      arg0: string,
      arg1: { screen: string; params: { expenseId: any } } | undefined,
    ) => void;
  };
}) {
  const [focusItem, setFocusItem] = React.useState<{
    transactionId: string;
    amount: number;
    describtion: string;
    categoryId: string;
    createdAt: string;
    expenseId: string;
  }>();
  const [showSeeUpdate, setShowSeeUpdate] = React.useState(false); //if Modal for update Transaction is Visible

  const changeToTagesgeld = () => {
    props.navigation.navigate('Sparen', undefined);
  };
  // changeToTagesgeld();

  const { data, loading, error } = useQuery<ISummary>(SUMMARY, {
    onCompleted: data => {
      console.log('done');
    },
    fetchPolicy: 'network-only',
  });

  const showUpdate = (
    id: string,
    amount: number,
    describtion: string,
    categoryId: string | null,
    createdAt: string,
    expenseId: string,
  ) => {
    setFocusItem({
      transactionId: id,
      amount: amount,
      describtion: describtion,
      categoryId: categoryId || '',
      createdAt,
      expenseId,
    });
    setShowSeeUpdate(true);
  };
  //today spent
  const box1 = () => {
    return (
      <View style={styles.box}>
        <CText bold style={{ fontSize: 20, marginBottom: 7 }}>
          Today Spent
        </CText>
        {data!.summary.todaySpent.length > 0 ? (
          <FlatList
            style={{ height: 150 }}
            data={data!.summary.todaySpent}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setFocusItem({
                    transactionId: item.id,
                    amount: item.amount,
                    describtion: item.describtion,
                    categoryId: item.category?.id || '',
                    createdAt: item.createdAt,
                    expenseId: item.expense.id,
                  });
                  setShowSeeUpdate(true);
                }}>
                <View
                  style={[
                    globalStyles.transCard,
                    {
                      backgroundColor: Colors1.primary,
                      marginVertical: 3,
                      padding: 5,
                      borderRadius: 5,
                    },
                  ]}>
                  <CText>{item.describtion}</CText>
                  <CText>{item.amount + ''}</CText>
                </View>
              </Pressable>
            )}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <CText bold>You have not spent anything today...</CText>
          </View>
        )}
      </View>
    );
  };

  const box2 = () => {
    return (
      <Pressable onPress={() => props.navigation.navigate('Sparen', undefined)}>
        <CText>{`${data?.summary.savingValue.toFixed(2)} €`}</CText>
        <CText bold style={{ color: Colors1.secondaryText }}>
          All Savings
        </CText>
      </Pressable>
    );
  };

  // newest expense
  const box3 = () => {
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate('Expense', {
            screen: 'ExpenseDetails',
            params: { expenseId: data!.summary.latestExpense.id },
          })
        }>
        {data?.summary.latestExpense ? (
          <>
            <CText bold style={{ fontSize: 20, marginBottom: 3 }}>
              {data?.summary.latestExpense.title}
            </CText>
            <CText
              bold
              style={{
                fontSize: 14,
                marginBottom: 7,
                color: Colors1.secondaryText,
              }}>
              Current Expense
            </CText>
            <CButton
              onPress={() => {
                props.navigation.navigate('Expense', {
                  screen: 'ExpenseDetails',
                  params: { expenseId: data!.summary.latestExpense.id },
                });
              }}
              title="Go To"
              outline
            />
          </>
        ) : (
          <CText bold>Not Expenses yet!</CText>
        )}
      </Pressable>
    );
  };

  //etf
  const box4 = () => {
    return (
      <Pressable onPress={() => props.navigation.navigate('ETF', undefined)}>
        <CText bold style={{ fontSize: 20, marginBottom: 7 }}>
          ETFs
        </CText>
        <CText bold>{data!.summary.etfWorth + ' €'}</CText>
        <CText style={{ marginBottom: 7, color: Colors1.secondaryText }}>
          Worth
        </CText>
        <CText
          style={{
            color:
              data!.summary.etfMovement > 0
                ? Colors1.positive
                : Colors1.negative,
          }}>
          {data!.summary.etfMovement + ' %'}
        </CText>
      </Pressable>
    );
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <View>
      {focusItem && (
        <UpdateExpenseTransactionModal
          visible={showSeeUpdate}
          expenseId={focusItem.expenseId}
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
      {data && (
        <ScrollView>
          <CText style={{ fontSize: 24, padding: 5 }} bold>
            {(data.summary.etfWorth + data.summary.savingValue).toFixed(2) +
              ' €'}
          </CText>
          <CText
            style={{
              color: Colors1.secondaryText,
              marginBottom: 10,
              padding: 5,
            }}>
            Overall Worth.
          </CText>
          <View style={styles.wrapper}>
            <View style={styles.left}>
              <View style={styles.box}>{box1()}</View>
              <View style={styles.box}>{box2()}</View>
            </View>
            <View style={styles.right}>
              <View style={styles.box}>{box3()}</View>
              <View style={styles.box}>{box4()}</View>
            </View>
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CText style={{ color: Colors1.secondaryText, marginRight: 5 }}>
                Developed with
              </CText>
              <Icon name="react" color={'#5fd3f3'} />
            </View>
            <CText style={{ color: Colors1.secondaryText }}>
              {'By Adrian Busse © ' + new Date().getFullYear()}
            </CText>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  left: {
    flexGrow: 1,
    width: '50%',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  right: {
    width: '50%',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  box: {
    width: '100%',
    backgroundColor: Colors1.lighter,
    marginBottom: 10,
    padding: 10,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    opacity: 0.8,
  },
  container: {
    flex: 1,
    display: 'flex',
  },
});
