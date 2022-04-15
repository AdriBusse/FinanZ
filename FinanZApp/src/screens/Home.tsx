/* eslint-disable @typescript-eslint/no-unused-vars */
import {useQuery} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import FlatButton from '../components/Button';
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

  return (
    <View style={globalStyles.container}>
      <FlatButton title={'Zum Konto'} onPress={changeToTagesgeld} />
    </View>
  );
}
