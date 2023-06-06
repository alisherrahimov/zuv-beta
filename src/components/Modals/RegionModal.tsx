import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../hooks/useTypeSelector';
import CustomText from '../Text/CustomText';
import {colors} from '../../helpers/Colors';
import {regionsData} from '../../helpers/regions';

import {ActionType} from '../../redux/actionTypes';

const RegionModal = () => {
  const {regionModalVisible} = useTypedSelector(state => state.modalState);
  const dispatch = useDispatch();

  const onBackdropPress = useCallback(() => {
    dispatch({type: ActionType.SET_REGION_MODAL, payload: false});
  }, []);

  const setRegion = useCallback((item: any) => {
    dispatch({
      type: ActionType.SET_REGION,
      payload: {region: item?.label, id: item.value},
    });
    onBackdropPress();
  }, []);

  let RenderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setRegion(item);
        }}
        key={index.toString()}
        style={styles.btn}>
        <CustomText lebel={item?.label} />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={regionModalVisible}
      onBackdropPress={onBackdropPress}
      coverScreen={false}
      propagateSwipe={true}
      style={styles.modal}>
      <View style={styles.main}>
        <CustomText
          lebel="Viloyatlni tanlang"
          size={14}
          fontFamily="SourceSansPro-Bold"
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={regionsData.regions}
          renderItem={({item, index}) => {
            return (
              <RenderItem index={index} item={item} key={index.toString()} />
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default RegionModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  main: {
    height: 350,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  btn: {
    paddingVertical: 16,
    borderBottomColor: colors.neatural['200'],
    borderBottomWidth: 1,
  },
});
