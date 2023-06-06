import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {LogoMain} from '../../assets/icons';

import {colors} from '../../helpers/Colors';

import {LanguageContext} from '../../context/LanguageContext';

import CustomText from '../../components/Text/CustomText';
import {LangEnums} from '../../helpers/translate';
import useLanguage from '../../hooks/useLanguage';
import {setStorage} from '../../helpers/dataStorage';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const {setLanguage} = useContext(LanguageContext);
  const t = useLanguage();

  function languageBtnHandler(value: LangEnums) {
    setLanguage?.(value);
    setStorage('lang', value);
    setStorage('1', '1');
    navigation.navigate('BottomNavigator');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <LogoMain />
      </View>
      <View style={styles.info}>
        <View style={styles.text}>
          <CustomText
            lebel={t('welcome')}
            fontFamily="SourceSansPro-Bold"
            size={22}
            lineHeight={22}
            fontWeight="700"
          />
          <CustomText
            lebel="O’zingizga qulay tilni tanlang"
            size={16}
            fontWeight="400"
            mrTop={15}
          />
        </View>
        <View style={styles.btnCon}>
          {languageBtnData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  languageBtnHandler(item.value);
                }}
                key={index.toString()}
                style={styles.btn}>
                <CustomText lebel={item.title} color={colors.white} size={16} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const languageBtnData = [
  {
    id: 1,
    title: 'RU',
    value: 'ru',
  },
  {
    id: 2,
    title: 'UZ',
    value: 'uz',
  },
  {
    id: 3,
    title: 'ЎЗ',
    value: 'kr',
  },
];

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 60,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    alignItems: 'center',
    flex: 0.4,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.red['600'],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
