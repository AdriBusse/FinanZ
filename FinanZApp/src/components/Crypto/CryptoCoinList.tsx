import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  TOP1H,
  DEFAULT,
  TOP24H,
  FLOP1H,
  FLOP24H,
} from '../../config/CryptoSorterConstants';
import { sortCoinData } from '../../helpers/sortCoinData';
import CText from '../shared/CText';
import AllCryptoCoinDetailCard from './AllCryptoCoinDetailCard';
import { Colors1 } from '../../styles/color';
import { IGetCryptoCurrencyData } from '../../queries/types/IGetCryptoCurrencyData';

interface Props {
  data: IGetCryptoCurrencyData;
}
const CryptoCoinList = ({ data }: Props) => {
  const [sorter, setSorter] = useState(DEFAULT);

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={{ marginRight: 20 }}>
          <CText bold>Top Gainers</CText>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                sorter === TOP1H ? setSorter(DEFAULT) : setSorter(TOP1H);
              }}
              style={[
                styles.filterPill,
                sorter === TOP1H ? styles.activePill : null,
              ]}>
              <CText bold style={sorter === TOP1H ? styles.activeText : null}>
                1h
              </CText>
            </Pressable>
            <Pressable
              onPress={() =>
                sorter === TOP24H ? setSorter(DEFAULT) : setSorter(TOP24H)
              }
              style={[
                styles.filterPill,
                sorter === TOP24H ? styles.activePill : null,
              ]}>
              <CText bold style={sorter === TOP24H ? styles.activeText : null}>
                24h
              </CText>
            </Pressable>
          </View>
        </View>
        <View>
          <CText bold>Biggest Dip</CText>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() =>
                sorter === FLOP1H ? setSorter(DEFAULT) : setSorter(FLOP1H)
              }
              style={[
                styles.filterPill,
                sorter === FLOP1H ? styles.activePill : null,
              ]}>
              <CText style={sorter === FLOP1H ? styles.activeText : null} bold>
                1h
              </CText>
            </Pressable>
            <Pressable
              onPress={() =>
                sorter === FLOP24H ? setSorter(DEFAULT) : setSorter(FLOP24H)
              }
              style={[
                styles.filterPill,
                sorter === FLOP24H ? styles.activePill : null,
              ]}>
              <CText style={sorter === FLOP24H ? styles.activeText : null} bold>
                24h
              </CText>
            </Pressable>
          </View>
        </View>
      </View>

      <FlatList
        data={sortCoinData(data.getMarketData, sorter)}
        renderItem={({ item }) => {
          return <AllCryptoCoinDetailCard item={item} />;
        }}
      />
    </>
  );
};

export default CryptoCoinList;

const styles = StyleSheet.create({
  filterPill: {
    backgroundColor: Colors1.lighter,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 3,
    marginTop: 3,
    borderWidth: 1,
    borderColor: Colors1.primary,
  },
  activePill: {
    borderColor: Colors1.detail1,
    color: Colors1.detail1,
  },
  activeText: {
    color: Colors1.detail1,
  },
});
