import React, {useEffect} from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {icons} from '../../config/CategorieConstants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors1} from '../../styles/color';
interface Props {
  value: string | null;
  changeValue: CallableFunction;
}
function IconDropDown({value, changeValue}: Props) {
  const [open, setOpen] = useState(false);
  const [ddvalue, setddValue] = useState(value === null ? '' : value);
  const [items, setItems] = useState(
    icons.map(icon => ({
      label: icon,
      value: icon,
      icon: () => (
        <Icon name={icon} key={icon} size={20} color={Colors1.primaryText} />
      ),
    })),
  );
  useEffect(() => {
    changeValue(ddvalue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ddvalue]);
  return (
    <DropDownPicker
      searchable={true}
      theme="DARK"
      placeholder="Select Icon"
      open={open}
      value={ddvalue}
      items={items}
      setOpen={setOpen}
      setValue={setddValue}
      setItems={setItems}
      zIndex={3000}
      zIndexInverse={1000}
      style={{marginBottom: 7}}
    />
  );
}
export default IconDropDown;
