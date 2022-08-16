import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {IGetExpenseCategories} from '../../queries/types/IGetExpenseCategories';
import {GETEXPENSECATEGORIES} from '../../queries/GetExpenseCategories';
import ErrorAlert from '../shared/ErrorAlert';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors1} from '../../styles/color';
import {globalStyles} from '../../styles/global';
import Spinner from '../shared/Spinner';

interface Props {
  value: string | null;
  changeValue: CallableFunction;
}
const CategoryDropDown = ({value, changeValue}: Props) => {
  const [open, setOpen] = useState(false);
  const [ddvalue, setddValue] = useState<string | null>(
    value === null ? '' : value,
  );
  const [items, setItems] = useState<any>();
  const {error, loading} = useQuery<IGetExpenseCategories>(
    GETEXPENSECATEGORIES,
    {
      onCompleted: res => {
        const formatted: any = [];
        res.getExpenseCategories.forEach(element => {
          formatted.push({label: element.name, value: element.id});
        });
        setItems(formatted);
      },
    },
  );
  useEffect(() => {
    changeValue(ddvalue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddvalue]);

  if (error) {
    console.log('____Error____');
    console.log(error);
    return <ErrorAlert>{`Error: ${error.message}`}</ErrorAlert>;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <DropDownPicker
      theme="DARK"
      open={open}
      value={ddvalue}
      items={items}
      setOpen={setOpen}
      setValue={setddValue}
      setItems={setItems}
      style={globalStyles.Input}
      textStyle={styles.textstyle}
    />
  );
};

export default CategoryDropDown;

const styles = StyleSheet.create({
  textstyle: {color: Colors1.secondaryText, fontSize: 18},
});
