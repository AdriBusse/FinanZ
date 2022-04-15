/* eslint-disable @typescript-eslint/no-unused-vars */
import {useQuery} from '@apollo/client';
import React from 'react';
import {Button, TouchableOpacity, Text, View} from 'react-native';
import FlatButton from '../components/Button';
import {globalStyles} from '../styles/global';
import {useAuth} from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(props: {
  navigation: {navigate: (arg0: string) => any};
}) {
  const {authData, loading, login, logout} = useAuth();
  const changeToTagesgeld = () => {
    console.log('hello');

    props.navigation.navigate('Sparen');
  };
  const renderLogin = () => {
    return (
      <View style={globalStyles.container}>
        <FlatButton
          title={'Login'}
          onPress={() => login('AdriBusse', '123456')}
        />
      </View>
    );
  };

  const renderLogout = () => {
    return (
      <View style={globalStyles.container}>
        <FlatButton title={'Logout'} onPress={() => logout()} />
      </View>
    );
  };

  return (
    <>
      {authData ? renderLogout() : renderLogin()}
      <FlatButton
        title={'print storage'}
        onPress={async () => {
          const data = await AsyncStorage.getItem('@AuthDataFinanZ');
          console.log('storage data');
          console.log(data);
          console.log('autdata:');
          console.log(authData);
        }}
      />
    </>
  );
}
