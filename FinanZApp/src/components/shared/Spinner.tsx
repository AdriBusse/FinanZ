import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {Colors1} from '../../styles/color';

const Spinner = () => {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color={Colors1.detail1} />
    </View>
  );
};
const styles = StyleSheet.create({
  spinner: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Spinner;
