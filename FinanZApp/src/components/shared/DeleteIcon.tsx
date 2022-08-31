import {Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors1} from '../../styles/color';

interface Props {
  onDelete: CallableFunction;
}
const DeleteIcon = ({onDelete}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert('Delete', 'Are you sure you wanna delete this?', [
          {
            text: 'Delete',
            style: 'cancel',
            onPress: () => onDelete(),
          },
          {
            text: 'Cancel',
          },
        ]);
      }}>
      <Icon name="trash" size={20} color={Colors1.secondaryText} />
    </TouchableOpacity>
  );
};

export default DeleteIcon;
