import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorAlert = ({children}: {children: string}) => {
  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Icon name="error" size={18} color={'#8f3b3a'} />
      </View>
      <Text style={style.text}>{children}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fadddd',
    borderWidth: 2,
    borderColor: '#f7cbcb',
    margin: 5,
    overflow: 'hidden',
  },
  text: {
    padding: 5,
    color: '#8f3b3a',
    fontSize: 18,
    fontFamily: 'Monterrat-Regular',
  },
  iconContainer: {
    height: '100%',
    width: '10%',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#fadddd',
    borderRightWidth: 1,
    borderRightColor: '#f7cbcb',
  },
});
export default ErrorAlert;
