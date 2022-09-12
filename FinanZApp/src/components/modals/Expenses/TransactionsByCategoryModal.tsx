import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import CModal from '../../shared/CModal';
import {
  IExpenseByCategory,
  ITransactions,
} from '../../../queries/types/IGetExpense';
import { Colors1 } from '../../../styles/color';
import { globalStyles } from '../../../styles/global';
import CText from '../../shared/CText';
import CCard from '../../shared/CCard';
import { formatNumber } from '../../../helpers/formatNumber';
import moment from 'moment';
interface Props {
  visible: boolean;
  toggle: CallableFunction;
  transactions: ITransactions[];
  name: string;
  sum: number;
}
const TransactionsByCategoryModal = ({
  visible,
  toggle,
  transactions,
  name,
  sum,
}: Props) => {
  const [actualTrans, setActualTrans] = React.useState<ITransactions[]>([]);
  useEffect(() => {
    if (name === 'default') {
      // sonderfall für default
      setActualTrans(transactions.filter(t => t.category === null));
    } else {
      setActualTrans(transactions.filter(t => t.category?.name === name));
    }
  }, [name]);
  return (
    <CModal
      style={{ backgroundColor: Colors1.primary }}
      size="half"
      visible={visible}
      onClose={toggle}>
      <View style={globalStyles.container}>
        <CText heading>{name}</CText>
        <CText heading>{sum + ''}</CText>
        <FlatList
          data={actualTrans}
          renderItem={({ item }) => (
            <CCard>
              <View style={[globalStyles.transCard]}>
                <CText>{item.describtion}</CText>
                <CText>{item.amount + ''}</CText>
                <CText>{moment(item.createdAt).format('DD MMM')}</CText>
              </View>
            </CCard>
          )}
        />
      </View>
    </CModal>
  );
};

export default TransactionsByCategoryModal;

const styles = StyleSheet.create({});
