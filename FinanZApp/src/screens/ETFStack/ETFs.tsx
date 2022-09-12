import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { View, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import CCard from '../../components/shared/CCard';
import { DELETEETF } from '../../queries/mutations/ETF/DeleteETF';
import { globalStyles } from '../../styles/global';
import AddETFModal from '../../components/modals/ETF/AddETFModal';
import CText from '../../components/shared/CText';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CFloatingButton from '../../components/shared/CFloatingButton';
import DeleteIcon from '../../components/shared/DeleteIcon';
import OptionHeader from '../../components/shared/OptionHeader';
import { GETETFS } from '../../queries/GetETFs';
import Spinner from '../../components/shared/Spinner';
import { IETF, IGetETFs } from '../../queries/types/IGetETFs';
import { formatNumber } from '../../helpers/formatNumber';
import { Colors1 } from '../../styles/color';
import { IDeleteETF } from '../../queries/types/mutations/ETF/IDeleteETF';

export default function ETFs(props: {
  navigation: { navigate: (arg0: string, arg1: { item: any }) => void };
}) {
  const [visibleModal, setVisibleModal] = React.useState(false); //if Modal for add ETFs is Visible
  const [pw, setPW] = React.useState<number>(0);
  const [worth, setWorth] = React.useState(0);
  const [, setDeposited] = React.useState(0);

  const { data, error, loading } = useQuery<IGetETFs>(GETETFS, {
    onCompleted: res => {
      const worthTmp = parseFloat(
        res.getETFs
          .reduce((acc, curr) => {
            return acc + curr.worth;
          }, 0)
          .toFixed(2),
      );
      setWorth(worthTmp);
      const depTemp = parseFloat(
        res.getETFs
          .reduce((acc, curr) => {
            return acc + curr.deposited;
          }, 0)
          .toFixed(2),
      );
      setDeposited(depTemp);

      const val = (worthTmp * 100) / depTemp - 100;
      setPW(val);
    },
  });

  const [deleteETF] = useMutation<boolean, IDeleteETF>(DELETEETF, {
    refetchQueries: [{ query: GETETFS }],
    fetchPolicy: 'network-only',
    onError: err => {
      console.log(err);
    },
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete thisETF?',
      'Are you sure you want delete this ETF? All Date will get lost',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteETF({ variables: { id } }),
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
    console.log('____Error____');
    console.log(error);
    return <ErrorAlert>{`Error: ${error.message}`}</ErrorAlert>;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <View style={globalStyles.container}>
      <OptionHeader>
        <View style={[styles.info, globalStyles.marginRightAuto]}>
          <CText heading>{`ETFs: ${formatNumber(worth)} €`}</CText>
          {
            <CText
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: pw > 0 ? Colors1.positive : Colors1.negative,
                marginLeft: 10,
              }}>
              {`${pw > 0 ? '+' : ''}${pw.toFixed(2)} %`}
            </CText>
          }
        </View>
      </OptionHeader>

      <AddETFModal toggle={setVisibleModal} visible={visibleModal} />
      <CFloatingButton onPress={() => setVisibleModal(true)} />
      {data!.getETFs.map((etf: IETF, i: number) => {
        return (
          <TouchableOpacity
            key={i + etf.id}
            onPress={() =>
              props.navigation.navigate('ETFDetails', { item: etf.id })
            }>
            <CCard key={etf.id + etf.id}>
              <View style={globalStyles.transCard}>
                <CText bold={true}>{etf.name.substring(0, 15)}</CText>
                <CText bold={true}>{etf.worth.toFixed(2) + ''}</CText>

                <DeleteIcon onDelete={() => handleDelete(etf.id)} />
              </View>
            </CCard>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
