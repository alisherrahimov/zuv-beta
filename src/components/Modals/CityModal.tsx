import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useId, useState} from 'react';

import CustomText from '../Text/CustomText';
import {colors} from '../../helpers/Colors';

import MyInput from '../Input/MyInput';
import {getRegion} from '../../redux/apis/userApi';
import {useAppDispatch} from '../../hooks/useStore';
import RegionSearchLoading from '../Loading/RegionSearchLoading';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import useLanguage from '../../hooks/useLanguage';

interface CityModalProps {
  setValue?: any;
  value?: any;
  type?: number;
  searchRef?: any;
}

const CityModal: React.FC<CityModalProps> = ({
  setValue,
  value,
  type,
  searchRef,
}) => {
  const t = useLanguage();
  const dispatch = useAppDispatch();

  const key = useId();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeText = useCallback(
    (text: string) => {
      if (text.length === 0) {
        setData([]);
      } else {
        setTimeout(() => {
          setLoading(true);
          dispatch(getRegion(text))
            .then(res => {
              let a = res.payload.filter(
                (item: any) => item.district_id !== value.from_city,
              );
              setData(a);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        }, 300);
      }
    },
    [dispatch, value],
  );

  const City = memo(({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          type === 1
            ? setValue({
                ...value,
                from_region: item?.region_id,
                from_region_name: item?.location,
                from_city: item?.district_id,
              })
            : setValue({
                ...value,
                to_region: item?.region_id,
                to_region_name: item?.location,
                to_city: item?.district_id,
              });
          searchRef.current.close();
        }}
        style={styles.cardBtn}>
        <CustomText lebel={item?.location} />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.main}>
      <CustomText
        lebel={t('search_location')}
        size={18}
        fontFamily="SourceSansPro-Bold"
      />
      <View style={styles.inputView}>
        <MyInput
          placeholder="Toshkent, Yunusobod"
          onChangeText={onChangeText}
        />
        {loading ? (
          <RegionSearchLoading />
        ) : (
          <Animated.FlatList
            exiting={FadeOutUp.duration(300)}
            entering={FadeInDown.duration(300)}
            contentContainerStyle={styles.flat}
            data={data}
            keyExtractor={({district_id}) => district_id?.toString()}
            renderItem={({item}) => {
              return <City item={item} key={key} />;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CityModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  inputView: {
    marginTop: 16,
    flex: 1,
  },

  cardBtn: {
    width: '100%',
    paddingVertical: 15,
  },
  flat: {
    paddingBottom: 40,
  },
});
