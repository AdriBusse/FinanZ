import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useCryptoCurrency } from '../../hooks/useCryptoCurrency';
import CText from '../shared/CText';
import { useQuery } from '@apollo/client';
import { GETSUPPORTEDVSCURRENCIES } from '../../queries/GetSupportedCurrencies';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { Overlay } from '@rneui/themed';
import { Colors1 } from '../../styles/color';

const CurrencySelect = () => {
  const { currency, changeCurrency } = useCryptoCurrency();
  const [open, setOpen] = useState(false);
  const [ddvalue, setddValue] = useState(currency);
  const [items, setItems] = useState<string[]>([]);
  console.log(currency);

  const { data, error, loading } = useQuery<{
    getSupportedVsCurrencies: string[];
  }>(GETSUPPORTEDVSCURRENCIES, {
    onCompleted: data => {
      console.log(data);

      setItems(['usd', 'eur', ...data.getSupportedVsCurrencies]);
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <View style={{ marginRight: 10 }}>
      <Pressable onPress={() => setOpen(true)}>
        {currency && <CText>{currency.toUpperCase()}</CText>}
      </Pressable>
      <Overlay
        overlayStyle={{
          backgroundColor: Colors1.lighter,
          height: 300,
          width: 100,
          alignItems: 'center',
        }}
        isVisible={open}
        onBackdropPress={() => setOpen(!open)}>
        {data && (
          <FlatList
            data={items}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    changeCurrency(item);
                    setOpen(false);
                  }}>
                  <CText style={{ marginVertical: 5, marginHorizontal: 10 }}>
                    {item.toUpperCase()}
                  </CText>
                </Pressable>
              );
            }}
          />
        )}
      </Overlay>
    </View>
  );
};

export default CurrencySelect;

const styles = StyleSheet.create({});
