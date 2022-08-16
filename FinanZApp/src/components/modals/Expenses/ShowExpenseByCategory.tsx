import React from 'react';
import {ScrollView, View} from 'react-native';
import {IExpenseByCategory} from '../../../queries/types/IGetExpense';
import {globalStyles} from '../../../styles/global';
import CCard from '../../shared/CCard';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors1} from '../../../styles/color';
import {formatNumber} from '../../../helpers/formatNumber';
import PieChartByCategory from '../../Charts/Expense/PieChartByCategory';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
  categories: IExpenseByCategory[];
}
function ShowExpenseByCategoryModal({visible, toggle, categories}: Props) {
  return (
    <CModal size="full" visible={visible} onClose={toggle}>
      <ScrollView style={[globalStyles.scroll]}>
        <PieChartByCategory categories={categories} />
        {categories.map((category, index) => {
          return (
            <View>
              <CCard key={index}>
                <View
                  style={[
                    globalStyles.transCard,
                    {backgroundColor: Colors1.primary},
                    {padding: 5, alignItems: 'center', borderRadius: 5},
                  ]}>
                  <Icon name={category.icon} color={category.color} />
                  <CText>{category.name}</CText>
                  <CText>{formatNumber(category.amount)}</CText>
                </View>
              </CCard>
            </View>
          );
        })}
      </ScrollView>
    </CModal>
  );
}

export default ShowExpenseByCategoryModal;
