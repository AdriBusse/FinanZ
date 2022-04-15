import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {AuthContextData} from '../types/AuthTypes';

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
