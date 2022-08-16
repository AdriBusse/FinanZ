/* eslint-disable @typescript-eslint/no-unused-vars */
import {useQuery} from '@apollo/client';
import React from 'react';
import {Button, TouchableOpacity, Text, View} from 'react-native';
import CButton from '../components/shared/CButton';
import {globalStyles} from '../styles/global';
import {useAuth} from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CText from '../components/shared/CText';

export default function Auth(props: {
  navigation: {navigate: (arg0: string) => any};
}) {
  const {authData, loading, login, logout} = useAuth();

  const renderLogin = () => {
    return (
      <>
        <CButton title={'Login'} onPress={() => login('AdriBusse', '123456')} />
      </>
    );
  };

  const renderLogout = () => {
    return (
      <>
        <CButton outline={true} title={'Logout'} onPress={() => logout()} />
      </>
    );
  };

  return (
    <View style={globalStyles.container}>
      {authData && <CText heading>{`Welcome ${authData.username}`}</CText>}
      {authData ? renderLogout() : renderLogin()}
      <CButton
        title={'print storage'}
        onPress={async () => {
          const data = await AsyncStorage.getItem('@AuthDataFinanZ');
          console.log('storage data');
          console.log(data);
          console.log('autdata:');
          console.log(authData);
        }}
      />
    </View>
  );
}
