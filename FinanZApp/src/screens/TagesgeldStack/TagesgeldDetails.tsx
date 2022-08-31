import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import CCard from '../../components/shared/CCard';
import {GETDEPOT} from '../../queries/GetDepot';
import {DELETESAVINGTRANSACTION} from '../../queries/mutations/Savings/DeleteTransaction';
import {globalStyles} from '../../styles/global';
import AddSavingTransactionModal from '../../components/modals/Savings/AddSavingTransactionModal.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CText from '../../components/shared/CText';
import moment from 'moment';
import CFloatingButton from '../../components/shared/CFloatingButton';
import OptionHeader from '../../components/shared/OptionHeader';
import {Colors1} from '../../styles/color';
import {IGetDepot} from '../../queries/types/IGetDepot';
import UpdateSavingDepotModal from '../../components/modals/Savings/UpdateSavingDepotModal';
import UpdateSavingTransactionModal from '../../components/modals/Savings/UpdateSavingTransactionModal';
import DeleteIcon from '../../components/shared/DeleteIcon';
import Spinner from '../../components/shared/Spinner';
import {formatNumber} from '../../helpers/formatNumber';

export default function TagesgeldDetails({route}: any) {
  const {item: depotId} = route.params;

  const {data, loading, error} = useQuery<IGetDepot>(GETDEPOT, {
    variables: {id: depotId},
    skip: !depotId,
    fetchPolicy: 'network-only',
  });

  const [showSeeAdd, setShowSeeAdd] = React.useState(false); //if Modal for add Transaction is Visible
  const [showSeeUpdateSaving, setShowUpdateSaving] = React.useState(false); //if Modal for update Saving is Visible
  const [showSeeUpdateSavingTransaction, setShowUpdateSavingTransaction] =
    React.useState(false); //if Modal for update Saving is Visible
  const [focusItem, setFocusItem] = React.useState<{
    id: string;
    amount: number;
    date: string;
    describtion: string;
  }>();
  const [deleteTrans] = useMutation(DELETESAVINGTRANSACTION, {
    refetchQueries: [{query: GETDEPOT, variables: {id: depotId}}],
  });

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
    return <Spinner />;
  }
  const {name, sum, transactions} = data!.getSavingDepot;

  return (
    <View style={globalStyles.container}>
      <AddSavingTransactionModal
        depotId={depotId}
        toggle={setShowSeeAdd}
        visible={showSeeAdd}
      />
      {data && (
        <UpdateSavingDepotModal
          visible={showSeeUpdateSaving}
          toggle={() => {
            setShowUpdateSaving(false);
          }}
          id={data?.getSavingDepot.id}
          name={data.getSavingDepot.name}
          short={data.getSavingDepot.short}
        />
      )}
      {focusItem && (
        <UpdateSavingTransactionModal
          visible={showSeeUpdateSavingTransaction}
          toggle={() => {
            setShowUpdateSavingTransaction(false);
            setFocusItem(undefined);
          }}
          transactionId={focusItem.id}
          describtion={focusItem.describtion}
          amount={focusItem.amount}
          createdAt={focusItem.date}
          depotId={depotId}
        />
      )}
      <CFloatingButton
        onPress={() => {
          setShowSeeAdd(true);
        }}
      />
      <OptionHeader>
        <View style={styles.marginRightAuto}>
          <CText heading>{`${name}`}</CText>
        </View>
        <Icon
          onPress={() => {
            setShowUpdateSaving(true);
          }}
          name="edit"
          size={20}
          color={Colors1.secondaryText}
        />
      </OptionHeader>
      <CText heading={true}>{`${formatNumber(sum)} €`}</CText>

      <FlatList
        data={transactions}
        renderItem={({item}) => {
          return (
            <CCard>
              <TouchableOpacity
                onPress={() => {
                  setFocusItem({
                    id: item.id,
                    describtion: item.describtion,
                    amount: item.amount,
                    date: item.createdAt,
                  });
                  setShowUpdateSavingTransaction(true);
                }}>
                <View style={[globalStyles.transCard]}>
                  <CText bold={true}>{item.describtion}</CText>
                  <CText
                    style={{
                      color:
                        item.amount >= 0 ? Colors1.positive : Colors1.negative,
                    }}>{`${formatNumber(item.amount)} €`}</CText>
                  <CText>{moment(item.createdAt).format('DD MMM, YY')}</CText>
                  <DeleteIcon onDelete={() => clickDeleteTrans(item.id)} />
                </View>
              </TouchableOpacity>
            </CCard>
          );
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  marginRightAuto: {
    marginRight: 'auto',
  },
});
