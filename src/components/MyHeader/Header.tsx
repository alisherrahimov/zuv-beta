import {View, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import {styles} from './style';
import {LogoWhite, SearchIcon} from '../../assets/icons';
import {colors} from '../../helpers/Colors';
import useLanguage from '../../hooks/useLanguage';
import CustomText from '../Text/CustomText';
import {useDispatch} from 'react-redux';
import {ActionType} from '../../redux/actionTypes';

interface TabProps {
  isActive: string;
  setIsActive: any;
  isSearch: boolean;
  bottomRef?: any;
}
const Header: React.FC<TabProps> = ({
  isActive,
  setIsActive,
  isSearch,
  bottomRef,
}) => {
  const t = useLanguage();

  const tabContent = [
    {
      id: 1,
      bgColor: isActive === 'del' ? colors.white : 'transparent',
      label: t('ImCourier'),
      image: require('../../assets/images/rocket.png'),
      onPress: () => setIsActive('del'),
    },
    {
      id: 2,
      bgColor: isActive === 'pass' ? colors.white : 'transparent',
      label: t('ImPassenger'),
      image: require('../../assets/images/man2.png'),
      onPress: () => setIsActive('pass'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View>
          <LogoWhite />
        </View>
        {isSearch ? (
          <TouchableOpacity
            onPress={() => {
              bottomRef.current?.open();
            }}
            style={styles.button}>
            <SearchIcon />
            <CustomText lebel={t('search')} color={colors.black} size={13} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          {tabContent.map((item, index: number) => {
            return (
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.tabButtons(item.bgColor as any)}
                key={index}>
                <Image style={styles.image as any} source={item.image} />
                <CustomText
                  pngLeft={4}
                  size={12}
                  lebel={item.label}
                  fontFamily={'SourceSansPro-Regular'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default memo(Header);
