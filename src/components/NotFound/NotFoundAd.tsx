import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {AdNotFoundSVG} from '../../assets/icons';
import CustomText from '../Text/CustomText';
import useLanguage from '../../hooks/useLanguage';
import {colors} from '../../helpers/Colors';

const NotFoundAds: React.FC<{title: string}> = ({title}) => {
  const t = useLanguage();

  return (
    <View style={styles.cn}>
      <View style={styles.icon}>
        <AdNotFoundSVG />
        <View style={styles.text}>
          <CustomText
            lebel={t(title) ?? ''}
            color={colors.black}
            size={16}
            textAlign="center"
          />
        </View>
      </View>
    </View>
  );
};

export default NotFoundAds;
