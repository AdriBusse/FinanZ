import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors1} from '../../styles/color';

interface Props {
  type: 'primary' | 'secondary';
  bold?: boolean;
  heading?: boolean;
  children: string;
}
const FText = ({type, bold, heading, children}: Props) => {
  return (
    <Text
      style={[
        type === 'primary' ? styles.primaryText : styles.secondaryText,
        bold ? styles.boldText : null,
        heading ? styles.heading : null,
        styles.font,
      ]}>
      {children}
    </Text>
  );
};

export default FText;

FText.defaultProps = {
  type: 'primary',
  bold: false,
  heading: false,
};
const styles = StyleSheet.create({
  primaryText: {
    color: Colors1.primaryText,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  secondaryText: {
    color: Colors1.secondaryText,
  },
  boldText: {
    fontWeight: 'bold',
  },
  font: {
    fontFamily: 'Monterrat-Regular',
  },
});
