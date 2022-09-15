import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import OptionHeader from '../../components/shared/OptionHeader';
import { Colors1 } from '../../styles/color';
import { globalStyles } from '../../styles/global';
import CText from '../../components/shared/CText';
import CurrencySelect from '../../components/Crypto/CurrencySelect';
import { useQuery } from '@apollo/client';
import { GETCRYPTOCURRENCYDATA } from '../../queries/GetCryptoCurrencyData';
import {
  IGetCryptoCurrencyData,
  InputType,
} from '../../queries/types/IGetCryptoCurrencyData';
import WatchlistCryptoService from '../../services/WatchlistCryptoService';
import CryptoCoinList from '../../components/Crypto/CryptoCoinList';
import SearchCrypto from '../../components/Crypto/SearchCrypto';

const WatchlistCrypto = props => {
  const [stringIds, setStringIds] = useState('');
  useEffect(() => {
    const getIds = async () => {
      const ids = await WatchlistCryptoService.getList();
      setStringIds(ids.toString());
    };
    getIds();
  }, []);
  console.log('stringIds', stringIds);

  const { data, error, loading } = useQuery<IGetCryptoCurrencyData, InputType>(
    GETCRYPTOCURRENCYDATA,
    {
      variables: { vs_currency: 'usd', page: 0, per_page: 200, ids: stringIds },
      skip: stringIds === '',
      onCompleted: data => {
        console.log(data);
      },
    },
  );
  return (
    <View style={[globalStyles.container]}>
      <OptionHeader>
        <View style={{ marginRight: 'auto' }}>
          <CText heading>Watchlist</CText>
        </View>
        <SearchCrypto />
        <CurrencySelect />
        <Icon
          onPress={() => props.navigation.navigate('AllCrypto', undefined)}
          name="list"
          size={24}
          color={Colors1.secondaryText}
        />
      </OptionHeader>
      {data && <CryptoCoinList data={data} />}
    </View>
  );
};

export default WatchlistCrypto;

const styles = StyleSheet.create({});
