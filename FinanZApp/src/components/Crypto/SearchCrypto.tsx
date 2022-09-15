import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Overlay, SearchBar } from '@rneui/themed';
import { Colors1 } from '../../styles/color';
import CText from '../shared/CText';
import CTextInput from '../shared/CTextInput';
import { useLazyQuery } from '@apollo/client';
import { SEARCHCRYPTOCOIN } from '../../queries/SearchCryptoCoin';
import {
  InputType,
  ISearchCryptoCoin,
} from '../../queries/types/ISearchCryptoCoin';
import Spinner from '../shared/Spinner';
import CCard from '../shared/CCard';
import { useNavigation } from '@react-navigation/native';

const SearchCrypto = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ISearchCryptoCoin>();

  const [search] = useLazyQuery<ISearchCryptoCoin, InputType>(
    SEARCHCRYPTOCOIN,
    {
      onCompleted: data => {
        setResult(data);
        setLoading(false);
      },
    },
  );
  const navigation = useNavigation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) {
        setResult(undefined);
        console.log(query);
        setLoading(true);
        search({
          variables: { query },
        });
      } else {
        setResult(undefined);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  useEffect(() => {
    setResult(undefined);
    setQuery('');
    return () => {
      setResult(undefined);
      setQuery('');
    };
  }, [open]);

  return (
    <>
      <Overlay
        fullScreen
        overlayStyle={{
          backgroundColor: Colors1.lighter,
          alignItems: 'center',
        }}
        isVisible={open}
        onBackdropPress={() => setOpen(false)}>
        <View
          style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '90%' }}>
            <CTextInput
              value={query}
              onChangeText={setQuery}
              placeholder={'Search for Cryptocurrency'}
              selectTextOnFocus={true}
              keyboardType={'default'}
            />
          </View>
          <Icon
            onPress={() => setQuery('')}
            style={{ marginLeft: 10 }}
            name="remove"
            size={28}
          />
        </View>

        {loading && <Spinner />}
        {result?.searchCryptoCoin.length === 0 && !loading && (
          <CText style={{ mrginTop: 20 }} heading>
            Nothing...
          </CText>
        )}
        {result && (
          <FlatList
            data={result.searchCryptoCoin}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setOpen(false);
                  //@ts-ignore
                  navigation.navigate('DetailsCrypto', {
                    item: item.id,
                  });
                }}
                style={{
                  backgroundColor: Colors1.modal2,
                  borderBottomColor: Colors1.primary,
                  borderBottomWidth: 1,
                }}>
                <CCard>
                  <View
                    style={[
                      { flexDirection: 'row', justifyContent: 'space-between' },
                    ]}>
                    <CText>
                      {item.market_cap_rank === null
                        ? '-'
                        : item.market_cap_rank + ''}
                    </CText>
                    <Avatar
                      containerStyle={{ height: 30, width: 30 }}
                      rounded
                      size="large"
                      source={{ uri: item.thumb }}
                      title="P"
                    />
                    <CText>{item.name.substring(0, 15)}</CText>
                    <CText>{item.symbol}</CText>
                  </View>
                </CCard>
              </Pressable>
            )}
          />
        )}
      </Overlay>
      <Icon
        onPress={() => setOpen(true)}
        style={{ marginRight: 10 }}
        name="search"
        color={Colors1.secondaryText}
        size={24}
      />
    </>
  );
};

export default SearchCrypto;

const styles = StyleSheet.create({});
