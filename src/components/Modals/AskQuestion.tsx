import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import {colors} from '../../helpers/Colors';
import {Ring, RingFill} from '../../assets/icons';

import useLanguage from '../../hooks/useLanguage';
import CustomText from '../Text/CustomText';
import MyTouchableOpacity from '../Button/MyTouchableOpacity';
import {useAppDispatch} from '../../hooks/useStore';
import {editCourierAction} from '../../redux/apis/courier';
import {editPercelAction} from '../../redux/apis/percels';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {getActiveAds} from '../../redux/apis/userApi';

const AskQuestion = ({bottomRef, item}: {bottomRef: any; item: any}) => {
  const t = useLanguage();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('zuuv');

  function languageModalBtnHandler() {
    if (item.type === 'courier') {
      dispatch(
        editCourierAction({
          id: item.id,
          item: {status: 'inactive', resolved_by: value},
        }),
      ).then(() => {
        dispatch(getActiveAds({status: 'active'}));
        Toast.show({
          text1: t('answer'),
          type: 'tomatoToast',
          visibilityTime: 2000,
        });
      });
    } else {
      dispatch(
        editPercelAction({
          id: item.id,
          item: {status: 'inactive', resolved_by: value},
        }),
      ).then(() => {
        dispatch(getActiveAds({status: 'active'}));

        Toast.show({
          text1: t('answer'),
          type: 'tomatoToast',
          visibilityTime: 2000,
        });
      });
    }
    bottomRef?.current?.close();
  }

  const languageBtnsData = [
    {
      id: 1,
      label: t('by_zuv'),
      value: 'zuv',
    },
    {
      id: 2,
      label: t('by_other'),
      value: 'other',
    },
    {
      id: 3,
      label: t('no_is'),
      value: 'unresolved',
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <View style={styles.titleContainer}>
        <CustomText
          lebel={t('ads_success')}
          size={16}
          fontFamily="SourceSansPro-Bold"
        />
      </View>
      <View style={styles.btnContainer}>
        {languageBtnsData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setValue(item.value);
            }}
            key={index.toString()}
            style={styles.btn}>
            <CustomText lebel={item.label} size={16} />
            {item.value === value ? <RingFill /> : <Ring />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.checkCn}>
        <MyTouchableOpacity
          disabled={value === 'zuuv' ? true : false}
          style={{
            backgroundColor:
              value === 'zuuv' ? colors.red['200'] : colors.red['600'],
          }}
          onPress={languageModalBtnHandler}>
          <CustomText lebel={t('confirm')} size={16} color={colors.white} />
        </MyTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  titleContainer: {
    padding: 16,
  },
  text: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },

  checkCn: {
    padding: 16,
    marginBottom: 10,
  },
  btnContainer: {
    paddingHorizontal: 16,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: colors.neatural['300'],
    borderBottomWidth: 0.5,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingBottom: 20,
  },
});

export default AskQuestion;
