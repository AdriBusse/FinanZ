import { useMutation } from '@apollo/client';
import React, { createContext, useEffect, useState } from 'react';
import { LOGIN } from '../queries/mutations/auth/login';
import { AuthContextData, AuthData } from '../types/AuthTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { client } from '../config/apolloClient';
import { getCurrencySymbol } from '../helpers/getCurrencySymbol';

export interface CryptoCurrencyContextData {
  currency: string;
  symbol: string;
  loading: boolean;
  changeCurrency: CallableFunction;
}
export const CryptoCurrencyContext = createContext<CryptoCurrencyContextData>(
  {} as CryptoCurrencyContextData,
);

export const CryptoCurrencyProvider: React.FC = ({ children }) => {
  const STORAGEKEY = '@CryptoCurrency';
  const [currency, setCurrency] = useState<string>();
  const [symbol, setSymbol] = useState<string>();

  const [loading, setLoading] = useState(true);

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
      const currencySerialized = await AsyncStorage.getItem(STORAGEKEY);
      if (currencySerialized) {
        console.log('reload crypto currency');

        const cu = JSON.parse(currencySerialized);
        setCurrency(cu);
        setSymbol(getCurrencySymbol(cu));
      } else {
        console.log('no currency found');
        changeCurrency('usd');
        setSymbol(getCurrencySymbol('usd'));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const changeCurrency = async (currency: string) => {
    setCurrency(currency);
    setSymbol(getCurrencySymbol(currency));
    AsyncStorage.setItem(STORAGEKEY, JSON.stringify(currency), () => {
      console.log('done');
    });
  };

  return (
    <CryptoCurrencyContext.Provider
      value={{ currency, symbol, loading, changeCurrency }}>
      {children}
    </CryptoCurrencyContext.Provider>
  );
};
