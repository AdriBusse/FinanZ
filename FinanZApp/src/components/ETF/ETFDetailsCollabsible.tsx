import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETEETFTRANSACTION } from '../../queries/mutations/ETF/DeleteETFTransaction';
import { GETETFDETAIL } from '../../queries/GetETFDetails';
import { Transaction } from '../../queries/types/IGetETFDetails';
import CText from '../shared/CText';
import CCard from '../shared/CCard';
import { globalStyles } from '../../styles/global';
import moment from 'moment';
import DeleteIcon from '../shared/DeleteIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { Colors1 } from '../../styles/color';

interface Props {
  transactions: Transaction[];
  etfId: string;
  deposited: number;
}
const ETFDetailsCollabsible = ({ transactions, etfId }: Props) => {
  const [oTrans, setOTrans] = React.useState(true);

  const [deleteTrans] = useMutation(DELETEETFTRANSACTION, {
    refetchQueries: [{ query: GETETFDETAIL, variables: { id: etfId } }],
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handleTransDelete = (deleteId: string) => {
    deleteTrans({
      variables: { id: deleteId },
    });
  };
  const renderTransactions = () => {
    return (
      <View style={styles.marginBottom}>
        <CCard>
          <View style={globalStyles.transCard}>
            <CText>Invest</CText>
            <CText>Stk.</CText>
            <CText>Worth</CText>
            <CText>Date</CText>
            <View />
          </View>
        </CCard>

        {transactions.map(transaction => {
          return (
            <CCard>
              <View style={globalStyles.transCard}>
                <View style={styles.invest}>
                  <CText bold>{`${transaction.invest}`}</CText>
                  {transaction.fee !== 0 && (
                    <CText style={styles.fees}>{` + ${transaction.fee}`}</CText>
                  )}
                  <CText style={styles.fees} bold>{` €`}</CText>
                </View>
                <CText>{`${transaction.amount}`}</CText>
                <CText>{`${transaction.value}€`}</CText>
                <CText>
                  {moment(transaction.createdAt).format('DD MMM, YY')}
                </CText>
                <TouchableOpacity
                  onPress={() => {
                    handleTransDelete(transaction.id);
                  }}>
                  <DeleteIcon
                    onDelete={() => handleTransDelete(transaction.id)}
                  />
                </TouchableOpacity>
              </View>
            </CCard>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOTrans(!oTrans)}
        style={styles.trigger}>
        <Icon
          name={oTrans ? 'chevron-down' : 'chevron-up'}
          size={18}
          style={styles.m5}
        />
        <CText style={styles.size18}>Transactions</CText>
      </TouchableOpacity>
      <Collapsible collapsed={oTrans}>{renderTransactions()}</Collapsible>
    </View>
  );
};

export default ETFDetailsCollabsible;

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 20,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  fees: {
    color: Colors1.secondaryText,
    fontSize: 12,
  },
  invest: { flexDirection: 'row', alignItems: 'center' },
  size18: { fontSize: 18 },
  m5: { margin: 5 },
});
