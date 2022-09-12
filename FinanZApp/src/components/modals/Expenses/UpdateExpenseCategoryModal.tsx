import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GETEXPENSECATEGORIES } from '../../../queries/GetExpenseCategories';
import { UPDATEEXPENSECATEGORY } from '../../../queries/mutations/Expenses/UpdateExpenseCategory';
import { globalStyles } from '../../../styles/global';
import ColorDropDown from '../../DropDown/ColorDropDown';
import IconDropDown from '../../DropDown/IconDropDown';
import CButton from '../../shared/CButton';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';
import { IUpdateExpenseCategory } from '../../../queries/types/mutations/Expense/IUpdateExpenseCategory';
import { IReturn } from '../../../queries/types/mutations/ETF/ICreateETFTransaction';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  catId: string;
  name: string;
  icon: string;
  color: string;
}
function UpdateExpenseCategoryModal({
  visible,
  toggle,
  catId,
  name,
  icon,
  color,
}: Props) {
  const [newName, setNewName] = useState(name);
  const [newIcon, setNewIcon] = useState(icon);
  const [newColor, setNewColor] = useState(color);
  const [updateExpenseCategory] = useMutation<IReturn, IUpdateExpenseCategory>(
    UPDATEEXPENSECATEGORY,
    {
      onError: err => {
        console.log(err);
      },
      refetchQueries: [GETEXPENSECATEGORIES],
    },
  );
  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      <View style={[globalStyles.container, globalStyles.scroll]}>
        <View style={styles.pB}>
          <CText>Name:</CText>
          <CTextInput
            value={newName}
            onChangeText={setNewName}
            placeholder={'Name'}
            selectTextOnFocus={false}
            keyboardType={'default'}
          />
        </View>
        <View style={styles.pB}>
          <IconDropDown value={newIcon} changeValue={setNewIcon} />
        </View>
        <View style={styles.pB}>
          <ColorDropDown value={newColor} changeValue={setNewColor} />
        </View>
      </View>
      <CButton
        title="Update"
        onPress={() => {
          updateExpenseCategory({
            variables: {
              id: catId,
              name: newName,
              color: newColor,
              icon: newIcon,
            },
          });
          toggle(false);
        }}
      />
    </CModal>
  );
}
const styles = StyleSheet.create({
  pB: {
    paddingBottom: 5,
  },
});
export default UpdateExpenseCategoryModal;
