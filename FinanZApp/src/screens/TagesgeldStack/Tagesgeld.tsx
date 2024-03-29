import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, FlatList, Alert } from 'react-native';
import CCard from '../../components/shared/CCard';
import AddDepotModal from '../../components/modals/Savings/AddDepotModal';
import ErrorAlert from '../../components/shared/ErrorAlert';
import CText from '../../components/shared/CText';
import { GETDEPOTS } from '../../queries/GetDepots';
import { DELETESAVINGDEPOT } from '../../queries/mutations/Savings/DeleteSavingDepot';
import { globalStyles } from '../../styles/global';
import CFloatingButton from '../../components/shared/CFloatingButton';
import DeleteIcon from '../../components/shared/DeleteIcon';
import OptionHeader from '../../components/shared/OptionHeader';
import Spinner from '../../components/shared/Spinner';
import { formatNumber } from '../../helpers/formatNumber';
import { IGetDepots } from '../../queries/types/IGetDepots';
import EmptyList from '../../components/shared/EmptyList';
import { IDeleteDepot } from '../../queries/types/mutations/Savings/IDeleteSavingDepot';

export default function Tagesgeld(props: {
  navigation: { navigate: (arg0: string, arg1: { item: any }) => void };
}) {
  const [visibleModal, setVisibleModal] = React.useState(false); //if Modal for add Depot is Visible

  const { data, loading, error } = useQuery<IGetDepots>(GETDEPOTS, {
    fetchPolicy: 'network-only',
  });
  const [deleteDepot] = useMutation<boolean, IDeleteDepot>(DELETESAVINGDEPOT, {
    refetchQueries: [{ query: GETDEPOTS }],
  });
  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete a Depot',
      'Are you sure you want delete the Depot? Maybe some Transactions get lost',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteDepot({ variables: { id } }),
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
    return <Spinner />;
  } else {
    return (
      <View style={[globalStyles.container]}>
        <AddDepotModal toggle={setVisibleModal} visible={visibleModal} />
        <CFloatingButton onPress={() => setVisibleModal(true)} />
        <OptionHeader>
          <View style={{ marginRight: 'auto' }}>
            <CText heading>
              {'Savings: ' +
                formatNumber(
                  data!.getSavingDepots.reduce(
                    (acc, curr) => acc + curr.sum,
                    0,
                  ) || 0,
                ) +
                '€'}
            </CText>
          </View>
        </OptionHeader>
        {data!.getSavingDepots.length < 0 && (
          <EmptyList
            heading={'No Savings created until now.'}
            subHeading={'Start with create your first pocket.'}
            createNew={() => setVisibleModal(true)}
          />
        )}
        <FlatList
          data={data!.getSavingDepots}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('TagesgeldDetails', {
                    item: item.id,
                  })
                }>
                <CCard>
                  <View style={globalStyles.transCard}>
                    <CText bold={true}>{item.name}</CText>

                    <CText>{`${formatNumber(item.sum)} €`}</CText>
                    <DeleteIcon onDelete={() => handleDelete(item.id)} />
                  </View>
                </CCard>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
