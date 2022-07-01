import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import Expense from './Expense/Expense';
import ExpenseDetail from './Expense/ExpenseDetail';

export default function ExpanseStack() {
  const Stack = createNativeStackNavigator();
  const focus = useIsFocused();
  if (!focus) {
    return <Text>Unmounted</Text>;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetail} />
    </Stack.Navigator>
  );
}
