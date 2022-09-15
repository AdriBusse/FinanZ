import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  CryptoCurrencyContext,
  CryptoCurrencyContextData,
} from '../context/CryptoCurrencyContext';

export function useCryptoCurrency(): CryptoCurrencyContextData {
  const context = useContext(CryptoCurrencyContext);

  if (!context) {
    throw new Error(
      'useCryptoCurrency must be used within an CryptoCurrencyProvider',
    );
  }

  return context;
}
