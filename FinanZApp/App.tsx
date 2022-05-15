import {ApolloProvider} from '@apollo/client';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import Home from './src/screens/Home';
//import Tagesgeld from './src/screens/Tagesgeld';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TagesgeldStack from './src/screens/TagesgeldStackScreen';
import ETFStack from './src/screens/ETFStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthProvider} from './src/context/AuthContext';
import Auth from './src/screens/Auth';
import {useAuth} from './src/hooks/useAuth';
import {client} from './src/config/apolloClient';
import {Colors} from './src/styles/color';

const App = () => {
  // const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {authData} = useAuth();
  console.log(authData);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.primary,
    },
  };

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              headerTransparent: false,
              tabBarStyle: {backgroundColor: Colors.lighter},

              tabBarIcon: ({color, size}) => {
                let iconName = '';
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Sparen') {
                  iconName = 'money';
                } else if (route.name === 'ETF') {
                  iconName = 'area-chart';
                } else if (route.name === 'Auth') {
                  iconName = 'user';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: Colors.primaryText,
              tabBarInactiveTintColor: Colors.secondaryText,
            })}>
            <Tab.Screen name="Sparen" component={TagesgeldStack} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="ETF" component={ETFStack} />
            <Tab.Screen name="Auth" component={Auth} />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
