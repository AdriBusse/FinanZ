import {StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors1} from '../../../styles/color';

interface Props {
  closeFunktion: CallableFunction;
}
const CloseModal = ({closeFunktion}: Props) => {
  return (
    <Icon
      onPress={() => closeFunktion()}
      style={styles.close}
      name="close"
      size={20}
      color={Colors1.primaryText}
    />
  );
};

export default CloseModal;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
