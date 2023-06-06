import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';

import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../../helpers/Colors';
import {CalendarIcon, LocationIcon2} from '../../assets/icons';

import {imageLinks} from '../../helpers/data';

import useLanguage from '../../hooks/useLanguage';
import CustomText from '../Text/CustomText';
import {styles} from './styles';
import CityModal from './CityModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import {onCheckingLang} from '../../helpers/helpers';
import DatePicker from 'react-native-date-picker';
import {LanguageContext} from '../../context/LanguageContext';
import {useAppDispatch} from '../../hooks/useStore';
import {getCouriersAction} from '../../redux/apis/courier';
import {getPercelsAction} from '../../redux/apis/percels';

const {height} = Dimensions.get('screen');
interface FilterData {
  from_region: string;
  to_region: string;
  leaves_at_start: string;
  leaves_at_end: string;
  transport_type: string;
  from_region_name: string;
  to_region_name: string;
}
interface FilterModalProps {
  bottomRef: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: string;
}
interface TransportButtonProps {
  item: any;
  index: number;
  onPress: () => void;
  active: number | undefined;
}
interface LocationButtonProps {
  onPress: () => void;
  label: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  bottomRef,
  setLoading,
  isActive,
}) => {
  const t = useLanguage();

  const dispatch = useAppDispatch();

  const searchRef = useRef(null);
  const {language} = useContext(LanguageContext);
  const [value, setValue] = useState<FilterData>({
    from_region: '',
    to_region: '',
    from_region_name: '',
    to_region_name: '',
    leaves_at_start: '',
    leaves_at_end: '',
    transport_type: '',
  });
  const [active, setActive] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<number>(1);
  const [dateType, setDateType] = useState<number>(1);
  const [activeDay, setActiveDay] = useState<number>();

  const datesList = [
    {
      id: 1,
      label: t('today'),
      value: 'now',
    },
    {
      id: 2,
      label: '3' + ' ' + t('day'),
      value: '3',
    },
    {
      id: 3,
      label: '1' + ' ' + t('week'),
      value: '7',
    },
    {
      id: 4,
      label: '1' + ' ' + t('month'),
      value: '30',
    },
  ];

  const transportTypeBtnList = [
    {
      id: 1,
      title: t('allType'),
      imgSrc: '',
      type: '',
      name: 'transport_type',
    },
    {
      id: 2,
      title: t('car'),
      imgSrc: imageLinks.car,
      type: 'car',
      name: 'transport_type',
    },
    {
      id: 3,
      title: t('train'),
      imgSrc: imageLinks.train,
      type: 'train',
      name: 'transport_type',
    },
    {
      id: 4,
      title: t('plain'),
      imgSrc: imageLinks.plain,
      type: 'plain',
      name: 'transport_type',
    },
  ];
  console.log(isActive);

  const onSearch = useCallback(() => {
    let c = {};
    let a = Object.create(c);
    const data = {
      from_region: value.from_region,
      to_region: value.to_region,
      leaves_at_start: value.leaves_at_start,
      leaves_at_end: value.leaves_at_end,
      transport_type: value.transport_type,
    };

    Object.keys(data).forEach(item => {
      if (data[item] !== '') {
        a[item] = data[item];
      }
    });
    console.log(a);
    setLoading(true);
    dispatch(isActive !== 'del' ? getPercelsAction(a) : getCouriersAction(a))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    bottomRef.current?.close();
  }, [bottomRef, dispatch, setLoading, isActive, value]);
  const onPickDateOpen = useCallback((types: number) => {
    setDateType(types);
    setOpen(true);
  }, []);

  const onPickDate = useCallback(
    (date: Date) => {
      if (dateType === 1) {
        setValue({...value, leaves_at_start: date.getTime().toString()});
      }
      if (dateType === 2) {
        setValue({...value, leaves_at_end: date.getTime().toString()});
      }
      setOpen(false);
    },
    [dateType, value],
  );

  const onPlusDate = useCallback(
    (day: string, index: number) => {
      if (day === 'now') {
        let date = new Date();
        setValue({...value, leaves_at_end: date.getTime().toString()});
      } else {
        if (activeDay !== index) {
          let correntDate = new Date(Date.now());
          correntDate.setDate(correntDate.getDate() + Number(day));
          setValue({...value, leaves_at_end: correntDate.getTime().toString()});
        }
      }
    },
    [activeDay, value],
  );

  const renderDatePicker = useMemo(() => {
    return (
      <DatePicker
        modal={true}
        mode="date"
        date={new Date()}
        open={open}
        onConfirm={onPickDate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    );
  }, [onPickDate, open]);

  return (
    <View style={styles.modalContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <CustomText lebel={t('chooseDirection')} size={14} lineHeight={17} />
          <Button
            label={
              value.from_region_name.length === 0
                ? t('fromWhere')
                : value.from_region_name
            }
            onPress={() => {
              //qayerdan
              setType(1);
              searchRef?.current?.open();
            }}
          />

          <Button
            label={
              value.to_region_name.length === 0
                ? t('toWhere')
                : value.to_region_name
            }
            onPress={() => {
              //qayerga
              setType(2);
              searchRef?.current?.open();
            }}
          />

          <View style={styles.top}>
            <CustomText lebel={t('timeInterval')} size={14} />
            <View style={styles.row}>
              <LocationButton
                onPress={() => {
                  onPickDateOpen(1);
                }}
                label={dateToString(value.leaves_at_start, language, t)}
              />
              <LocationButton
                onPress={() => {
                  onPickDateOpen(2);
                }}
                label={dateToString(value.leaves_at_end, language, t)}
              />
            </View>
            <View style={styles.rowx}>
              {datesList.map((item, index) => {
                return (
                  <DatesButton
                    onPress={() => {
                      onPlusDate(item.value, index);
                      setActiveDay(index);
                    }}
                    item={item}
                    index={index}
                    key={index.toString()}
                    activeDay={activeDay}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.top}>
            <CustomText lebel={t('transportType')} />
            <View style={styles.rowxx}>
              {transportTypeBtnList.map((item, index) => {
                return (
                  <TransportButton
                    onPress={() => {
                      setActive(index);
                      setValue({...value, transport_type: item.type});
                    }}
                    item={item}
                    index={index}
                    key={index.toString()}
                    active={active}
                  />
                );
              })}
            </View>
          </View>
          <View style={[styles.row, {marginTop: 40}]}>
            <TouchableOpacity
              onPress={() => {
                bottomRef.current?.close();
              }}
              style={styles.footerButton(colors.buttonColor)}>
              <CustomText lebel={t('cancel')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSearch}
              style={styles.footerButton(colors.red['600'])}>
              <CustomText lebel={t('search')} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={searchRef}
        height={height / 1.3}
        closeOnDragDown={true}
        openDuration={300}
        customStyles={{
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
        }}>
        <CityModal
          setValue={setValue}
          value={value}
          type={type}
          searchRef={searchRef}
        />
      </RBSheet>
      {renderDatePicker}
    </View>
  );
};

const Button = ({label, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <CustomText lebel={label} size={16} color={colors.neatural['600']} />
      <LocationIcon2 />
    </TouchableOpacity>
  );
};

const LocationButton: React.FC<LocationButtonProps> = ({
  onPress = () => {},
  label,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.locationButton}>
      <CustomText lebel={label} size={16} />
      <CalendarIcon />
    </TouchableOpacity>
  );
};

const DatesButton = ({item, index, onPress = () => {}, activeDay}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.dateBtn(index, activeDay)}>
      <CustomText lebel={item?.label} size={16} />
    </TouchableOpacity>
  );
};

const TransportButton: React.FC<TransportButtonProps> = ({
  item,
  index,
  onPress = () => {},
  active,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.trasportButton,
        active === index
          ? {borderWidth: 1, borderColor: colors.neatural[600]}
          : null,
      ]}>
      <Image source={item?.imgSrc} style={styles.image as any} />
      <CustomText lebel={item?.title} size={16} />
    </TouchableOpacity>
  );
};

export default FilterModal;

export const dateToString = (date: string, lang: string, t: any): string => {
  if (date === '') {
    return t('sana');
  } else {
    const time = new Date(Number(date));
    return onCheckingLang(lang, time.getDate(), time.getMonth());
  }
};

export const dateToTime = (date: string, t: any): string => {
  if (date.length === 0) {
    return t('time');
  }
  let time = new Date(Number(date));
  return time.getHours() + ':' + time.getMinutes();
};
