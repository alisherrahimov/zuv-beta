import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {styles} from './style';
import CustomText from '../Text/CustomText';
import {HeartActiveIcon, Line, Location, Radio, Road} from '../../assets/icons';
import {colors} from '../../helpers/Colors';

import {
  isDate,
  onCheckingLocatonLang,
  priceFormat,
  time,
} from '../../helpers/helpers';

import {
  addFavourite,
  deleteFavourite,
  getUserFavourite,
  increaseViewCount,
} from '../../redux/apis/userApi';
import {AppDispatch} from '../../redux/store';

import {
  setFavDelLocal,
  setLikedPercel,
} from '../../redux/reducers/percelReducer';
import {
  setFavDelCourLocal,
  setLikedCourier,
} from '../../redux/reducers/courierReducer';
import {setFavorites} from '../../redux/reducers/userReducer';

interface CardProps {
  item?: any;
  index?: number;
  navigation: any;
  lang: string;
  isActive: string;
  userID: number | null;
  type: number;
  t: any;
  dispatch: AppDispatch;
}

let images = [
  require('../../assets/images/car.png'),
  require('../../assets/images/train.png'),
  require('../../assets/images/plane.png'),
  require('../../assets/images/man.png'),
  require('../../assets/images/luggage.png'),
];
const Card: React.FC<CardProps> = ({
  item,
  navigation,
  lang,
  isActive,
  userID,
  type,
  t,
  dispatch,
}) => {
  const {
    luggage_type,
    transport_type,
    is_liked,
    leaves_at,
    is_negotiable,
    price,
    id,
    from_region,
    to_region,
  } = type === 1 ? item : item;

  const addHeart = useCallback(() => {
    if (userID !== null) {
      if (type === 2) {
        if (is_liked) {
          dispatch(deleteFavourite({add_id: id})).then(() => {
            dispatch(getUserFavourite());
          });
          if (isActive !== 'del') {
            dispatch(setLikedPercel({is: false, id}));
          } else {
            dispatch(setLikedCourier({is: false, id}));
          }
        } else {
          dispatch(addFavourite({add_id: id})).then(() => {
            dispatch(getUserFavourite());
          });
          if (isActive !== 'del') {
            dispatch(setLikedPercel({is: true, id}));
            dispatch(setFavorites({type: 'del', item}));
          } else {
            dispatch(setLikedCourier({is: true, id}));
            dispatch(setFavorites({type: 'courier', item}));
          }
        }
      } else {
        dispatch(deleteFavourite({add_id: id})).then(() => {
          dispatch(getUserFavourite());
        });
        dispatch(
          isActive !== 'del' ? setFavDelLocal({id}) : setFavDelCourLocal({id}),
        );
      }
    } else {
      navigation.navigate('PhoneNumberScreen');
    }
  }, [dispatch, id, isActive, is_liked, item, navigation, type, userID]);

  const count = useCallback(() => {
    dispatch(increaseViewCount({id: item.id}));
  }, [dispatch, item.id]);

  const HeightRoad = () => {
    let a: string =
      to_region[`${onCheckingLocatonLang(lang)}`] +
      item.to_city[`${onCheckingLocatonLang(lang)}`];
    return a.split('').slice(0, Math.round(a.length / 5));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        count();
        navigation.navigate('AdScreen', {
          item: type === 1 ? item : item,
          type: isActive,
        });
      }}
      style={styles.ctn}>
      <View style={styles.row}>
        <View style={styles.row}>
          {isActive !== 'del'
            ? isDel(luggage_type, type === 1 ? item : item, t)
            : isTransportType(transport_type, t, item)}
        </View>
        <View>
          <TouchableOpacity onPress={addHeart}>
            <HeartActiveIcon
              color={
                type === 1
                  ? colors.red[600]
                  : is_liked
                  ? colors.red[600]
                  : colors.white
              }
              borderColor={colors.red[600]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={[styles.info]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 8,
            }}>
            <View>
              <Radio />
            </View>
            <View style={{flexDirection: 'column'}}>
              {HeightRoad()?.map(() => {
                return (
                  <View
                    style={{
                      backgroundColor: colors.green,
                      height: 5,
                      width: 1,
                      marginTop: 3,
                    }}
                  />
                );
              })}
            </View>
            <View>
              <Location />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={styles.fl}>
              <View style={styles.rowx}>
                <View style={styles.fromcity}>
                  <CustomText
                    lebel={
                      from_region[`${onCheckingLocatonLang(lang)}`] +
                      ', ' +
                      item.from_city[`${onCheckingLocatonLang(lang)}`]
                    }
                    size={16}
                  />
                </View>
                <View style={{}}>
                  <CustomText lebel={t('leaveTime')} size={13} />
                  <CustomText
                    lebel={isDate(leaves_at, lang)}
                    textAlign="right"
                    size={13}
                    fontWeight="700"
                  />
                  <CustomText
                    size={13}
                    lebel={time(leaves_at)}
                    textAlign="right"
                    fontFamily="SourceSansPro-Bold"
                  />
                </View>
              </View>
            </View>

            <View>
              <View style={styles.x}>
                <View style={styles.fromcity}>
                  <CustomText
                    lebel={
                      to_region[`${onCheckingLocatonLang(lang)}`] +
                      ', ' +
                      item.to_city[`${onCheckingLocatonLang(lang)}`]
                    }
                    size={16}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rowb}>
        <View style={styles.row}>
          <Image
            defaultSource={require('../../assets/images/UserProfileIcon.png')}
            source={{uri: item?.user?.avatar}}
            style={[
              styles.image,
              {borderRadius: 50, backgroundColor: colors.neatural[100]},
            ]}
            resizeMode="cover"
          />
          <CustomText lebel={item?.user?.name} mnLeft={5} size={14} />
        </View>
        <View>
          <View style={styles.rw}>
            <CustomText lebel={t('price')} textAlign="right" size={13} />

            {item.is_negotiable ? (
              <View
                style={[
                  styles.green,
                  {
                    backgroundColor: colors.green,
                  },
                ]}>
                <CustomText
                  lebel={t('negotiable')}
                  size={11}
                  color={colors.white}
                />
              </View>
            ) : null}
          </View>
          <CustomText
            size={13}
            mrTop={5}
            lebel={priceFormat(price) + ' ' + t('sum')}
            textAlign="right"
            fontFamily="SourceSansPro-Bold"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const isTransportType = (type: string, t: any, item: any) => {
  switch (type) {
    case 'car':
      return (
        <>
          <Image style={[styles.image]} source={images[0]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText
              lebel={item?.transport_name?.toUpperCase()}
              mnLeft={5}
              size={14}
            />
            <CustomText
              lebel={t('byTransport')}
              mnLeft={5}
              size={14}
              opacity={0.5}
            />
          </View>
        </>
      );
    case 'train':
      return (
        <>
          <Image style={[styles.image]} source={images[1]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText
              lebel={t('train')?.toUpperCase()}
              mnLeft={5}
              size={14}
            />
            <CustomText
              lebel={t('byTransport')}
              mnLeft={5}
              size={14}
              opacity={0.5}
            />
          </View>
        </>
      );
    case 'plain':
      return (
        <>
          <Image style={[styles.image]} source={images[2]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText
              lebel={t('plain')?.toUpperCase()}
              mnLeft={5}
              size={14}
            />
            <CustomText
              lebel={t('byTransport')}
              mnLeft={5}
              size={14}
              opacity={0.5}
            />
          </View>
        </>
      );
    default:
      return (
        <>
          <Image style={[styles.image]} source={images[0]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText lebel={t('car')} mnLeft={5} size={14} />
            <CustomText
              lebel={t('byTransport')?.toUpperCase()}
              mnLeft={5}
              size={14}
              opacity={0.5}
            />
          </View>
        </>
      );
  }
};
const isDel = (type: string, item: any, t: any) => {
  switch (type) {
    case 'percel':
      return (
        <>
          <Image style={[styles.image]} source={images[4]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText
              lebel={t('parcel')}
              mnLeft={5}
              size={14}
              opacity={0.5}
            />
          </View>
        </>
      );
    case 'people':
      return (
        <>
          <Image style={[styles.image]} source={images[3]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText
              lebel={
                item?.people_count === 0
                  ? t('yolovchi')
                  : item?.people_count + ' ' + t('yolovchi')
              }
              mnLeft={5}
              size={14}
            />
          </View>
        </>
      );

    default:
      return (
        <>
          <Image style={[styles.image]} source={images[4]} resizeMode="cover" />
          <View style={styles.row}>
            <CustomText lebel={t('parcel')} mnLeft={5} size={14} />
          </View>
        </>
      );
  }
};
export default memo(Card);
