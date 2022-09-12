import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthData } from '../types/AuthTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  // uri: 'http://192.168.81.103:4000/graphql',
  uri: 'http://192.168.84.103:4000/graphql',
  // uri: 'http://188.166.162.242:4200/graphql',
});
const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//const oldServer = "http://188.166.162.242:4000/graphql"
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

const getToken = async () => {
  const token = await AsyncStorage.getItem('@AuthDataFinanZ');
  if (token) {
    const _authData: AuthData = JSON.parse(token);
    return _authData.token;
  }
};
