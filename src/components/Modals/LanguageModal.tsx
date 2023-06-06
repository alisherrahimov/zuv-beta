import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';

import {colors} from '../../helpers/Colors';
import {Ring, RingFill} from '../../assets/icons';
import {LanguageContext} from '../../context/LanguageContext';
import {LangEnums} from '../../helpers/translate';
import {storage} from '../../helpers/dataStorage';
import useLanguage from '../../hooks/useLanguage';
import CustomText from '../Text/CustomText';
import MyTouchableOpacity from '../Button/MyTouchableOpacity';

const LanguageModal = ({bottomRef}: {bottomRef: any}) => {
  const t = useLanguage();
  const {language, setLanguage} = useContext(LanguageContext);
  const [languageValue, setLanguageValue] = useState<LangEnums>(language || '');

  function languageModalBtnHandler() {
    setLanguage?.(languageValue);
    storage.set('lang', languageValue);
    bottomRef?.current?.close();
  }

  const languageBtnsData = [
    {
      id: 1,
      label: 'Ўзбек',
      value: LangEnums.ЎЗ,
    },
    {
      id: 2,
      label: 'O’zbek',
      value: LangEnums.UZ,
    },
    {
      id: 3,
      label: 'Русский',
      value: LangEnums.RU,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      <View style={styles.titleContainer}>
        <CustomText
          lebel={t('chooseLang')}
          size={16}
          fontFamily="SourceSansPro-Bold"
        />
      </View>
      <View style={styles.btnContainer}>
        {languageBtnsData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setLanguageValue(item.value);
              setLanguage(item.value);
            }}
            key={index.toString()}
            style={styles.btn}>
            <CustomText lebel={item.label} size={16} />
            {language === item.value ? <RingFill /> : <Ring />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.checkCn}>
        <MyTouchableOpacity onPress={languageModalBtnHandler}>
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

export default LanguageModal;
