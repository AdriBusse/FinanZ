import {useMutation} from '@apollo/client';
import React, {createContext, useEffect, useState} from 'react';
import {LOGIN} from '../queries/mutations/auth/login';
import {AuthContextData, AuthData} from '../types/AuthTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {client} from '../config/apolloClient';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({children}) => {
  const STORAGEKEY = '@AuthDataFinanZ';
  const [authData, setAuthData] = useState<AuthData>();

  const [loading, setLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN, {});

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call the loadStorageData function and validate if Token is still valid.
    const asyncTask = async () => {
      await loadStorageData();
    };
    asyncTask();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem(STORAGEKEY);
      if (authDataSerialized) {
        console.log('reload token123');

        const _authData: AuthData = JSON.parse(authDataSerialized);
        console.log(_authData);
        const encodedData = jwt_decode(_authData!.token);
        //@ts-ignore
        if (encodedData.exp < new Date().getTime() / 1000) {
          // Token is invalide
          logout();
        } else {
          // Token is valid
          setAuthData(_authData);
        }
      } else {
        console.log('no token found');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const login = async (username: string, password: string) => {
    await loginMutation({
      variables: {username, password},
      onCompleted: data => {
        const authDataNew = {
          token: data.login.token,
          username: data.login.user.username,
          email: data.login.user.email,
        };
        setAuthData(authDataNew);
        AsyncStorage.setItem(STORAGEKEY, JSON.stringify(authDataNew), () => {
          console.log('done');
        });
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  const logout = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem(STORAGEKEY);
    client.resetStore();
  };

  return (
    <AuthContext.Provider value={{authData, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
