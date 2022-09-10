import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import ArchivedExpenses from './Expense/ArchivedExpenses';
import CategorySettings from './Expense/CategorySettings';
import Expense from './Expense/Expense';
import ExpenseDetail from './Expense/ExpenseDetail';

export default function ExpenseStack() {
  const Stack = createNativeStackNavigator();
  const focus = useIsFocused();
  if (!focus) {
    return <Text>Unmounted</Text>;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetail} />
      <Stack.Screen name="CategorySettings" component={CategorySettings} />
      <Stack.Screen name="ArchivedExpenses" component={ArchivedExpenses} />
    </Stack.Navigator>
  );
}
