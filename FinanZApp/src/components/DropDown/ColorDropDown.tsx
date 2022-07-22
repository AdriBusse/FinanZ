import React, {useEffect} from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../config/CategorieConstants';
import Icon from 'react-native-vector-icons/FontAwesome5';
interface Props {
  value: string | null;
  changeValue: CallableFunction;
}
function ColorDropDown({value, changeValue}: Props) {
  const [open, setOpen] = useState(false);
  const [ddvalue, setddValue] = useState(value === null ? '' : value);
  const [items, setItems] = useState(
    colors.map(color => ({
      label: '',
      value: color,
      icon: () => <Icon key={color} name={'stop'} size={20} color={color} />,
    })),
  );
  useEffect(() => {
    changeValue(ddvalue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddvalue]);

  return (
    <DropDownPicker
      theme="DARK"
      placeholder="Select Color"
      open={open}
      value={ddvalue}
      items={items}
      setOpen={setOpen}
      setValue={setddValue}
      setItems={setItems}
      zIndex={2000}
      zIndexInverse={2000}
    />
  );
}

export default ColorDropDown;
