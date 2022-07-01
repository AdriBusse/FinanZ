import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Tagesgeld from './TagesgeldStack/Tagesgeld';
import TagesgeldDetails from './TagesgeldStack/TagesgeldDetails';

export default function TagesgeldStack() {
  const Stack = createNativeStackNavigator();
  const focus = useIsFocused();

  if (!focus) {
    return <Text>Unmounted</Text>;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tagesgeld" component={Tagesgeld} />
      <Stack.Screen name="TagesgeldDetails" component={TagesgeldDetails} />
    </Stack.Navigator>
  );
}
