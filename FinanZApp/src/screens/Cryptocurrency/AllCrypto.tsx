import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { globalStyles } from '../../styles/global';
import OptionHeader from '../../components/shared/OptionHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors1 } from '../../styles/color';
import CText from '../../components/shared/CText';
import CurrencySelect from '../../components/Crypto/CurrencySelect';
import { GETCRYPTOCURRENCYDATA } from '../../queries/GetCryptoCurrencyData';
import {
  IGetCryptoCurrencyData,
  InputType,
} from '../../queries/types/IGetCryptoCurrencyData';
import { useLazyQuery } from '@apollo/client';
import { useCryptoCurrency } from '../../hooks/useCryptoCurrency';

import Spinner from '../../components/shared/Spinner';
import CryptoCoinList from '../../components/Crypto/CryptoCoinList';
import SearchCrypto from '../../components/Crypto/SearchCrypto';
import { SearchBar } from '@rneui/themed';

const AllCrypto = props => {
  const { currency } = useCryptoCurrency();

  const [getData, { data, loading, error }] = useLazyQuery<
    IGetCryptoCurrencyData,
    InputType
  >(GETCRYPTOCURRENCYDATA, {
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    getData({ variables: { vs_currency: currency, page: 0, per_page: 200 } });
  }, [currency]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <View style={[globalStyles.container]}>
      <OptionHeader>
        <View style={{ marginRight: 'auto' }}>
          <CText heading>All Coins</CText>
        </View>
        <SearchCrypto />
        <CurrencySelect />
        <Icon
          onPress={() =>
            props.navigation.navigate('WatchlistCrypto', undefined)
          }
          name="bullseye"
          size={24}
          color={Colors1.secondaryText}
        />
      </OptionHeader>

      {data && <CryptoCoinList data={data} />}
    </View>
  );
};

export default AllCrypto;

const styles = StyleSheet.create({});
