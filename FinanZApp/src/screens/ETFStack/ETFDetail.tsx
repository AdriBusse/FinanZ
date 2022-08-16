import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {GETETFDETAIL} from '../../queries/GetETFDetails';
import {IGetETFDetails} from '../../queries/types/IGetETFDetails';
import {globalStyles} from '../../styles/global';
import CButton from '../../components/shared/CButton';
import CCard from '../../components/shared/CCard';
import {DELETEETFTRANSACTION} from '../../queries/mutations/ETF/DeleteETFTransaction';
import AddETFTransactionModal from '../../components/modals/ETF/AddETFTransactionModal';
import AddETFSnapshotModal from '../../components/modals/ETF/AddETFSnapshotModal';
import {DELETEETFSNAPSHOT} from '../../queries/mutations/ETF/DeleteETFSnapshot';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CText from '../../components/shared/CText';
import moment from 'moment';
import DeleteIcon from '../../components/shared/DeleteIcon';
import OptionHeader from '../../components/shared/OptionHeader';
import Spinner from '../../components/shared/Spinner';

const ETFDetail = ({route}: any) => {
  const {item: etfId} = route.params;
  const {data, loading, error} = useQuery<IGetETFDetails>(GETETFDETAIL, {
    variables: {id: etfId},
    skip: !etfId,
    fetchPolicy: 'network-only',
  });
  const [deleteTrans] = useMutation(DELETEETFTRANSACTION, {
    refetchQueries: [{query: GETETFDETAIL, variables: {id: etfId}}],
    onError: (err: any) => {
      console.log(err);
    },
  });

  const [deleteSnap] = useMutation(DELETEETFSNAPSHOT, {
    refetchQueries: [{query: GETETFDETAIL, variables: {id: etfId}}],
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handleTransDelete = (deleteId: string) => {
    deleteTrans({
      variables: {id: deleteId},
    });
  };
  const handleSnapDelete = (deleteId: string) => {
    deleteSnap({
      variables: {id: deleteId},
    });
  };

  const [visibleModalTrans, setVisibleModalTrans] = React.useState(false); //if Modal for add Depot is Visible
  const [visibleModalSnap, setVisibleModalSnap] = React.useState(false); //if Modal for add Depot is Visible

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <View style={globalStyles.container}>
      <OptionHeader>
        <View style={{marginRight: 'auto'}}>
          <CText heading>{data!.getETF.name}</CText>
        </View>
      </OptionHeader>
      <ScrollView>
        <AddETFTransactionModal
          visible={visibleModalTrans}
          toggle={setVisibleModalTrans}
          etfId={data!.getETF.id}
        />
        <AddETFSnapshotModal
          visible={visibleModalSnap}
          toggle={setVisibleModalSnap}
          etfId={data!.getETF.id}
        />
        <View style={styles.buttonRow}>
          <CButton
            title={'Add Transaction'}
            onPress={() => setVisibleModalTrans(true)}
          />
          <CButton
            title={'Add Snapshot'}
            onPress={() => setVisibleModalSnap(true)}
          />
        </View>
        <View style={styles.marginBottom}>
          <CText heading={true}>{`Transactions: ${
            data!.getETF.deposited
          } €`}</CText>
          {data!.getETF.transactions.map(transaction => {
            return (
              <CCard>
                <View style={globalStyles.transCard}>
                  <CText>{`${transaction.amount} €`}</CText>
                  <CText>
                    {moment(transaction.createdAt).format('DD MMM, YY')}
                  </CText>
                  <TouchableOpacity
                    onPress={() => {
                      handleTransDelete(transaction.id);
                    }}>
                    <DeleteIcon onDelete={() => console.log('handleDelete')} />
                  </TouchableOpacity>
                </View>
              </CCard>
            );
          })}
        </View>
        <View style={styles.marginBottom}>
          <CText heading={true}>{`Snapshots: ${data!.getETF.worth} €`}</CText>
          {data!.getETF.snapshots.map(snapshot => {
            return (
              <CCard>
                <View style={globalStyles.transCard}>
                  <CText>{`${snapshot.value} €`}</CText>
                  <CText>
                    {moment(snapshot.createdAt).format('DD MMM, YY')}
                  </CText>
                  <TouchableOpacity
                    onPress={() => {
                      handleSnapDelete(snapshot.id);
                    }}>
                    <DeleteIcon onDelete={() => console.log('handleDelete')} />
                  </TouchableOpacity>
                </View>
              </CCard>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ETFDetail;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginBottom: {
    marginBottom: 20,
  },
});
