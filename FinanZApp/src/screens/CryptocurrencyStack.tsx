import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { CryptoCurrencyProvider } from '../context/CryptoCurrencyContext';
import AllCrypto from './Cryptocurrency/AllCrypto';
import DetailsCrypto from './Cryptocurrency/DetailsCrypto';
import WatchlistCrypto from './Cryptocurrency/WatchlistCrypto';
import ETFDetail from './ETFStack/ETFDetail';
import ETFs from './ETFStack/ETFs';

export default function CryptocurrencyStack() {
  const Stack = createNativeStackNavigator();
  const focus = useIsFocused();
  if (!focus) {
    return <Text>Unmounted</Text>;
  }

  return (
    <CryptoCurrencyProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AllCrypto" component={AllCrypto} />
        <Stack.Screen name="WatchlistCrypto" component={WatchlistCrypto} />
        <Stack.Screen name="DetailsCrypto" component={DetailsCrypto} />
      </Stack.Navigator>
    </CryptoCurrencyProvider>
  );
}
