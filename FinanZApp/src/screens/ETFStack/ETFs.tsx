import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import Card from '../../components/shared/Card';
import {GETETFDATA} from '../../queries/GetETFData';
import {DELETEETF} from '../../queries/mutations/ETF/DeleteETF';
import {IGetEtfData} from '../../queries/types/IGetETFData';
import Icon from 'react-native-vector-icons/FontAwesome';
import {globalStyles} from '../../styles/global';
import AddETFModal from '../../components/modals/ETF/AddETFModal';
import CustomButton from '../../components/shared/Button';
import FText from '../../components/shared/FText';
import {Colors1} from '../../styles/color';
import ErrorAlert from '../../components/shared/ErrorAlert';

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
      <FText heading={true} type="primary">
        ETFs
      </FText>

      <AddETFModal toggle={setVisibleModal} visible={visibleModal} />
      <CustomButton title="add ETF" onPress={() => setVisibleModal(true)} />
      {data!.getETFs.map((etf, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() =>
              props.navigation.navigate('ETFDetails', {item: etf.id})
            }>
            <Card key={etf.id}>
              <View style={globalStyles.transCard}>
                <FText bold={true}>{etf.name}</FText>
                <FText>{`${etf.worth} €`}</FText>
                <FText>{`${etf.deposited} €`}</FText>
                <Icon
                  onPress={() => handleDelete(etf.id)}
                  name="trash"
                  size={20}
                  color={Colors1.secondaryText}
                />
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
