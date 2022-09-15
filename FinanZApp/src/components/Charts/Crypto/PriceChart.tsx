import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CText from '../../shared/CText';
import { Colors1 } from '../../../styles/color';
import { useQuery } from '@apollo/client';
import { GETCOINGRAPHHISTORY } from '../../../queries/GetCoinGraphHistory';
import { useCryptoCurrency } from '../../../hooks/useCryptoCurrency';
import { LineChart } from 'react-native-chart-kit';
import {
  IGetCoinGraphHistory,
  InputType,
} from '../../../queries/types/IGetCoinGraphHistory';
import moment from 'moment';
import Spinner from '../../shared/Spinner';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: () => Colors1.secondaryText,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

interface Props {
  id: string;
}
const PriceChart = ({ id }: Props) => {
  // time in days to display graph
  const [time, setTime] = useState(7);
  const [dData, setDData] = useState<LineChartData>();

  const { currency, symbol } = useCryptoCurrency();

  const changeDay = (day: number) => {
    setTime(day);
  };
  const { data, loading, error, refetch } = useQuery<
    IGetCoinGraphHistory,
    InputType
  >(GETCOINGRAPHHISTORY, {
    variables: { id, vs_currency: currency, days: time },
    skip: !id,
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setDData({
        labels: data.getCoinGraphHistory.prices.map(pr => showYAxis(pr[0])),
        datasets: [
          {
            data: data!.getCoinGraphHistory.prices.map(pr => pr[1]),
            color: (opacity = 1) => Colors1.positive,
          },
        ],
        legend: ['Price'],
      });
    },
  });

  const showXAxis = (length: number) => {
    console.log('actuall time: ', time);

    if (time === 1825) {
      return Array.from({ length }, (v, k) => (k % 365 === 0 ? 1 : k));
    } else if (time === 365) {
      return Array.from({ length }, (v, k) => (k % 60 === 0 ? 1 : k));
    } else if (time === 180) {
      return Array.from({ length }, (v, k) => (k % 30 === 0 ? 1 : k));
    } else if (time === 30) {
      return Array.from({ length }, (v, k) => (k % 50 === 0 ? 1 : k));
    } else if (time === 7) {
      return Array.from({ length }, (v, k) => (k % 24 === 0 ? 1 : k));
    } else if (time === 1) {
      return Array.from({ length }, (v, k) => (k % 24 === 0 ? 1 : k));
    } else {
      return Array.from(
        { length: data!.getCoinGraphHistory.prices.length },
        (v, k) => (k % 10 === 0 ? 2 : k),
      );
    }
  };
  const showYAxis = (xLabel: number) => {
    if (time === 1825) {
      return moment(xLabel).format('YYYY');
    }
    if (time === 365) {
      return moment(xLabel).format('MMM');
    }
    if (time === 180) {
      return moment(xLabel).format('MMM');
    }
    if (time === 30) {
      return moment(xLabel).format('D.MMM');
    }
    if (time === 7) {
      return moment(xLabel).format('ddd');
    }
    if (time === 1) {
      return moment(xLabel).format('k:mm');
    } else {
      return moment(xLabel).format('k:mm');
    }
  };
  //update graph when time changes
  useEffect(() => {
    refetch();
  }, [time]);
  const screenWidth = Dimensions.get('window').width;

  if (loading) return <Spinner />;
  return (
    <View>
      {dData ? (
        <LineChart
          data={dData}
          width={screenWidth}
          withShadow={false}
          height={250}
          verticalLabelRotation={90}
          chartConfig={chartConfig}
          bezier
          withDots={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          yAxisSuffix={symbol}
          onDataPointClick={() => console.log('click')}
          horizontalLabelRotation={0}
          xLabelsOffset={-20}
          yLabelsOffset={0}
          hidePointsAtIndex={showXAxis(data!.getCoinGraphHistory.prices.length)}
        />
      ) : (
        <CText>Fetch new Data</CText>
      )}
      <View style={[styles.box, styles.diagrammDays]}>
        <Pressable
          style={time === 0.4 ? styles.active : null}
          onPress={() => changeDay(0.4)}>
          <CText bold>1h</CText>
        </Pressable>
        <Pressable
          style={time === 1 ? styles.active : null}
          onPress={() => changeDay(1)}>
          <CText bold>1D</CText>
        </Pressable>
        <Pressable
          style={time === 7 ? styles.active : null}
          onPress={() => changeDay(7)}>
          <CText bold>7D</CText>
        </Pressable>
        <Pressable
          style={time === 30 ? styles.active : null}
          onPress={() => changeDay(30)}>
          <CText bold>30D</CText>
        </Pressable>
        <Pressable
          style={time === 180 ? styles.active : null}
          onPress={() => changeDay(180)}>
          <CText bold>6M</CText>
        </Pressable>
        <Pressable
          style={time === 365 ? styles.active : null}
          onPress={() => changeDay(365)}>
          <CText bold>1Y</CText>
        </Pressable>
        <Pressable
          style={time === 1825 ? styles.active : null}
          onPress={() => changeDay(1825)}>
          <CText bold>5Y</CText>
        </Pressable>
      </View>
    </View>
  );
};

export default PriceChart;

const styles = StyleSheet.create({
  diagramm: {
    backgroundColor: 'gray',
    height: 200,
    width: '100%',
  },
  diagrammDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  box: {
    backgroundColor: Colors1.lighter,
    marginTop: 5,
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  active: {
    backgroundColor: Colors1.primary,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
