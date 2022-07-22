import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {GETEXPENSECATEGORIES} from '../../queries/GetExpenseCategories';
import ErrorAlert from '../../components/shared/ErrorAlert';
import {IGetExpenseCategories} from '../../queries/types/IGetExpenseCategories';
import Card from '../../components/shared/Card';
import {globalStyles} from '../../styles/global';
import FText from '../../components/shared/FText';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors1} from '../../styles/color';
import {DELETEEXPENSECATEGORY} from '../../queries/mutations/Expenses/DeleteExpenseCategory';
import AddExpenseCategoryModal from '../../components/modals/Expenses/AddExpenseCategoryModal';
import CustomButton from '../../components/shared/Button';
import UpdateExpenseCategoryModal from '../../components/modals/Expenses/UpdateExpenseCategoryModal';

const CategorySettings = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const {data, error, loading} =
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
    setFocusItem({id, icon, color, name});
    setShowUpdate(true);
  };
  function handleDelete(id: string): void {
    console.log('delete ', id);

    Alert.alert(
      'Delete this Category',
      'Are you sure you want delete this Category? ',
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteCategory({variables: {id}}),
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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
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
      <CustomButton title="Add" onPress={() => setShowAdd(true)} />
      {data &&
        data.getExpenseCategories.map(category => {
          console.log(category.icon);

          return (
            <TouchableOpacity
              onPress={() =>
                showUpdateModal(
                  category.id,
                  category.icon,
                  category.color,
                  category.name,
                )
              }>
              <Card>
                <View style={globalStyles.transCard}>
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesome5
                      name={category.icon}
                      size={18}
                      color={Colors1.primaryText}
                      style={{marginRight: 10}}
                    />

                    <FText bold={true}>{category.name}</FText>
                    <FontAwesome5
                      name={'stop'}
                      size={20}
                      color={category.color}
                      style={{marginLeft: 10}}
                    />
                  </View>
                  <Icon
                    onPress={() => handleDelete(category.id)}
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
};

export default CategorySettings;
