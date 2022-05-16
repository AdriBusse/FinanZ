import {useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlatButton from '../../components/Button';
import Card from '../../components/Card';
import AddDepotModal from '../../components/modals/AddDepotModal';
import ErrorAlert from '../../components/shared/ErrorAlert';
import FText from '../../components/shared/FText';
import {GETDEPOTS} from '../../queries/GetDepots';
import {DELETESAVINGDEPOT} from '../../queries/mutations/DeleteDepot';
import {Colors1} from '../../styles/color';
import {globalStyles} from '../../styles/global';

export default function Tagesgeld(props: {
  navigation: {navigate: (arg0: string, arg1: {item: any}) => void};
}) {
  const [visibleModal, setVisibleModal] = React.useState(false); //if Modal for add Depot is Visible

  const {data, loading, error} = useQuery(GETDEPOTS, {
    fetchPolicy: 'network-only',
  });
  const [deleteDepot] = useMutation(DELETESAVINGDEPOT, {
    refetchQueries: [{query: GETDEPOTS}],
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
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={[globalStyles.container]}>
        <AddDepotModal toggle={setVisibleModal} visible={visibleModal} />
        <FlatButton title="add Depot" onPress={() => setVisibleModal(true)} />
        <FlatList
          data={data.getSavingDepots}
          renderItem={({item}) => {
            //console.log(item.trans);
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('TagesgeldDetails', {item: item.id})
                }>
                <Card>
                  <View style={globalStyles.transCard}>
                    <FText bold={true}>{item.name}</FText>

                    <FText>{`${item.sum} €`}</FText>
                    <Icon
                      onPress={() => handleDelete(item.id)}
                      name="trash"
                      size={20}
                      color={Colors1.secondaryText}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
