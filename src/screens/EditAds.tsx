import React, {
  SetStateAction,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {CalendarIcon, Clock, LocationIcon2} from '../assets/icons';

import {colors} from '../helpers/Colors';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import OtherHeader from '../components/MyHeader/OtherHeader';
import CustomText from '../components/Text/CustomText';
import MyInput from '../components/Input/MyInput';
import {Switch} from 'react-native-gesture-handler';
import MyTouchableOpacity from '../components/Button/MyTouchableOpacity';
import {useNavigation, useRoute} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CityModal from '../components/Modals/CityModal';
import * as yup from 'yup';
import {useAppDispatch} from '../hooks/useStore';
import {editPercelAction} from '../redux/apis/percels';
import {editCourierAction} from '../redux/apis/courier';
import DatePicker from 'react-native-date-picker';
import {dateToString, dateToTime} from '../components/Modals/FilterModal';

import {LanguageContext} from '../context/LanguageContext';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {getActiveAds, getUserAction} from '../redux/apis/userApi';
import useLanguage from '../hooks/useLanguage';
import {onCheckingLocatonLang} from '../helpers/helpers';

const {height} = Dimensions.get('screen');
interface ButtonProps {
  width?: string;
  title: string;
  icon: React.ReactElement;
  marginTop?: number;
  marginBottom?: number;
  onPress: () => void;
  valid?: boolean;
}
interface SelectButtonProps {
  title: string;
  image: string;
  width: string;
  mnTop?: number;
  valid?: boolean | undefined;
  active?: boolean;
  onPress?: () => void;
}
interface PostDataInterface {
  transport_type: string;
  transport_name: string;
  car_number: string;
  people_count: number;
  comment: string;
  is_negotiable: boolean;
  price: string;
  from_region: string;
  to_region: string;
  from_region_name: string;
  to_region_name: string;
  leaves_at: string;
  luggage_type: string;
  phone_number: string;
  type: string;
  arrives_at?: number;
  from_city: string;
  to_city: string;
}
interface ErrorProps {
  from_region?: boolean | undefined;
  to_region?: boolean | undefined;
  price?: boolean | undefined;
  leaves_at?: boolean | undefined;
  arrives_at?: boolean | undefined;
  type?: boolean | undefined;
  transport_type?: boolean | undefined;
  transport_name?: boolean | undefined;
  luggage_type?: boolean | undefined;
  luggage_size?: boolean | undefined;
  luggage_image?: boolean | undefined;
  people_count?: boolean | undefined;
  comment?: boolean | undefined;
  isNegotiable?: boolean | undefined;
  phone_number?: boolean | undefined;
  car_number?: boolean | undefined;
  car_type?: boolean | undefined;
  time?: boolean | undefined;
}

let image = {
  person: require('../assets/images/man.png'),
  boat: require('../assets/images/luggage.png'),
  car: require('../assets/images/car.png'),
  air: require('../assets/images/plane.png'),
  train: require('../assets/images/train.png'),
};

let schema = yup.object().shape({
  from_region: yup.string().required(),
  to_region: yup.string().required(),
  from_city: yup.string().required(),
  to_city: yup.string().required(),
  leaves_at: yup.string().required().min(2),
  type: yup.string().required(),
  luggage_type: yup.string().required(),
  phone_number: yup.string().required(),
  // car_number: yup.string().required(),
  // transport_name: yup.string().required(),
  comment: yup.string().required(),
  price: yup.string().required(),
  time: yup.string().required(),
});

let schemaNotCar = yup.object().shape({
  from_region: yup.string().required(),
  to_region: yup.string().required(),
  from_city: yup.string().required(),
  to_city: yup.string().required(),
  leaves_at: yup.string().required().min(2),
  type: yup.string().required(),
  luggage_type: yup.string().required(),
  phone_number: yup.string().required(),
  // car_number: yup.string().required(),
  // transport_name: yup.string().required(),
  comment: yup.string().required(),
  price: yup.string().required(),
  time: yup.string().required(),
});

let error = {
  from_region: false,
  to_region: false,
  price: false,
  leaves_at: false,
  arrives_at: false,
  type: false,
  transport_type: false,
  transport_name: false,
  luggage_type: false,
  luggage_size: false,
  luggage_image: false,
  people_count: false,
  comment: false,
  isNegotiable: false,
  phone_number: false,
  car_number: false,
  car_type: false,
};

const EditAds = () => {
  //type 1 bulsa kuryer
  //type 2 bulsa yolovchi
  const {type, item} = useRoute().params;
  const dispatch = useAppDispatch();

  const {language} = useContext(LanguageContext);
  const navigation = useNavigation();
  const t = useLanguage();

  const bottomRef = useRef(null);
  const [local_luggage_type, setLocal_Luggage_Type] = useState({
    first:
      item.luggage_type === 'both'
        ? true
        : item.luggage_type === 'parcel'
        ? true
        : false,
    second:
      item.luggage_type === 'both'
        ? true
        : item.luggage_type === 'people'
        ? true
        : false,
  });
  const [value, setValue] = useState<PostDataInterface>({
    transport_type: item?.transport_type,
    transport_name: item?.transport_name,
    car_number: item?.car_number,
    people_count: item?.people_count,
    comment: item?.comment,
    is_negotiable: item?.is_negotiable,
    price: item?.price,
    from_region: item?.from_region.id,
    to_region: item?.to_region?.id,
    from_region_name: item?.from_region[onCheckingLocatonLang(language)],
    to_region_name: item?.to_region[onCheckingLocatonLang(language)],
    leaves_at: item?.leaves_at,
    luggage_type: item?.luggage_type,
    phone_number: item.phone_number,
    type: type === 1 ? 'parcel' : 'courier',
    arrives_at: item?.arrives_at,
    from_city: item?.from_city.id,
    to_city: item?.to_city.id,
  });

  const [errors, setErrors] = useState<ErrorProps>({});
  const [regionType, setRegionType] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  const [itemType, setItemType] = useState<boolean>(false);
  const [transportType, setTransportType] = useState(() => {
    switch (item.transport_type) {
      case 'car':
        return 0;
      case 'train':
        return 1;
      case 'plain':
        return 2;
    }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState(item.leaves_at);

  const onPostAds = useCallback(async () => {
    let c = {};
    let obj = Object.create(c);
    try {
      if (value.transport_type === 'car') {
        await schemaNotCar.validate({...value, time}, {abortEarly: false});
      } else {
        await schema.validate({...value, time}, {abortEarly: false});
      }

      setLoading(true);
      Number(type) == 1
        ? dispatch(editCourierAction({id: item.id, item: value}))
            .then(res => {
              if (res.payload?.code === 1) {
                Toast.show({
                  type: 'tomatoToast',
                  autoHide: true,
                  text1: t('successAds'),
                  visibilityTime: 2000,
                });
                setLoading(false);
                dispatch(getActiveAds({status: 'active'}));
                setTimeout(() => {
                  navigation.navigate('BottomNavigator');
                }, 2000);
              } else {
                Toast.show({
                  type: 'tomatoToast',
                  autoHide: true,
                  text1: t('errorPostAds'),
                  visibilityTime: 2000,
                });
              }
              setLoading(false);
              dispatch(getUserAction());
            })
            .catch(() => {
              Toast.show({
                type: 'tomatoToast',
                autoHide: true,
                text1: t('errorPostAds'),
                visibilityTime: 2000,
              });
              setLoading(false);
            })
        : dispatch(editPercelAction({id: item.id, item: value}))
            .then(res => {
              if (res.payload?.code === 1) {
                Toast.show({
                  type: 'tomatoToast',
                  autoHide: true,
                  text1: t('successAds'),
                  visibilityTime: 2000,
                });
                setLoading(false);
                dispatch(getActiveAds({status: 'active'}));
                setTimeout(() => {
                  navigation.navigate('BottomNavigator');
                }, 2000);
              } else {
                Toast.show({
                  type: 'tomatoToast',
                  autoHide: true,
                  text1: t('errorPostAds'),
                  visibilityTime: 2000,
                });
              }
              setLoading(false);
              dispatch(getUserAction());
            })
            .catch(() => {
              Toast.show({
                type: 'tomatoToast',
                autoHide: true,
                text1: t('errorPostAds'),
                visibilityTime: 2000,
              });
              setLoading(false);
            });
    } catch (err: any) {
      err.inner.forEach((item: any) => {
        Object.keys(error).forEach(val => {
          if (item.path === val) {
            obj[val] = true;
          }
        });
      });
      setErrors(obj);
    }
  }, [dispatch, item.id, navigation, t, time, type, value]);

  const onPickDate = useCallback(
    (date: Date) => {
      let time = new Date(Number(date));
      setValue({...value, leaves_at: time.getTime().toString()});
      setOpen(false);
    },
    [value],
  );

  const renderCargoInput = useMemo(() => {
    return (
      <MyInput
        defaultValue={value.comment}
        style={[{flex: 1}, styles.input(errors.price)]}
        placeholder={t('exampleCom')}
        onChangeText={text => {
          setValue({...value, comment: text});
        }}
      />
    );
  }, [errors.price, value]);
  const renderSom = useMemo(() => {
    return (
      <MyInput
        value={value.price}
        style={[{flex: 1}, styles.input(errors.price)]}
        placeholder={'0'}
        onChangeText={text => {
          setValue({...value, price: text});
        }}
      />
    );
  }, [errors.price, value]);

  const renderDatePicker = useMemo(() => {
    return (
      <DatePicker
        modal={true}
        mode={'date'}
        date={new Date()}
        open={open}
        minimumDate={
          value.leaves_at.length === 0
            ? new Date()
            : new Date(Number(value.leaves_at))
        }
        onConfirm={onPickDate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    );
  }, [onPickDate, open, value.leaves_at]);

  const renderTimePicker = useMemo(() => {
    return (
      <DatePicker
        modal={true}
        mode={'time'}
        date={new Date()}
        open={open2}
        locale="uz"
        onConfirm={date => {
          let a = new Date(
            value.leaves_at.length === 0
              ? Date.now()
              : new Date(Number(value.leaves_at)),
          );
          a.setHours(date.getHours());
          a.setMinutes(date.getMinutes());
          setValue({...value, leaves_at: a.getTime().toString()});
          setTime(date);
          setOpen2(false);
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />
    );
  }, [open2, value.leaves_at]);

  const renderSelectButton = useMemo(() => {
    return (
      <>
        <SelectButton
          active={local_luggage_type.first}
          image={image.boat}
          title={t('yuk')}
          width={'48%'}
          onPress={() => {
            if (Number(type) === 1) {
              setLocal_Luggage_Type(pr => {
                if (pr.second === false && pr.first === true) {
                  setValue({...value, luggage_type: ''});
                } else {
                  if (pr.second && pr.first === false) {
                    setValue({...value, luggage_type: 'both'});
                  } else {
                    if (pr.second) {
                      setValue({...value, luggage_type: 'people'});
                    } else {
                      setValue({...value, luggage_type: 'parcel'});
                    }
                  }
                }

                return {
                  ...local_luggage_type,
                  first: !pr.first,
                };
              });
            } else {
              setLocal_Luggage_Type(pr => {
                return {
                  second: false,
                  first: !pr.first,
                };
              });
              setValue({...value, luggage_type: 'parcel'});
            }
          }}
        />
        <SelectButton
          active={local_luggage_type.second}
          image={image.person}
          title={t('passenger')}
          width={'48%'}
          onPress={() => {
            if (Number(type) === 1) {
              setLocal_Luggage_Type(pr => {
                if (pr.first === false && pr.second === true) {
                  setValue({...value, luggage_type: ''});
                } else {
                  if (pr.first && pr.second === false) {
                    setValue({...value, luggage_type: 'both'});
                  } else {
                    if (pr.first) {
                      setValue({...value, luggage_type: 'parcel'});
                    } else {
                      setValue({...value, luggage_type: 'people'});
                    }
                  }
                }
                return {
                  ...local_luggage_type,
                  second: !pr.second,
                };
              });
            } else {
              setLocal_Luggage_Type(pr => {
                setValue({...value, luggage_type: 'people'});
                return {
                  second: !pr.second,
                  first: false,
                };
              });
            }
          }}
        />
      </>
    );
  }, [local_luggage_type, type, value]);

  return (
    <View style={styles.container}>
      <OtherHeader title={t('editAds')} />
      <View style={styles.main}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>
          <CustomText
            lebel={t('adInformationText')}
            fontFamily="SourceSansPro-Regular"
            fontWeight="700"
            size={18}
          />
          <View>
            <View style={styles.btnContainer}>
              <CustomText
                lebel={t('enterDirection') + '*'}
                color={colors.neatural['600']}
                size={14}
              />
              {(errors.from_region || errors.to_region) && (
                <CustomText
                  lebel={t('requiredSs')}
                  color={colors.red['600']}
                  mrTop={8}
                />
              )}
              <Button
                valid={errors?.from_region}
                onPress={() => {
                  bottomRef.current?.open();
                  setRegionType(1);
                }}
                title={
                  value.from_region_name.length === 0
                    ? t('fromWhere')
                    : value.from_region_name
                }
                icon={<LocationIcon2 />}
                marginTop={12}
              />
              <Button
                valid={errors?.from_region}
                onPress={() => {
                  bottomRef.current?.open();
                  setRegionType(2);
                }}
                title={
                  value.to_region_name.length === 0
                    ? t('toWhere')
                    : value.to_region_name
                }
                icon={<LocationIcon2 />}
                marginTop={12}
              />
            </View>
            <View style={styles.dateCont}>
              <CustomText
                lebel={Number(type) === 1 ? t('whengo') : t('whenSent')}
                size={14}
                color={colors.neatural['600']}
              />
              {(errors.leaves_at || errors.time) && (
                <CustomText
                  lebel={t('requiredSs')}
                  color={colors.red['600']}
                  mrTop={8}
                />
              )}
              <View style={styles.row}>
                <Button
                  onPress={() => {
                    setOpen(true);
                  }}
                  valid={errors?.leaves_at}
                  title={
                    value.leaves_at.length === 0
                      ? t('date')
                      : dateToString(
                          String(
                            value.leaves_at.length === 0
                              ? new Date().getTime()
                              : Number(value.leaves_at),
                          ),
                          language,
                          t,
                        )
                  }
                  icon={<CalendarIcon />}
                  width={'48%'}
                />
                <Button
                  onPress={() => {
                    setOpen2(true);
                  }}
                  valid={errors?.leaves_at}
                  title={dateToTime(time, t)}
                  icon={<Clock />}
                  width={'48%'}
                />
              </View>
            </View>
            <View style={styles.line} />
            <View>
              <CustomText
                lebel={Number(type) === 2 ? t('selectPerson') : t('selectDD')}
                color={colors.neatural['600']}
                size={14}
              />

              <View style={styles.row}>{renderSelectButton}</View>
            </View>
            <View>
              <CustomText
                lebel={
                  Number(type) === 1 ? t('commentText') : t('commentadsss')
                }
                mrTop={12}
                mrBottom={12}
                size={14}
                color={colors.neatural['600']}
              />
              {errors.comment && (
                <CustomText
                  lebel={t('requiredSs')}
                  color={colors.red['600']}
                  mrBottom={8}
                />
              )}
              {renderCargoInput}
            </View>
            <View>
              {!itemType ? (
                <>
                  <CustomText
                    lebel={
                      Number(type) !== 1 ? t('countPeople') : t('count_People')
                    }
                    mrTop={12}
                    mrBottom={12}
                    size={14}
                    color={colors.neatural['600']}
                  />

                  <View style={styles.rowx}>
                    <TouchableOpacity
                      onPress={() => {
                        if (value.people_count > 0) {
                          setValue(pr => {
                            return {
                              ...value,
                              people_count: pr.people_count - 1,
                            };
                          });
                        }
                      }}
                      style={styles.btnCounter}>
                      <CustomText lebel="-" size={18} />
                    </TouchableOpacity>
                    <CustomText
                      lebel={String(value.people_count)}
                      mnLeft={12}
                      mrRight={12}
                      size={16}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setValue(pr => {
                          return {
                            ...value,
                            people_count: pr.people_count + 1,
                          };
                        });
                      }}
                      style={styles.btnCounter}>
                      <CustomText lebel="+" size={18} />
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}
            </View>
            <View style={styles.line} />
            {type == 2 ? null : (
              <TypeAirContainer
                erro={errors}
                transport_type={transportType}
                setTransportType={setTransportType}
                setValue={setValue}
                value={value}
                t={t}
                item={item}
              />
            )}
            <CustomText
              mrTop={12}
              mrBottom={12}
              size={14}
              color={colors.neatural['600']}
              lebel={Number(type) === 1 ? t('payforlug') : t('payforlugask')}
            />
            {errors.price && (
              <CustomText
                lebel={t('requiredSs')}
                color={colors.red['600']}
                mrBottom={8}
              />
            )}
            <View style={styles.som}>
              {renderSom}
              <TouchableOpacity style={styles.somBtn}>
                <CustomText
                  lebel={t('sum')}
                  size={18}
                  color={colors.neatural['600']}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowY}>
              <CustomText
                lebel={t('agreeText')}
                color={colors.neatural['600']}
              />
              <Switch
                value={value.is_negotiable}
                onValueChange={val => {
                  setValue({...value, is_negotiable: val});
                }}
              />
            </View>
            <View style={styles.bottom}>
              {/* <CustomText
                lebel={t('contactInfoText')}
                fontFamily="SourceSansPro-Regular"
                fontWeight="700"
                size={18}
                lineHeight={22}
                mrTop={32}
              />
              <CustomText
                lebel={t('forCommunication')}
                mrTop={24}
                mrBottom={12}
              />
              <View style={{marginBottom: 8}}>
                {errors.phone_number && (
                  <CustomText
                    lebel={t('requiredSs')}
                    color={colors.red['600']}
                    mrTop={8}
                  />
                )}
              </View> */}
              {/* <MyInput
                props={{keyboardType: 'phone-pad', maxLength: 13}}
                placeholder="+998901234567"
                value={value.phone_number}
                style={styles.input(errors.phone_number)}
                onChangeText={text => {
                  setValue({...value, phone_number: text});
                }}
              /> */}
              <MyTouchableOpacity
                disabled={loading ? true : false}
                onPress={onPostAds}
                style={{
                  marginTop: 24,
                  backgroundColor: loading
                    ? colors.red['200']
                    : colors.red['600'],
                }}>
                {loading ? (
                  <ActivityIndicator size={'small'} color={colors.white} />
                ) : (
                  <CustomText lebel={t('add')} color={colors.white} size={18} />
                )}
              </MyTouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <RBSheet
        ref={bottomRef}
        closeDuration={300}
        openDuration={300}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        }}
        height={height / 1.7}>
        <CityModal
          setValue={setValue}
          value={value}
          searchRef={bottomRef}
          type={regionType}
        />
      </RBSheet>
      {renderDatePicker}
      {renderTimePicker}
    </View>
  );
};

const Button: React.FC<ButtonProps> = ({
  width,
  title,
  icon,
  marginBottom,
  marginTop,
  onPress = () => {},
  valid = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btn(width, marginBottom, marginTop, valid)}>
      <CustomText lebel={title} size={18} />
      {icon}
    </TouchableOpacity>
  );
};

const SelectButton: React.FC<SelectButtonProps> = memo(
  ({image, title, width, mnTop, valid = false, active, onPress = () => {}}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.selectBtn,
          {
            width: width,
            marginTop: mnTop,
            borderColor: valid
              ? colors.red['600']
              : active
              ? colors.neatural['600']
              : colors.neatural[100],
            borderWidth: 1,
          },
        ]}>
        <Image source={image} style={styles.image as any} />
        <CustomText lebel={title} size={16} mnLeft={8} />
      </TouchableOpacity>
    );
  },
);

const TypeAirContainer = ({
  erro,
  transport_type,
  setTransportType,
  setValue,
  value,
  t,
}: {
  erro: ErrorProps;
  transport_type: number;
  setTransportType: React.Dispatch<SetStateAction<number>>;
  setValue: React.Dispatch<SetStateAction<PostDataInterface>>;
  value: PostDataInterface;
  t: any;
}) => {
  const onCar = useCallback(
    (text: string) => {
      setValue({...value, car_number: text});
    },
    [setValue, value],
  );
  const onType = useCallback(
    (val: string) => {
      setValue(pr => {
        return {
          ...pr,
          transport_name: val,
        };
      });
    },
    [setValue],
  );

  const renderType = useMemo(() => {
    return (
      <MyInput
        placeholder={t('carEx')}
        value={value.transport_name}
        style={[styles.input(erro?.transport_name)]}
        onChangeText={onType}
      />
    );
  }, [erro?.transport_name, value]);
  const renderCar = useMemo(
    () => (
      <MyInput
        placeholder="90M733MA"
        props={{maxLength: 8}}
        value={value.car_number}
        style={styles.input(erro?.car_number)}
        onChangeText={onCar}
      />
    ),
    [erro?.car_number, value],
  );
  console.log(JSON.stringify(value, null, 2));
  return (
    <View>
      <CustomText
        lebel={t('transportTypeText')}
        size={14}
        color={colors.neatural['600']}
      />
      <View style={styles.transport}>
        <SelectButton
          onPress={() => {
            setTransportType(0);
            setValue({...value, transport_type: 'car'});
          }}
          active={value.transport_type === 'car' ? true : false}
          image={image.car}
          title={t('car')}
          width="49%"
        />
        {value.luggage_type === 'parcel' || value.luggage_type === 'both' ? (
          <>
            <SelectButton
              onPress={() => {
                setTransportType(1);
                setValue({
                  ...value,
                  transport_type: 'train',
                  transport_name: '',
                  car_number: '',
                });
              }}
              active={value.transport_type === 'train' ? true : false}
              image={image.train}
              title={t('train')}
              width="49%"
            />
            <SelectButton
              onPress={() => {
                setTransportType(2);
                setValue({
                  ...value,
                  transport_type: 'plain',
                  transport_name: '',
                  car_number: '',
                });
              }}
              active={value.transport_type === 'plain' ? true : false}
              image={image.air}
              title={t('airplane')}
              width="49%"
              mnTop={12}
            />
          </>
        ) : null}
        {/* kuryer bulganda yolovchi tanlganada ikkitasi yoqalishi kerak! */}
      </View>
      {value.transport_type === 'car' ? (
        <View>
          <CustomText
            lebel={t('carBrand')}
            mrTop={12}
            mrBottom={12}
            size={14}
            color={colors.neatural['600']}
          />
          {erro?.car_type && (
            <CustomText
              lebel={t('requiredSs')}
              color={colors.red['600']}
              mrBottom={8}
            />
          )}
          {renderType}
          <CustomText
            lebel={t('carNumber')}
            mrTop={12}
            mrBottom={12}
            size={14}
            color={colors.neatural['600']}
          />
          {erro?.car_number && (
            <CustomText
              lebel={t('requiredSs')}
              color={colors.red['600']}
              mrBottom={8}
            />
          )}
          {renderCar}
        </View>
      ) : null}
      <View style={styles.line} />
    </View>
  );
};

export default EditAds;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  input: (valid: boolean) => ({
    borderColor: valid ? colors.red['600'] : colors.neatural[200],
    borderWidth: valid ? 1 : 0,
  }),
  bottom: {
    paddingBottom: 20,
  },
  scroll: {
    paddingVertical: 20,
  },
  rowY: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  som: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  somBtn: {
    borderRadius: 12,
    backgroundColor: colors.neatural['100'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginLeft: 12,
    width: '30%',
  },
  transport: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  btnCounter: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neatural['100'],
    borderRadius: 12,
  },
  rowx: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBtn: {
    backgroundColor: colors.neatural['100'],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  image: {
    width: 24,
    height: 24,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.neatural['400'],
    marginVertical: 32,
    borderRadius: 12,
  },
  btnContainer: {
    marginTop: 24,
  },
  btn: (width, marginBottom, marginTop, valid) => ({
    width: width,
    backgroundColor: colors.neatural['100'],
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop,
    marginBottom,
    borderWidth: valid ? 1 : 0,
    borderColor: valid ? colors.red['600'] : null,
  }),
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  main: {
    paddingHorizontal: 16,
    flex: 1,
  },
  dateCont: {
    marginTop: 24,
  },
});
