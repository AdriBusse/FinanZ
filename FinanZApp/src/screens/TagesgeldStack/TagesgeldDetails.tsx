import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import FlatButton from '../../components/Button';
import Card from '../../components/Card';
import {GETDEPOT} from '../../queries/GetDepot';
import {DELETESAVINGTRANSACTION} from '../../queries/mutations/DeleteTransaction';
import {globalStyles} from '../../styles/global';
import AddSavingTransactionModal from '../../components/modals/AddSavingTransactionModal.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorAlert from '../../components/shared/ErrorAlert';
import FText from '../../components/shared/FText';

export default function TagesgeldDetails({route}: any) {
  const {item: depotId} = route.params;

  const {data, loading, error} = useQuery(GETDEPOT, {
    variables: {id: depotId},
    skip: !depotId,
    fetchPolicy: 'network-only',
  });
  console.log(data);

  const [showSeeAdd, setShowSeeAdd] = React.useState(false); //if Modal for add Transaction is Visible

  const [deleteTrans] = useMutation(DELETESAVINGTRANSACTION, {
    refetchQueries: [GETDEPOT],
  });

  const [opac, setOpac] = React.useState(1);
  const clickDeleteTrans = (deleteId: string) => {
    deleteTrans({
      variables: {id: deleteId},
    });
    setOpac(0.5);
  };

  if (error) {
    console.log(error);
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const {name, short, sum, transactions} = data.getSavingDepot;

  return (
    <View style={globalStyles.container}>
      <AddSavingTransactionModal
        depotId={depotId}
        toggle={setShowSeeAdd}
        visible={showSeeAdd}
      />
      <FText heading={true}>{`Details for ${name} (${short})`}</FText>
      <FText heading={true}>{`${sum} €`}</FText>
      <FlatButton
        title="add Transaction"
        onPress={() => {
          setShowSeeAdd(true);
        }}
      />

      <FlatList
        data={transactions}
        renderItem={({item}) => {
          return (
            <Card>
              <View style={[globalStyles.transCard, {opacity: opac}]}>
                <FText bold={true}>{item.describtion}</FText>
                <FText>{item.amount}</FText>
                <FText>{item.createdAt.substring(0, 10)}</FText>
                <TouchableOpacity onPress={() => clickDeleteTrans(item.id)}>
                  <Icon name="trash" size={20} color="#c8cbd6" />
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
}
