import {View} from 'react-native';
import React, {useCallback} from 'react';
import {styles} from './styles';
import {AdNotFoundSVG} from '../../assets/icons';
import CustomText from '../Text/CustomText';
import useLanguage from '../../hooks/useLanguage';
import {colors} from '../../helpers/Colors';
import MyTouchableOpacity from '../Button/MyTouchableOpacity';

import {useNavigation} from '@react-navigation/native';
import {storage} from '../../helpers/dataStorage';
interface NotFoundProps {
  active: string;
  bottomRef2: any;
}
const NotFound: React.FC<NotFoundProps> = ({active, bottomRef2}) => {
  const t = useLanguage();
  const navigation = useNavigation();

  const onCheckUserRegister = useCallback(async () => {
    let token = storage.getString('token');

    if (token?.length === 0) {
      navigation.navigate('PhoneNumberScreen');
    } else {
      //type 1 bulsa kuryer
      //type 2 bulsa yolovchi
      bottomRef2.current.open();
    }
  }, [bottomRef2, navigation]);

  return (
    <View style={styles.cn}>
      <View style={styles.icon}>
        <AdNotFoundSVG />
        <View style={styles.text}>
          <CustomText lebel={t('noAdRequest')} color={colors.black} size={16} />
        </View>
      </View>
      <View>
        <CustomText
          textAlign="center"
          lebel={t('contactYouText')}
          color={colors.black}
          size={16}
        />
        <View style={styles.btnContainer}>
          <MyTouchableOpacity onPress={onCheckUserRegister}>
            <CustomText lebel={t('postAd')} color={colors.white} size={16} />
          </MyTouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotFound;
