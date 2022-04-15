import {useQuery} from '@apollo/client';
import React from 'react';
import {View, Text} from 'react-native';
import {GETETFDATA} from '../../queries/GetETFData';
import {IETF} from '../../types/types';

export default function ETFs() {
  const {data, error, loading} = useQuery(GETETFDATA);

  if (error) {
    console.log('____Error____');
    console.log(error);
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>ETFs</Text>
      {data.getETFs.map((etf: IETF) => {
        return (
          <View key={etf.id}>
            <Text>{etf.name}</Text>
            <Text>{etf.worth}</Text>
            <Text>{etf.deposited}</Text>
          </View>
        );
      })}
    </View>
  );
}
