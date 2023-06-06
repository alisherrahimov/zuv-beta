import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {styles} from './styles';
import CustomText from '../Text/CustomText';
import {
  CallIcon,
  CheckIcon,
  EyeCloseNoBackgroundIcon,
  EyeIcon,
  Line,
  Location,
  Pencil,
  Radio,
  Road,
  Road2,
} from '../../assets/icons';
import {colors} from '../../helpers/Colors';

import {
  isDate,
  onCheckingLocatonLang,
  priceFormat,
  time,
} from '../../helpers/helpers';
import AskQuestion from '../Modals/AskQuestion';
import RBSheet from 'react-native-raw-bottom-sheet';
import useLanguage from '../../hooks/useLanguage';

const {height} = Dimensions.get('screen');
interface AdsProps {
  item: any;
  index: number;
  navigation: any;
  lang: any;
  active: boolean;
}
let images = [
  require('../../assets/images/car.png'),
  require('../../assets/images/train.png'),
  require('../../assets/images/plane.png'),
  require('../../assets/images/man.png'),
  require('../../assets/images/luggage.png'),
];

const AdsCard: React.FC<AdsProps> = ({
  index,
  item,
  navigation,
  lang,
  active,
}) => {
  const t = useLanguage();
  const bottomRef = useRef(null);
  const onNavigateEdit = useCallback(() => {
    navigation.navigate('EditAds', {
      type: item.type === 'parcel' ? 2 : 1,
      item: item,
    });
  }, [navigation, item]);

  const onEnd = useCallback(() => {
    bottomRef.current?.open();
  }, [bottomRef]);

  const HeightRoad = () => {
    let a: string =
      item.to_region[`${onCheckingLocatonLang(lang)}`] +
      item.to_city[`${onCheckingLocatonLang(lang)}`];
    return a.split('').slice(0, Math.round(a.length / 5));
  };
  console.log(JSON.stringify(item, null, 2));
  return (
    <View key={index.toString()} style={styles.ctn}>
      <View style={styles.cardInside}>
        <View style={styles.row}>{renderRow(item, t)}</View>
        <View>
          <View style={styles.info}>
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
            <View style={styles.fl}>
              <View style={styles.rowx}>
                <View style={{maxWidth: '61%'}}>
                  <CustomText
                    lebel={
                      item.from_region[`${onCheckingLocatonLang(lang)}`] +
                      ', ' +
                      item.from_city[`${onCheckingLocatonLang(lang)}`]
                    }
                    size={16}
                  />
                </View>
                <View style={{}}>
                  <CustomText lebel={t('leaveTime')} size={13} />
                  <CustomText
                    lebel={isDate(item.leaves_at, lang)}
                    textAlign="right"
                    size={13}
                  />
                  <CustomText
                    size={13}
                    lebel={time(item.leaves_at)}
                    textAlign="right"
                    fontFamily="SourceSansPro-Bold"
                  />
                </View>
              </View>
              <View style={{marginTop: 8}}>
                <View style={styles.rowx}>
                  <View style={{maxWidth: '61%'}}>
                    <CustomText
                      lebel={
                        item.to_region[`${onCheckingLocatonLang(lang)}`] +
                        ',' +
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
          {/* <View style={styles.row}>
            <Image
              defaultSource={require('../../assets/images/UserProfileIcon.png')}
              style={[
                styles.image as any,
                {borderRadius: 50, backgroundColor: colors.neatural['100']},
              ]}
              source={{uri: item.avatar}}
            />
            <CustomText lebel={item?.user?.name} mnLeft={5} size={14} />
          </View> */}
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
              lebel={priceFormat(item?.price) + ' ' + t('sum')}
              textAlign="right"
              fontFamily="SourceSansPro-Bold"
            />
          </View>
        </View>
      </View>
      <View style={styles.footerCard}>
        <View style={styles.iconsCon}>
          <View style={styles.iconCon}>
            <EyeIcon />
            <CustomText
              lebel={item.view_count}
              color={colors.black}
              mnLeft={8}
            />
          </View>
          <View style={styles.iconCon}>
            <CallIcon />
            <CustomText
              lebel={item.call_count ?? 0}
              color={colors.black}
              mnLeft={8}
            />
          </View>
        </View>
        {active ? (
          <View style={styles.buttonCon}>
            <TouchableOpacity
              onPress={onEnd}
              style={styles.button(colors.white, true)}>
              <CustomText
                lebel={active ? t('yakunlash') : t('ondelete')}
                mrRight={5}
              />
              <EyeCloseNoBackgroundIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNavigateEdit}
              style={[
                styles.button(colors.neatural['600'], false),
                {marginLeft: 8},
              ]}>
              <CustomText lebel={t('edit')} mrRight={5} color={colors.white} />
              <Pencil />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <RBSheet
        ref={bottomRef}
        animationType="fade"
        openDuration={200}
        height={height / 2.2}
        customStyles={{
          container: {borderTopLeftRadius: 12, borderTopRightRadius: 12},
        }}
        closeDuration={200}>
        <AskQuestion bottomRef={bottomRef} item={item} />
      </RBSheet>
    </View>
  );
};

export default AdsCard;

const renderImage = (item: any) => {
  if (item.type === 'courier') {
    switch (item.luggage_type) {
      case 'people':
        return images[0];
      case 'both':
        return images[0];
      case 'parcel':
        switch (item.transport_type) {
          case 'train':
            return images[1];
          case 'plain':
            return images[2];
          case 'car':
            return images[0];
        }
    }
  }
  if (item.type === 'parcel') {
    switch (item.luggage_type) {
      case 'people':
        return images[3];
      case 'parcel':
        return images[4];
    }
  }
};

const renderText = (item: any, t: any) => {
  if (item.type === 'courier') {
    switch (item.transport_type) {
      case 'train':
        return t('train').toUpperCase() + ' ' + t('byTransport');
      case 'car':
        return item.transport_name?.toUpperCase() + ' ' + t('byTransport');
      case 'plain':
        return t('plain').toUpperCase() + ' ' + t('byTransport');
    }
  }
  if (item.type === 'parcel') {
    switch (item.luggage_type) {
      case 'people':
        return `${item?.people_count + ' ' + t('yolovchi')}`;
      case 'parcel':
        return t('bringLuggage');
    }
  }
};

const renderRow = (item: any, t: any) => {
  return (
    <View style={styles.row}>
      <Image
        style={[styles.image as any]}
        source={renderImage(item)}
        resizeMode="cover"
      />
      <View style={styles.row}>
        <CustomText lebel={renderText(item, t)} mnLeft={5} size={14} />
      </View>
    </View>
  );
};
