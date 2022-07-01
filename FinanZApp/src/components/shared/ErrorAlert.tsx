import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorAlert = ({children}: {children: string}) => {
  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Icon name="error" size={18} color={'#893232'} />
      </View>
      <Text style={style.text}>{children}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fadddd',
    borderWidth: 2,
    borderColor: '#f7cbcb',
    margin: 5,
    overflow: 'hidden',
    maxHeight: 50,
  },
  text: {
    color: '#893232',
    fontSize: 14,
    fontFamily: 'Monterrat-Regular',
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f7cbcb',
  },
});
export default ErrorAlert;
