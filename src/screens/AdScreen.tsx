import {Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import CustomText from '../components/Text/CustomText';
import OtherHeader from '../components/MyHeader/OtherHeader';
import {colors} from '../helpers/Colors';
import {CallIcon, Clock, Road, Road2} from '../assets/icons';
import MyTouchableOpacity from '../components/Button/MyTouchableOpacity';
import {useRoute} from '@react-navigation/native';
import {
  isDate,
  onCheckingLocatonLang,
  phoneString,
  priceFormat,
  time,
} from '../helpers/helpers';
import {LanguageContext} from '../context/LanguageContext';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {increaseCount} from '../redux/apis/userApi';
import useLanguage from '../hooks/useLanguage';
import {fonts} from '../helpers/fonts';
let images = [
  require('.././assets/images/car.png'),
  require('.././assets/images/train.png'),
  require('.././assets/images/plane.png'),
  require('.././assets/images/man.png'),
  require('.././assets/images/luggage.png'),
];

const AdScreen = () => {
  const {item, type} = useRoute().params;
  const t = useLanguage();
  const {language} = useContext(LanguageContext);
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const onCall = useCallback(() => {
    dispatch(increaseCount(item.id));
    Linking.openURL(`tel:${item?.phone_number}`);
  }, [dispatch, item]);
  return (
    <View style={styles.cn}>
      <OtherHeader title={type !== 'del' ? t('Kuryerlar') : t('yuklar')} />
      <ScrollView>
        <View style={styles.main}>
          <Details item={item} type={type} user={user} t={t} lang={language} />
          <SendDetailsTime item={item} lang={language} t={t} />
          <UserDetails item={item} t={t} />
          <View style={styles.mnTop}>
            <MyTouchableOpacity onPress={onCall} style={styles.button}>
              <CallIcon color={colors.white} />
              <CustomText
                mnLeft={8}
                lebel={t('call')}
                color={colors.white}
                size={16}
              />
            </MyTouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Details = ({
  item,
  type,
  t,
  lang,
}: {
  item: any;
  type: 'del' | 'pass';
  t: any;
  lang: any;
}) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.rowx}>
        <Road2 />
        <View style={styles.con}>
          <View style={styles.row}>
            <CustomText
              lebel={
                item?.from_region[`${onCheckingLocatonLang(lang)}`] +
                ', ' +
                item.from_city[`${onCheckingLocatonLang(lang)}`]
              }
              size={16}
            />
            {/* <TouchableOpacity
              onPress={() => {
                if (item.is_liked) {
                  dispatch(
                    deleteFavourite({add_id: item.id}),
                    setIsActive(!active),
                  ).then(() => {
                    dispatch(getPercelsAction());
                  });
                } else {
                  dispatch(
                    addFavourite({add_id: item.id}),
                    setIsActive(!active),
                  ).then(() => {
                    dispatch(getPercelsAction());
                  });
                }
              }}>
              <HeartActiveIcon
                fill={active ? colors.red['600'] : colors.white}
                borderColor={'red'}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.city}>
            <CustomText
              lebel={
                item?.to_region[`${onCheckingLocatonLang(lang)}`] +
                ', ' +
                item.to_city[`${onCheckingLocatonLang(lang)}`]
              }
              size={16}
            />
          </View>
        </View>
      </View>
      {type !== 'del' ? isPercel(t, item) : isPassenger(item, t)}
      {type !== 'del' ? (
        <View style={styles.carsContaiener}>
          <View>
            <CustomText mrTop={10} lebel={t('izoh')} size={12} />
            <CustomText mrTop={10} size={16} lebel={item?.comment} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const SendDetailsTime = ({
  item,
  lang,
  t,
}: {
  item: any;
  lang: string;
  t: any;
}) => {
  return (
    <View style={[styles.detailsContainer, {marginVertical: 10}]}>
      <View style={[styles.rowx, styles.between]}>
        <CustomText lebel={t('price')} size={10} />
        <CustomText lebel={t('leaveTime')} size={10} />
      </View>
      <View style={[styles.rowx, styles.between, styles.top]}>
        <CustomText
          lebel={priceFormat(item?.price) + ' ' + t('sum')}
          size={14}
          fontFamily="SourceSansPro-Bold"
        />
        <View style={styles.rowx}>
          <Clock />
          <CustomText
            lebel={isDate(item.leaves_at, lang)}
            mnLeft={8}
            fontFamily="SourceSansPro-Bold"
          />
        </View>
      </View>
      <View style={[styles.rowx, styles.between, styles.top]}>
        {
          item.is_negotiable === true ? (
            <View style={styles.green}>
              <CustomText
                lebel={t('negotiable')}
                size={12}
                color={colors.white}
              />
            </View>
          ) : null
          // <View style={[styles.green, {backgroundColor: colors.red['600']}]}>
          //   <CustomText
          //     lebel={t('notNegotiable')}
          //     size={12}
          //     color={colors.white}
          //   />
          // </View>
        }
        <View style={styles.flexEnd}>
          <CustomText
            lebel={time(item.leaves_at)}
            fontFamily="SourceSansPro-Bold"
          />
        </View>
      </View>
    </View>
  );
};

const UserDetails = ({item, t}: {item: any; t: any}) => {
  return (
    <View style={styles.detailsContainer}>
      <CustomText lebel={t('Foydalanuvchi')} fontFamily="SourceSansPro-Bold" />
      <View style={styles.imageContainer}>
        <Image
          resizeMethod="auto"
          resizeMode="cover"
          defaultSource={require('../assets/images/UserProfileIcon.png')}
          source={{
            uri: item?.user?.avatar,
          }}
          style={styles.userImage}
        />
        <View style={styles.phoneNumber}>
          <CustomText lebel={item?.user?.name} />
          <CustomText
            lebel={phoneString(item?.user?.phone, 'hidden')}
            mrTop={10}
          />
        </View>
      </View>
    </View>
  );
};

const isPercel = (t: any, item: any) => {
  return (
    <>
      {item.luggage_type === 'people' ? (
        <View style={[styles.rowx, {marginTop: 8}]}>
          <Image
            source={require('../assets/images/man.png')}
            style={styles.image}
          />
          <View style={styles.rowx}>
            <Text style={styles.text}>
              {t('bringPeople') + ': '}
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {item.people_count}
              </Text>
            </Text>
          </View>
        </View>
      ) : null}
      {item.luggage_type === 'parcel' ? (
        <View style={[styles.rowx, {marginTop: 8}]}>
          <Image
            source={require('../assets/images/luggage.png')}
            style={styles.image}
          />
          <View style={styles.rowx}>
            <Text style={styles.text}>{t('bringLuggage')}</Text>
          </View>
        </View>
      ) : null}

      {item?.transport_name?.length !== 0 ? (
        <View style={[styles.rowx, {marginTop: 4}]}>
          <Image
            source={require('../assets/images/car.png')}
            style={styles.image}
          />
          <View style={styles.rowx}>
            <CustomText
              mnLeft={10}
              lebel={t('Mashina : Yuk olib ketamiz')}
              size={14}
            />
          </View>
        </View>
      ) : null}
      {item.car_number !== null ? (
        <View style={[styles.rowx, {marginTop: 4}]}>
          <Image
            source={require('../assets/images/numbers.png')}
            style={styles.image}
          />
          <View style={styles.rowx}>
            <CustomText
              mnLeft={10}
              lebel={'Raqami :' + carNumberEdit(item.car_number)?.toUpperCase()}
              size={14}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

const isPassenger = (item: any, t: any) => {
  console.log(item);
  const selectImage = () => {
    switch (item.transport_type) {
      case 'train':
        return images[1];
      case 'plain':
        return images[2];
    }
  };

  const selectText = () => {
    switch (item.transport_type) {
      case 'train':
        return t('train')?.toUpperCase();
      case 'plain':
        return t('plain')?.toUpperCase();
    }
  };

  switch (item.transport_type) {
    case 'car':
      return (
        <>
          {item.luggage_type === 'people' || item.luggage_type === 'both' ? (
            <View style={[styles.rowx, {marginTop: 8}]}>
              <Image
                source={require('../assets/images/man.png')}
                style={styles.image}
              />
              <View style={styles.rowx}>
                <Text style={styles.text}>
                  {t('take_passengers') + ': '}
                  <Text style={[styles.text, {fontWeight: 'bold'}]}>
                    {item.people_count}
                  </Text>
                </Text>
              </View>
            </View>
          ) : null}
          {item.luggage_type === 'parcel' || item.luggage_type === 'both' ? (
            <View style={[styles.rowx, {marginTop: 4}]}>
              <Image
                source={require('../assets/images/luggage.png')}
                style={styles.image}
              />
              <View style={styles.rowx}>
                <CustomText mnLeft={10} lebel={t('take_luggage')} size={14} />
              </View>
            </View>
          ) : null}
          <View style={[styles.rowx, {marginTop: 4}]}>
            <Image
              source={require('../assets/images/car.png')}
              style={styles.image}
            />
            <View style={styles.rowx}>
              <CustomText mnLeft={10} lebel={t('car')} size={14} />
              <CustomText
                mnLeft={3}
                lebel={String(item?.transport_name).toUpperCase()}
                fontFamily="SourceSansPro-Bold"
              />
            </View>
          </View>
          <View style={[styles.rowx, styles.numbersContainer]}>
            <Image
              source={require('../assets/images/numbers.png')}
              style={styles.image}
            />
            <View style={styles.rowx}>
              <CustomText mnLeft={10} lebel={t('Raqami')} size={14} />
              <CustomText
                mnLeft={3}
                lebel={carNumberEdit(item.car_number).toUpperCase()}
                fontFamily="SourceSansPro-Bold"
              />
            </View>
          </View>
        </>
      );
    default:
      return (
        <View>
          <View style={styles.transportType}>
            <Image source={selectImage()} style={styles.image} />
            <View style={styles.rowx}>
              <CustomText mnLeft={10} lebel={selectText()} size={14} />
              <CustomText mnLeft={4} lebel={t('byTransport')} size={14} />
            </View>
          </View>
          {item.luggage_type === 'people' ? (
            <View style={[styles.rowx, {marginTop: 4}]}>
              <Image
                source={require('../assets/images/man.png')}
                style={styles.image}
              />
              <View style={styles.rowx}>
                <CustomText
                  mnLeft={10}
                  lebel={t('bringPeople') + ': ' + item.people_count}
                  size={14}
                />
              </View>
            </View>
          ) : null}
          {item.luggage_type === 'parcel' ? (
            <View style={[styles.rowx, {marginTop: 4}]}>
              <Image
                source={require('../assets/images/luggage.png')}
                style={styles.image}
              />
              <View style={styles.rowx}>
                <CustomText mnLeft={10} lebel={t('bringLuggage')} size={14} />
              </View>
            </View>
          ) : null}
        </View>
      );
  }
};

export default AdScreen;

const styles = StyleSheet.create({
  cn: {
    flex: 1,
  },
  button: {flexDirection: 'row'},
  mnTop: {marginTop: 20},
  imageContainer: {marginTop: 10, flexDirection: 'row'},
  transportType: {
    marginTop: 8,
    flexDirection: 'row',
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: colors.neatural[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexEnd: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },
  phoneNumber: {
    marginLeft: 20,
  },
  // center: {alignItems: 'center', marginTop: 10},
  between: {
    justifyContent: 'space-between',
  },
  green: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: colors.green,
    borderRadius: 12,
  },
  top: {marginTop: 5, alignItems: 'center'},
  numbersContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  carsContaiener: {
    marginTop: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
  con: {
    width: '100%',
    paddingHorizontal: 16,
  },
  city: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 1,
  },
  rowx: {flexDirection: 'row', alignItems: 'center'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  text: {
    marginLeft: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});

const carNumberEdit = (text: string): string => {
  let c: string = '';
  text?.split('')?.forEach((item, index) => {
    if (index === 2) {
      c += ' ';
    }
    if (index === 6) {
      c += ' ';
    }
    c += item;
  });
  return c;
};
