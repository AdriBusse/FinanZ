import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {GETETFDETAIL} from '../../queries/GetETFDetails';
import {IGetETFDetails} from '../../queries/types/IGetETFDetails';
import {globalStyles} from '../../styles/global';
import CustomButton from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DELETEETFTRANSACTION} from '../../queries/mutations/ETF/DeleteETFTransaction';
import AddETFTransactionModal from '../../components/modals/ETF/AddETFTransactionModal';
import AddETFSnapshotModal from '../../components/modals/ETF/AddETFSnapshotModal';
import {DELETEETFSNAPSHOT} from '../../queries/mutations/ETF/DeleteETFSnapshot';
import ErrorAlert from '../../components/shared/ErrorAlert';
import FText from '../../components/shared/FText';
import {Colors1} from '../../styles/color';
import moment from 'moment';

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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={globalStyles.container}>
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
      <FText heading={true}>{`ETFDetail for ${data?.getETF.name}`}</FText>
      <View style={styles.buttonRow}>
        <CustomButton
          title={'Add Transaction'}
          onPress={() => setVisibleModalTrans(true)}
        />
        <CustomButton
          title={'Add Snapshot'}
          onPress={() => setVisibleModalSnap(true)}
        />
      </View>
      <View style={styles.marginBottom}>
        <FText heading={true}>{`Transactions: ${
          data!.getETF.deposited
        } €`}</FText>
        {data!.getETF.transactions.map(transaction => {
          return (
            <Card>
              <View style={globalStyles.transCard}>
                <FText>{`${transaction.amount} €`}</FText>
                <FText>
                  {moment(transaction.createdAt).format('DD MMM, YY')}
                </FText>
                <TouchableOpacity
                  onPress={() => {
                    handleTransDelete(transaction.id);
                  }}>
                  <Icon name="trash" size={20} color={Colors1.secondaryText} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </View>
      <View style={styles.marginBottom}>
        <FText heading={true}>{`Snapshots: ${data!.getETF.worth} €`}</FText>
        {data!.getETF.snapshots.map(snapshot => {
          return (
            <Card>
              <View style={globalStyles.transCard}>
                <FText>{`${snapshot.value} €`}</FText>
                <FText>{moment(snapshot.createdAt).format('DD MMM, YY')}</FText>
                <TouchableOpacity
                  onPress={() => {
                    handleSnapDelete(snapshot.id);
                  }}>
                  <Icon name="trash" size={20} color={Colors1.secondaryText} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
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
