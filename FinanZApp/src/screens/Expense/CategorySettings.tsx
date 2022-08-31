import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GETEXPENSECATEGORIES } from '../../queries/GetExpenseCategories';
import ErrorAlert from '../../components/shared/ErrorAlert';
import { IGetExpenseCategories } from '../../queries/types/IGetExpenseCategories';
import CCard from '../../components/shared/CCard';
import { globalStyles } from '../../styles/global';
import CText from '../../components/shared/CText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors1 } from '../../styles/color';
import { DELETEEXPENSECATEGORY } from '../../queries/mutations/Expenses/DeleteExpenseCategory';
import AddExpenseCategoryModal from '../../components/modals/Expenses/AddExpenseCategoryModal';
import UpdateExpenseCategoryModal from '../../components/modals/Expenses/UpdateExpenseCategoryModal';
import CFloatingButton from '../../components/shared/CFloatingButton';
import DeleteIcon from '../../components/shared/DeleteIcon';
import OptionHeader from '../../components/shared/OptionHeader';
import Spinner from '../../components/shared/Spinner';

const CategorySettings = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const { data, error, loading } =
    useQuery<IGetExpenseCategories>(GETEXPENSECATEGORIES);
  const [focusItem, setFocusItem] = React.useState<{
    id: string;
    icon: string;
    color: string;
    name: string;
  }>();
  const [deleteCategory] = useMutation(DELETEEXPENSECATEGORY, {
    refetchQueries: [GETEXPENSECATEGORIES],
    onError: err => {
      console.log(err);
    },
  });
  const showUpdateModal = (
    id: string,
    icon: string,
    color: string,
    name: string,
  ) => {
    setFocusItem({ id, icon, color, name });
    setShowUpdate(true);
  };
  function handleDelete(id: string): void {
    Alert.alert(
      'Delete this Category',
      'Are you sure you want delete this Category? ',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteCategory({ variables: { id } }),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  }
  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <View style={globalStyles.container}>
      <OptionHeader>
        <View style={{ marginRight: 'auto' }}>
          <CText heading>Settings</CText>
        </View>
      </OptionHeader>
      <CFloatingButton onPress={() => setShowAdd(true)} />

      {focusItem && (
        <UpdateExpenseCategoryModal
          visible={showUpdate}
          toggle={() => {
            setShowUpdate(false);
            setFocusItem(undefined);
          }}
          catId={focusItem.id}
          name={focusItem.name}
          icon={focusItem.icon}
          color={focusItem.color}
        />
      )}
      <AddExpenseCategoryModal
        visible={showAdd}
        toggle={() => setShowAdd(false)}
      />
      {data && (
        <FlatList
          data={data.getExpenseCategories}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  showUpdateModal(item.id, item.icon, item.color, item.name)
                }>
                <CCard>
                  <View style={globalStyles.transCard}>
                    <View style={{ flexDirection: 'row' }}>
                      <FontAwesome5
                        name={item.icon}
                        size={18}
                        color={Colors1.primaryText}
                        style={{ marginRight: 10 }}
                      />

                      <CText bold={true}>{item.name}</CText>
                      <FontAwesome5
                        name={'stop'}
                        size={20}
                        color={item.color}
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                    <DeleteIcon onDelete={() => handleDelete(item.id)} />
                  </View>
                </CCard>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default CategorySettings;
