import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import ETFDetail from './ETFStack/ETFDetail';
import ETFs from './ETFStack/ETFs';

export default function ETFStack() {
  const Stack = createNativeStackNavigator();
  const focus = useIsFocused();
  if (!focus) {
    return <Text>Unmounted</Text>;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ETFs" component={ETFs} />
      <Stack.Screen name="ETFDetails" component={ETFDetail} />
    </Stack.Navigator>
  );
}
