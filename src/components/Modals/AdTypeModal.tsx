import React from 'react';

import {colors} from '../../helpers/Colors';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import useLanguage from '../../hooks/useLanguage';
import CustomText from '../Text/CustomText';
let airPlane = require('../../assets/images/rocket.png');
let person = require('../../assets/images/man2.png');
const AdTypeModal = ({bottomRef}: {bottomRef: any}) => {
  const navigation: any = useNavigation();
  const t = useLanguage();

  function moveToAdScreen(type: string) {
    navigation.navigate('AddScreen', {type: type});
    bottomRef?.current?.close();
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.titleContainer}>
        <CustomText
          lebel={t('whoYou')}
          size={16}
          fontFamily="SourceSansPro-Bold"
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            moveToAdScreen('1');
          }}
          style={styles.btn}>
          <Image source={airPlane} style={styles.image} />
          <CustomText
            lebel={t('Kuryerlar2')}
            size={16}
            fontFamily="SourceSansPro-Regular"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            moveToAdScreen('2');
          }}
          style={styles.btn}>
          <Image source={person} style={styles.image} />
          <CustomText
            textAlign="center"
            lebel={t('client')}
            size={16}
            style={{maxWidth: '80%'}}
            fontFamily="SourceSansPro-Regular"
          />
        </TouchableOpacity>
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
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingBottom: 100,
  },
  image: {
    width: 24,
    height: 24,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: colors.neatural['200'],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    paddingVertical: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
});

export default AdTypeModal;
