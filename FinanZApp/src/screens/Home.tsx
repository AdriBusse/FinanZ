/* eslint-disable @typescript-eslint/no-unused-vars */
import {useQuery} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlatButton from '../components/Button';
import {Colors} from '../styles/color';
import {globalStyles} from '../styles/global';

export default function Home(props: {
  navigation: {navigate: (arg0: string) => any};
}) {
  useIsFocused();
  console.log('render');
  const changeToTagesgeld = () => {
    props.navigation.navigate('Sparen');
  };
  // changeToTagesgeld();

  return <FlatButton title={'Zum Konto'} onPress={changeToTagesgeld} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});
