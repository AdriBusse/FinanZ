import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Transaction} from '../../../queries/types/IGetETFDetails';
import moment from 'moment';
import {Colors1} from '../../../styles/color';

interface Props {
  transactions: Transaction[];
}
const ETFLineChart = ({transactions}: Props) => {
  let accInvest = 0;
  const screenWidth = Dimensions.get('window').width;

  const dataNew = {
    labels: transactions.map(t => {
      return moment(t.createdAt).format('DD MM YY');
    }),
    datasets: [
      {
        data: transactions.map(t => {
          accInvest += t.invest + t.fee;
          return accInvest;
        }),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: transactions.map(t => {
          return t.value;
        }),
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Invest', 'Worth'],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: () => Colors1.secondaryText,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={styles.box}>
      <LineChart
        data={dataNew}
        width={screenWidth}
        withShadow={false}
        height={270}
        verticalLabelRotation={90}
        chartConfig={chartConfig}
        bezier
        withDots={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        yAxisSuffix=" €"
        onDataPointClick={() => console.log('click')}
        horizontalLabelRotation={0}
        xLabelsOffset={-20}
        yLabelsOffset={0}
        formatYLabel={value => {
          return value.slice(0, -3);
        }}
      />
    </View>
  );
};

export default ETFLineChart;

const styles = StyleSheet.create({
  box: {
    left: -20,
    marginBottom: 10,
  },
});
