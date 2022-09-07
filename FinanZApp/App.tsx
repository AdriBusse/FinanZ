import { ApolloProvider } from '@apollo/client';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import Home from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TagesgeldStack from './src/screens/TagesgeldStack';
import ETFStack from './src/screens/ETFStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthProvider } from './src/context/AuthContext';
import Auth from './src/screens/Auth';
import { useAuth } from './src/hooks/useAuth';
import { client } from './src/config/apolloClient';
import { Colors1 } from './src/styles/color';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Expense from './src/screens/ExpenseStack';
import Background from './src/components/shared/Background';

const App = () => {
  // just during on device testing
  LogBox.ignoreAllLogs();

  // const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { authData } = useAuth();
  console.log(authData);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <Background variant="black">
      <ApolloProvider client={client}>
        <AuthProvider>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                unmountOnBlur: true,
                headerShown: false,
                tabBarShowLabel: false,
                headerTransparent: false,
                tabBarActiveTintColor: Colors1.detail1,
                tabBarInactiveTintColor: Colors1.secondaryText,
                tabBarStyle: {
                  backgroundColor: Colors1.lighter,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  left: 0,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  height: 60,
                },
                tabBarIcon: ({ color, size, focused }) => {
                  let iconName = '';
                  if (route.name === 'Home') {
                    iconName = 'home';
                  } else if (route.name === 'Sparen') {
                    iconName = 'database';
                  } else if (route.name === 'ETF') {
                    iconName = 'area-chart';
                  } else if (route.name === 'Auth') {
                    iconName = 'user';
                  } else if (route.name === 'Expense') {
                    iconName = 'money';
                  }
                  // return any NavBar Component
                  return (
                    <View style={styles.center}>
                      <Icon name={iconName} size={size} color={color} />
                      <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          fontSize: 12,
                          color: focused
                            ? Colors1.primaryText
                            : Colors1.secondaryText,
                        }}>
                        {route.name}
                      </Text>
                    </View>
                  );
                },
              })}>
              <Tab.Screen name="Sparen" component={TagesgeldStack} />
              <Tab.Screen name="Expense" component={Expense} />
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="ETF" component={ETFStack} />
              <Tab.Screen name="Auth" component={Auth} />
            </Tab.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ApolloProvider>
    </Background>
  );
};

export default App;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
});
