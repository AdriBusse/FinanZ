import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import CButton from '../shared/CButton';
import {useAuth} from '../../hooks/useAuth';
import {globalStyles} from '../../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CModal from '../shared/CModal';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  navigation: {navigate: (arg0: string, arg1: {item: any}) => void};
}

const AuthModal = ({visible, toggle, navigation}: Props) => {
  const {authData, loading, login, logout} = useAuth();

  useEffect(() => {
    if (!authData) {
      console.log('no token tehre');
    } else {
      toggle(false);
    }
  }, [loading]);
  const renderLogout = () => {
    return (
      <View style={globalStyles.container}>
        <CButton title={'Logout'} onPress={() => logout()} />
      </View>
    );
  };
  const renderLogin = () => {
    return (
      <View style={globalStyles.container}>
        <CButton
          title={'Login'}
          onPress={() => {
            // login('JohnDoe', '123456');
            navigation.navigate('Home', {item: null});
            toggle(false);
          }}
        />
      </View>
    );
  };
  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      {authData ? renderLogout() : renderLogin()}
      <Text>Modal</Text>
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
    </CModal>
  );
};

export default AuthModal;
