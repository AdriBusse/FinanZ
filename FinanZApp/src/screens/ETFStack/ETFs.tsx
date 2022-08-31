import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import CCard from '../../components/shared/CCard';
import {GETETFDATA} from '../../queries/GetETFData';
import {DELETEETF} from '../../queries/mutations/ETF/DeleteETF';
import {IGetEtfData} from '../../queries/types/IGetETFData';
import {globalStyles} from '../../styles/global';
import AddETFModal from '../../components/modals/ETF/AddETFModal';
import CText from '../../components/shared/CText';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CFloatingButton from '../../components/shared/CFloatingButton';
import DeleteIcon from '../../components/shared/DeleteIcon';
import OptionHeader from '../../components/shared/OptionHeader';

export default function ETFs(props) {
  const {data, error, loading} = useQuery<IGetEtfData>(GETETFDATA);
  const [visibleModal, setVisibleModal] = React.useState(false); //if Modal for add Depot is Visible

  const [deleteDepot] = useMutation(DELETEETF, {
    refetchQueries: [{query: GETETFDATA}],
    fetchPolicy: 'network-only',
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete a Depot',
      'Ae you sure you want delete the Depot? Maybe some Transactions get lost',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteDepot({variables: {id}}),
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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={globalStyles.container}>
      <OptionHeader>
        <View style={{marginRight: 'auto'}}>
          <CText heading>ETFs</CText>
        </View>
      </OptionHeader>

      <AddETFModal toggle={setVisibleModal} visible={visibleModal} />
      <CFloatingButton onPress={() => setVisibleModal(true)} />
      {data!.getETFs.map((etf, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() =>
              props.navigation.navigate('ETFDetails', {item: etf.id})
            }>
            <CCard key={etf.id}>
              <View style={globalStyles.transCard}>
                <CText bold={true}>{etf.name}</CText>
                <CText>{`${etf.worth} €`}</CText>
                <CText>{`${etf.deposited} €`}</CText>

                <DeleteIcon onDelete={() => handleDelete(etf.id)} />
              </View>
            </CCard>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
