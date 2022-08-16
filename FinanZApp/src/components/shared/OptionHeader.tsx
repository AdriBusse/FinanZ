import {StyleSheet, View} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
const OptionHeader = ({children}: Props) => {
  return <View style={styles.options}>{children}</View>;
};

export default OptionHeader;

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});
