import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Internet} from '../../assets/icons';
import CustomText from '../Text/CustomText';
import MyTouchableOpacity from '../Button/MyTouchableOpacity';
import useLanguage from '../../hooks/useLanguage';

const InternetScreen = ({onUpdate}: {onUpdate: () => void}) => {
  const t = useLanguage();
  return (
    <View style={styles.container}>
      <Internet />
      <CustomText lebel={t('notInternet')} size={16} mrTop={12} />
      <MyTouchableOpacity
        onPress={onUpdate}
        style={{width: '80%', marginTop: 12}}>
        <CustomText lebel={t('update')} color="white" size={16} />
      </MyTouchableOpacity>
    </View>
  );
};

export default InternetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
