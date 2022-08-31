import { FlatList, ListView, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GETETFDETAIL } from '../../queries/GetETFDetails';
import { IGetETFDetails } from '../../queries/types/IGetETFDetails';
import { globalStyles } from '../../styles/global';
import CButton from '../../components/shared/CButton';
import AddETFTransactionModal from '../../components/modals/ETF/AddETFTransactionModal';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CText from '../../components/shared/CText';
import OptionHeader from '../../components/shared/OptionHeader';
import Spinner from '../../components/shared/Spinner';
import ETFDetailsCollabsible from '../../components/ETF/ETFDetailsCollabsible';
import { Colors1 } from '../../styles/color';
import ETFLineChart from '../../components/Charts/ETF/ETFLineChart';
import { CREATEETFTRANSACTION } from '../../queries/mutations/ETF/CreateETFTransaction';

const ETFDetail = ({ route }: any) => {
  const [pw, setPW] = React.useState(0);
  const [totalInvest, setTotalInvest] = React.useState(0);
  const { item: etfId } = route.params;
  const { data, loading, error } = useQuery<IGetETFDetails>(GETETFDETAIL, {
    variables: { id: etfId },
    skip: !etfId,
    fetchPolicy: 'network-only',
    onCompleted: res => {
      const { worth, deposited } = res.getETF;
      const val = (worth * 100) / deposited - 100;
      setPW(val || 0);
      const tmp = res.getETF.transactions.reduce((cur, acc) => {
        return cur + acc.fee + acc.invest;
      }, 0);
      setTotalInvest(tmp);
    },
  });

  const [createSnapshot, { loading: snapLoading }] = useMutation(
    CREATEETFTRANSACTION,
    {
      refetchQueries: [{ query: GETETFDETAIL, variables: { id: etfId } }],
    },
  );

  const [visibleModalTrans, setVisibleModalTrans] = React.useState(false); //if Modal for add Depot is Visible

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <OptionHeader>
          <View style={globalStyles.marginRightAuto}>
            <CText heading>{data!.getETF.name}</CText>
            <View style={styles.info}>
              <CText style={styles.desc}>{'Worth: '}</CText>
              <CText bold style={styles.size18}>{`${
                data!.getETF.worth
              } €`}</CText>
              <CText
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: pw > 0 ? Colors1.positive : Colors1.negative,
                  marginLeft: 10,
                }}>
                {`${pw > 0 ? '+' : ''}${pw.toFixed(2)} %`}
              </CText>
            </View>
            <View style={styles.info}>
              <CText style={styles.desc}>{'Invest: '}</CText>
              <CText bold style={styles.size18}>{`${totalInvest} €`}</CText>
            </View>
          </View>
        </OptionHeader>

        <AddETFTransactionModal
          visible={visibleModalTrans}
          toggle={setVisibleModalTrans}
          etfId={data!.getETF.id}
        />
        <View style={styles.buttonRow}>
          <CButton
            title={'Add Transaction'}
            onPress={() => setVisibleModalTrans(true)}
          />
          <CButton
            title={snapLoading ? 'Loading...' : 'Add Snapshot'}
            onPress={() =>
              createSnapshot({
                variables: { etfId: data!.getETF.id },
                onError: err => console.log(err.message),
              })
            }
          />
        </View>
        {data && (
          <ETFLineChart
            transactions={data.getETF.transactions.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )}
          />
        )}
        <ETFDetailsCollabsible
          transactions={data!.getETF.transactions}
          etfId={data!.getETF.id}
          deposited={data!.getETF.deposited}
        />
      </ScrollView>
    </View>
  );
};

export default ETFDetail;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 20,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  size18: {
    fontSize: 18,
  },
  desc: { color: Colors1.secondaryText, fontSize: 18 },
});
