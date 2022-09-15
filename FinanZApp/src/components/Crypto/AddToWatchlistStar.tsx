import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import WatchlistCryptoService from '../../services/WatchlistCryptoService';

interface Props {
  id: string;
}

const AddToWatchlistStar = ({ id }: Props) => {
  const [isInList, setIsInList] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const checkList = async () => {
      const check = await WatchlistCryptoService.isInList(id);
      setIsInList(check);
    };
    checkList();
  }, [toggle, id]);
  console.log('isInList', isInList);

  if (isInList) {
    return (
      <Icon
        name="star"
        size={24}
        onPress={async () => {
          await WatchlistCryptoService.removeFromList(id);
          setToggle(!toggle);
        }}
      />
    );
  } else {
    return (
      <Icon
        name="star-o"
        size={24}
        onPress={async () => {
          await WatchlistCryptoService.addToList(id);
          setToggle(!toggle);
        }}
      />
    );
  }
};

export default AddToWatchlistStar;

const styles = StyleSheet.create({});
