import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ETFs from './ETFStack/ETFs';

export default function ETFStack() {
  const Stack = createNativeStackNavigator();
  useIsFocused();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ETFs" component={ETFs} />
    </Stack.Navigator>
  );
}
