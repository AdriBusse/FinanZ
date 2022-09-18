import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GETCRYPTOCURRENCYDETAILS } from '../../queries/GetCryptoCurrencyDetails';
import {
  IGetCryptoCurrencyDetails,
  InputType,
} from '../../queries/types/IGetCryptoCurrencyDetails';
import { useCryptoCurrency } from '../../hooks/useCryptoCurrency';
import Spinner from '../../components/shared/Spinner';
import ErrorAlert from '../../components/shared/ErrorAlert';
import { globalStyles } from '../../styles/global';
import OptionHeader from '../../components/shared/OptionHeader';
import CText from '../../components/shared/CText';
import { Colors1 } from '../../styles/color';
import { formatNumber } from '../../helpers/formatNumber';
import { Avatar } from '@rneui/themed';
import moment from 'moment';
import PriceChart from '../../components/Charts/Crypto/PriceChart';
import AddToWatchlistStar from '../../components/Crypto/AddToWatchlistStar';

const DetailsCrypto = props => {
  const { item } = props.route.params;
  const { currency, symbol } = useCryptoCurrency();

  const {
    data,
    error,
    loading,
    refetch: refetchDetails,
  } = useQuery<IGetCryptoCurrencyDetails, InputType>(GETCRYPTOCURRENCYDETAILS, {
    variables: {
      id: item,
      vs_currency: currency,
    },
    fetchPolicy: 'network-only',
    skip: !item,
  });

  useEffect(() => {
    refetchDetails();
  }, [currency]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  return (
    <ScrollView style={[globalStyles.container]}>
      <OptionHeader>
        <View style={{ flexDirection: 'row', marginRight: 'auto' }}>
          <Avatar
            avatarStyle={{}}
            containerStyle={{ height: 35, width: 35 }}
            imageProps={{}}
            rounded
            size="large"
            source={{ uri: data?.getCoinDetails.image.small }}
            title="P"
            titleStyle={{}}
          />
          <CText
            style={{
              marginLeft: 10,
            }}
            heading>
            {data!.getCoinDetails.name}
          </CText>
          <CText
            style={{
              marginLeft: 10,
              color: Colors1.secondaryText,
            }}
            heading>
            {data!.getCoinDetails.symbol.toUpperCase()}
          </CText>
        </View>
        <AddToWatchlistStar id={data!.getCoinDetails.id} />
      </OptionHeader>
      <PriceChart id={data!.getCoinDetails.id} />
      <View style={[styles.box, styles.basicInfo]}>
        <View>
          <CText bold style={{ fontSize: 20 }}>
            {`${
              data!.getCoinDetails.market_data.current_price > 0.2
                ? formatNumber(
                    parseFloat(
                      data!.getCoinDetails.market_data.current_price.toFixed(2),
                    ),
                  )
                : data!.getCoinDetails.market_data.current_price
            } ${symbol}`}
          </CText>
          <CText style={{ color: Colors1.secondaryText, fontSize: 12 }}>
            {data?.getCoinDetails.symbol.toUpperCase() +
              '/' +
              currency.toUpperCase() +
              '-' +
              moment(data?.getCoinDetails.market_data.last_updated).format(
                'ddd hh:mm A',
              )}
          </CText>
        </View>
        <View style={{ width: 80 }}>
          <View style={{ flexDirection: 'row' }}>
            <CText
              style={{
                fontSize: 12,
                marginRight: 5,
                color:
                  data!.getCoinDetails.market_data
                    .price_change_24h_in_currency > 0
                    ? Colors1.positive
                    : Colors1.negative,
              }}>
              {`${
                data!.getCoinDetails.market_data.price_change_24h_in_currency >
                0
                  ? '+'
                  : ''
              }${data!.getCoinDetails.market_data.price_change_percentage_24h.toFixed(
                2,
              )}%`}
            </CText>
            <CText
              style={{
                fontSize: 12,
                color: Colors1.secondaryText,
              }}>
              24h
            </CText>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CText
              style={{
                fontSize: 12,
                marginRight: 5,
                color:
                  data!.getCoinDetails.market_data.price_change_percentage_7d >
                  0
                    ? Colors1.positive
                    : Colors1.negative,
              }}>
              {`${
                data!.getCoinDetails.market_data.price_change_percentage_7d > 0
                  ? '+'
                  : ''
              }${data!.getCoinDetails.market_data.price_change_percentage_7d.toFixed(
                2,
              )}%`}
            </CText>
            <CText
              style={{
                fontSize: 12,
                color: Colors1.secondaryText,
              }}>
              7D
            </CText>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CText
              style={{
                fontSize: 12,
                marginRight: 5,
                color:
                  data!.getCoinDetails.market_data.price_change_percentage_30d >
                  0
                    ? Colors1.positive
                    : Colors1.negative,
              }}>
              {`${
                data!.getCoinDetails.market_data.price_change_percentage_30d > 0
                  ? '+'
                  : ''
              }${data!.getCoinDetails.market_data.price_change_percentage_30d.toFixed(
                2,
              )}%`}
            </CText>
            <CText
              style={{
                fontSize: 12,
                color: Colors1.secondaryText,
              }}>
              30d
            </CText>
          </View>
        </View>
      </View>
      <View style={[styles.box]}>
        <View style={[{ marginBottom: 5 }]}>
          <CText bold style={{ fontSize: 16 }}>
            Coin Information:
          </CText>
        </View>
        <View style={styles.line}>
          <CText>Rank</CText>
          <CText>{data!.getCoinDetails.market_cap_rank + ''}</CText>
        </View>
        <View style={styles.line}>
          <CText>Marketkap.</CText>
          <CText>
            {formatNumber(data!.getCoinDetails.market_data.market_cap) + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>Marketkap. Change %/24h</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data
                  .market_cap_change_percentage_24h > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {data!.getCoinDetails.market_data.market_cap_change_percentage_24h.toFixed(
              2,
            ) + '%'}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'Marketkap. Change ' + symbol + '/24h'}</CText>
          <CText>
            {formatNumber(
              parseFloat(
                data!.getCoinDetails.market_data.market_cap_change_24h.toFixed(
                  0,
                ),
              ),
            ) + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'Volume in ' + symbol + '/24h'}</CText>
          <CText>
            {formatNumber(
              parseFloat(
                data!.getCoinDetails.market_data.total_volume.toFixed(0),
              ),
            ) + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'24h High'}</CText>
          <CText>
            {formatNumber(
              parseFloat(data!.getCoinDetails.market_data.high_24h.toFixed(0)),
            ) + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'24h Low'}</CText>
          <CText>
            {formatNumber(
              parseFloat(data!.getCoinDetails.market_data.low_24h.toFixed(0)),
            ) + symbol}
          </CText>
        </View>
      </View>
      <View style={[styles.box]}>
        <View style={[{ marginBottom: 5 }]}>
          <CText bold style={{ fontSize: 16 }}>
            Coin Movement:
          </CText>
        </View>
        <View style={styles.line}>
          <CText>24h %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_24h > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_24h > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_24h.toFixed(
              2,
            )}%`}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>7d %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_7d > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_7d > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_7d.toFixed(
              2,
            )}%`}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>14d %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_14d > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_14d > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_14d.toFixed(
              2,
            )}%`}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>30d %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_30d > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_30d > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_30d.toFixed(
              2,
            )}%`}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>60d %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_60d > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_60d > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_60d.toFixed(
              2,
            )}%`}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>200d %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_200d >
                0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_200d > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_200d.toFixed(
              2,
            )}%`}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>1y %</CText>
          <CText
            style={{
              color:
                data!.getCoinDetails.market_data.price_change_percentage_1y > 0
                  ? Colors1.positive
                  : Colors1.negative,
            }}>
            {`${
              data!.getCoinDetails.market_data.price_change_percentage_1y > 0
                ? '+'
                : ''
            }${data!.getCoinDetails.market_data.price_change_percentage_1y.toFixed(
              2,
            )}%`}
          </CText>
        </View>
      </View>
      <View style={[styles.box, styles.historical]}>
        <View style={[{ marginBottom: 5 }]}>
          <CText bold style={{ fontSize: 16 }}>
            Historical Information:
          </CText>
        </View>
        <View style={styles.line}>
          <CText bold>{'All Time High '}</CText>
        </View>
        <View style={styles.line}>
          <CText>{'Price '}</CText>
          <CText>
            {formatNumber(data!.getCoinDetails.market_data.ath) + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'%'}</CText>
          <CText>
            {data!.getCoinDetails.market_data.ath_change_percentage.toFixed(1) +
              '%'}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'Date'}</CText>
          <CText>
            {moment(data!.getCoinDetails.market_data.ath_date).format(
              'DD.MM.YYYY',
            )}
          </CText>
        </View>

        <View style={[styles.line, { marginTop: 10 }]}>
          <CText bold>{'All Time Low '}</CText>
        </View>
        <View style={styles.line}>
          <CText>{'Price '}</CText>
          <CText>
            {data!.getCoinDetails.market_data.atl.toFixed(2) + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'%'}</CText>
          <CText>
            {data!.getCoinDetails.market_data.atl_change_percentage.toFixed(1) +
              '%'}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'Date'}</CText>
          <CText>
            {moment(data!.getCoinDetails.market_data.atl_date).format(
              'DD.MM.YYYY',
            )}
          </CText>
        </View>
      </View>
      <View style={styles.box}>
        <View style={[{ marginBottom: 5 }]}>
          <CText bold style={{ fontSize: 16 }}>
            General Information:
          </CText>
        </View>
        <View style={styles.line}>
          <CText>Block Generation Time</CText>
          <CText>{data?.getCoinDetails.block_time_in_minutes + ' min'}</CText>
        </View>
        <View style={styles.line}>
          <CText>Algorithmus</CText>
          <CText>{data?.getCoinDetails.hashing_algorithm + ''}</CText>
        </View>
        <View style={styles.line}>
          <CText>Genesis Date</CText>
          <CText>
            {moment(data?.getCoinDetails.genesis_date).format('DD.MM.YYYY')}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'Supply '}</CText>
          <CText>
            {data!.getCoinDetails.market_data.total_supply !== null
              ? formatNumber(
                  parseFloat(
                    data!.getCoinDetails.market_data.total_supply.toFixed(0),
                  ),
                )
              : 'infinity' + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>{'Circulating '}</CText>
          <CText>
            {data!.getCoinDetails.market_data.total_supply !== null
              ? formatNumber(
                  parseFloat(
                    data!.getCoinDetails.market_data.circulating_supply.toFixed(
                      0,
                    ),
                  ),
                )
              : 'infinity' + symbol}
          </CText>
        </View>
        <View style={styles.line}>
          <CText>Categories</CText>
          <View>
            {data!.getCoinDetails.categories.map(cat => (
              <CText key={cat}>{cat}</CText>
            ))}
          </View>
        </View>
      </View>
      <View style={{ height: 60 }}></View>
    </ScrollView>
  );
};

export default DetailsCrypto;

const styles = StyleSheet.create({
  diagramm: {
    backgroundColor: 'red',
    height: 200,
    width: '100%',
  },
  diagrammDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
  },
  box: {
    backgroundColor: Colors1.lighter,
    marginTop: 5,
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingRight: 15,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 25,
    paddingStart: 25,
    borderBottomColor: Colors1.primary,
    borderBottomWidth: 0.5,
  },
  historical: {},
});
