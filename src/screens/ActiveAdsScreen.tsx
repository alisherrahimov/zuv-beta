import React, {useCallback, useContext, useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import OtherHeader from '../components/MyHeader/OtherHeader';
import {colors} from '../helpers/Colors';
import AdsCard from '../components/EndAdvertisiment/EndAdvertisimentCard';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {LanguageContext} from '../context/LanguageContext';
import {getActiveAds} from '../redux/apis/userApi';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import HomeLoading from '../components/Loading/HomeLoading';
import NotFoundAds from '../components/NotFound/NotFoundAd';
import useLanguage from '../hooks/useLanguage';

const ActiveAdsScreen = () => {
  const navigation = useNavigation();
  const t = useLanguage();
  const {language} = useContext(LanguageContext);
  const dispatch = useAppDispatch();
  const {activeAds} = useAppSelector(state => state.user);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getActiveAds({status: 'active'})).then(() => {
      setRefreshing(false);
    });
  }, [dispatch]);
  const onGetActiveAds = useCallback(() => {
    setLoading(true);
    dispatch(getActiveAds({status: 'active'})).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    onGetActiveAds();
  }, []);
  console.log(JSON.stringify(activeAds, null, 2));

  return (
    <View style={styles.container}>
      <OtherHeader title={t('activeAds')} />
      {loading ? (
        <HomeLoading />
      ) : (
        <Animated.FlatList
          exiting={FadeOutUp.duration(1000)}
          entering={FadeInDown.duration(1000)}
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={activeAds?.data}
          renderItem={({item, index}) => {
            return (
              <AdsCard
                item={item}
                index={index}
                navigation={navigation}
                lang={language}
                active={true}
              />
            );
          }}
          ListEmptyComponent={() => <NotFoundAds title={t('noActiveAds')} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ActiveAdsScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
});
