import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import {
  IExpenseByCategory,
  ITransactions,
} from '../../../queries/types/IGetExpense';
import { globalStyles } from '../../../styles/global';
import CCard from '../../shared/CCard';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors1 } from '../../../styles/color';
import { formatNumber } from '../../../helpers/formatNumber';
import PieChartByCategory from '../../Charts/Expense/PieChartByCategory';
import TransactionsByCategoryModal from './TransactionsByCategoryModal';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  categories: IExpenseByCategory[];
  transactions: ITransactions[];
  all: number;
}
function ShowExpenseByCategoryModal({
  visible,
  toggle,
  categories,
  transactions,
  all,
}: Props) {
  const [showTransactions, setShowTransactions] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState<
    { name: string; sum: number } | undefined
  >();

  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      {currentCategory && (
        <TransactionsByCategoryModal
          visible={showTransactions}
          toggle={() => {
            setShowTransactions(false);
            setCurrentCategory(undefined);
          }}
          transactions={transactions}
          name={currentCategory.name}
          sum={currentCategory.sum}
        />
      )}
      <View style={styles.container}>
        <PieChartByCategory categories={categories} all={all} />
        <FlatList
          data={categories.slice().sort((a, b) => b.amount - a.amount)}
          renderItem={({ item }) => (
            <CCard>
              <Pressable
                onPress={() => {
                  setCurrentCategory({ name: item.name, sum: item.amount });
                  setShowTransactions(true);
                }}>
                <View
                  style={[
                    styles.shadow,
                    { shadowColor: item.color },
                    globalStyles.transCard,
                    styles.list,
                  ]}>
                  <Icon name={item.icon} color={item.color} />
                  <CText>{item.name}</CText>
                  <CText>{formatNumber(item.amount)}</CText>
                </View>
              </Pressable>
            </CCard>
          )}
        />
      </View>
    </CModal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors1.primary,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default ShowExpenseByCategoryModal;
