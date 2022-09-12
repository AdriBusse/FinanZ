import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { GETETFDATA } from '../../../queries/GetETFData';
import { CREATEETF } from '../../../queries/mutations/ETF/CreateETF';
import { globalStyles } from '../../../styles/global';
import CButton from '../../shared/CButton';
import ErrorAlert from '../../shared/ErrorAlert';
import CText from '../../shared/CText';
import CModal from '../../shared/CModal';
import CTextInput from '../../shared/CTextInput';
import { SEARCHETF } from '../../../queries/SearchETF';
import { ISearchETF } from '../../../queries/types/ISearchETF';
import Spinner from '../../shared/Spinner';
import CCard from '../../shared/CCard';
import { Colors1 } from '../../../styles/color';
import {
  ICreateETF,
  IReturn,
} from '../../../queries/types/mutations/ETF/ICreateETF';

interface Props {
  visible: boolean;
  toggle: CallableFunction;
}
function AddETFModal({ visible, toggle }: Props) {
  const [searchKey, setSearchKey] = useState('');
  const [selection, setSelection] = useState<string | undefined>();
  const [addETF] = useMutation<IReturn, ICreateETF>(CREATEETF, {
    refetchQueries: [{ query: GETETFDATA }],
    onCompleted: d => {
      console.log(d);

      setSearchKey('');
      toggle(false);
    },
  });

  const [search, { data, loading, error }] =
    useLazyQuery<ISearchETF>(SEARCHETF);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchKey.length > 2) {
        setSelection(undefined);
        search({ variables: { searchKey } });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  return (
    <CModal
      size="full"
      visible={visible}
      onClose={() => {
        toggle(false);
        setSearchKey('');
      }}>
      <View style={globalStyles.container}>
        <View style={[globalStyles.container, globalStyles.scroll]}>
          <CText heading={true}>Add a new ETF:</CText>
          <CTextInput
            placeholder="Enter ISIN"
            onChangeText={setSearchKey}
            value={searchKey}
            selectTextOnFocus={true}
            keyboardType={'default'}
          />
          {loading && <Spinner />}
          {error && <ErrorAlert>{`Error: ${error.message}`}</ErrorAlert>}
          {data && data.searchETF && (
            <Pressable
              onPress={() => setSelection(data.searchETF.isin)}
              style={[styles.search, selection ? styles.selected : null]}>
              <CCard>
                <CText>{data.searchETF.name}</CText>
                <View style={styles.row}>
                  <CText>ISIN: </CText>
                  <CText style={{ color: Colors1.secondaryText }}>
                    {data.searchETF.isin}
                  </CText>
                </View>
              </CCard>
            </Pressable>
          )}
          {selection && (
            <CButton
              title={'Add'}
              onPress={() => addETF({ variables: { isin: selection } })}
            />
          )}
        </View>
      </View>
    </CModal>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: Colors1.detail1,
  },
  row: {
    flexDirection: 'row',
  },
  search: {
    marginTop: 10,
    marginBottom: 10,
    padding: 2,
    borderRadius: 5,
    backgroundColor: Colors1.primary,
  },
});
export default AddETFModal;
