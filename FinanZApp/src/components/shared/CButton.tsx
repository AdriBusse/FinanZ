import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors1} from '../../styles/color';

interface Props {
  title: string;
  onPress: any;
  outline: boolean;
}
export default function CButton({title, onPress, outline}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.button,
          outline ? styles.buttonOutline : styles.buttonFull,
        ]}>
        <Text
          style={[
            styles.buttonText,
            outline ? styles.buttonTextOutline : styles.buttonTextFull,
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CButton.defaultProps = {
  outline: false,
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  buttonFull: {
    backgroundColor: Colors1.button,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: Colors1.button,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextFull: {
    color: Colors1.primaryText,
  },
  buttonTextOutline: {
    color: Colors1.button,
  },
});
