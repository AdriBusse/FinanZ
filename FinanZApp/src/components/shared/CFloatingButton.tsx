import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors1} from '../../styles/color';

interface Props {
  onPress: CallableFunction;
}
const CFloatingButton = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

export default CFloatingButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 7,
    right: 7,
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors1.button,
    zIndex: 20,
  },
  text: {
    fontSize: 30,
    color: Colors1.primaryText,
  },
});
