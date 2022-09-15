import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CurrencyData } from '../../queries/types/IGetCryptoCurrencyData';
import CText from '../shared/CText';
import CCard from '../shared/CCard';
import { Avatar } from '@rneui/base';
import { showShortNumber } from '../../helpers/showShortNumber';
import { Colors1 } from '../../styles/color';
import { useNavigation } from '@react-navigation/native';
import { useCryptoCurrency } from '../../hooks/useCryptoCurrency';

interface Props {
  item: CurrencyData;
}
const AllCryptoCoinDetailCard = ({ item }: Props) => {
  const navigation = useNavigation();
  const { currency, symbol } = useCryptoCurrency();

  return (
    <Pressable
      onPress={() =>
        //@ts-ignore
        navigation.navigate('DetailsCrypto', {
          item: item.id,
        })
      }>
      <CCard>
        <View
          style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <CText bold>{item.market_cap_rank + ''}</CText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Avatar
              containerStyle={{ height: 50, width: 50 }}
              rounded
              size="large"
              source={{ uri: item.image }}
              title="P"
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CText bold>{item.symbol.toUpperCase()}</CText>
            <CText style={{ fontSize: 10 }}>{item.name}</CText>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <CText
              style={{
                fontSize: 16,
                color:
                  item.price_change_percentage_1h_in_currency >= 0
                    ? Colors1.positive
                    : Colors1.negative,
              }}
              bold>
              {`${
                item.current_price > 0.1
                  ? item.current_price.toFixed(2)
                  : item.current_price
              }${symbol}`}
            </CText>
          </View>
          <View style={{ width: 50 }}>
            <View style={{ flexDirection: 'row' }}>
              <CText
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color:
                    item.price_change_percentage_1h_in_currency > 0
                      ? Colors1.positive
                      : Colors1.negative,
                }}>
                {`${
                  item.price_change_percentage_1h_in_currency > 0 ? '+' : ''
                }${item.price_change_percentage_1h_in_currency.toFixed(2)}%`}
              </CText>
              <CText
                style={{
                  fontSize: 10,
                  color: Colors1.secondaryText,
                }}>
                1h
              </CText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CText
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color:
                    item.price_change_percentage_24h > 0
                      ? Colors1.positive
                      : Colors1.negative,
                }}>
                {`${
                  item.price_change_percentage_24h > 0 ? '+' : ''
                }${item.price_change_percentage_24h.toFixed(2)}%`}
              </CText>
              <CText
                style={{
                  fontSize: 10,
                  color: Colors1.secondaryText,
                }}>
                24h
              </CText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CText
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color:
                    item.price_change_percentage_7d_in_currency > 0
                      ? Colors1.positive
                      : Colors1.negative,
                }}>
                {`${
                  item.price_change_percentage_7d_in_currency > 0 ? '+' : ''
                }${item.price_change_percentage_7d_in_currency.toFixed(2)}%`}
              </CText>
              <CText
                style={{
                  fontSize: 10,
                  color: Colors1.secondaryText,
                }}>
                7d
              </CText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CText style={{ fontSize: 10, marginRight: 5 }}>
                {showShortNumber(item.total_volume)}
              </CText>
              <CText
                style={{
                  fontSize: 10,
                  color: Colors1.secondaryText,
                }}>
                Vol
              </CText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CText style={{ fontSize: 10, marginRight: 5 }}>
                {showShortNumber(item.market_cap)}
              </CText>
              <CText
                style={{
                  fontSize: 10,
                  color: Colors1.secondaryText,
                }}>
                Kap
              </CText>
            </View>
          </View>
        </View>
      </CCard>
    </Pressable>
  );
};

export default AllCryptoCoinDetailCard;

const styles = StyleSheet.create({});
