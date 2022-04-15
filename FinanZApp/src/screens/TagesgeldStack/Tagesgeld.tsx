import {useMutation, useQuery} from '@apollo/client';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlatButton from '../../components/Button';
import Card from '../../components/Card';
import AddDepotModal from '../../components/modals/AddDepotModal';
import {useAuth} from '../../hooks/useAuth';
import {GETDEPOTS} from '../../queries/GetDepots';
import {DELETESAVINGDEPOT} from '../../queries/mutations/DeleteDepot';
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
    return (
      <View>
        <Text>Error</Text>
        <Text>{error.message}</Text>
        <FlatButton
          title="retry"
          onPress={() => {
            console.log('retry');

            props.navigation.navigate('Sparen', {item: null});
          }}
        />
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
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
                    <Text style={globalStyles.boldText}>{item.name}</Text>

                    <Text>{item.sum} €</Text>
                    <Icon
                      onPress={() => handleDelete(item.id)}
                      name="trash"
                      size={20}
                      color="#c8cbd6"
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
