import {Dimensions, View} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import {IExpenseByCategory} from '../../../queries/types/IGetExpense';
import {Colors1} from '../../../styles/color';
import hexRgb from 'hex-rgb';

interface Props {
  categories: IExpenseByCategory[];
}
const PieChartByCategory = ({categories}: Props) => {
  const screenWidth = Dimensions.get('window').width;

  let chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  // categories.sort((a, b) => b.amount - a.amount);
  return (
    <View>
      <PieChart
        data={categories.map(c => {
          const rgbColor = hexRgb(c.color || '#000000');
          return {
            ...c,
            legendFontSize: 13,
            legendFontColor: Colors1.secondaryText,
            color: `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}, .6)`,
          };
        })}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={'amount'}
        backgroundColor={'transparent'}
        paddingLeft={'5'}
        absolute
      />
    </View>
  );
};

export default PieChartByCategory;
