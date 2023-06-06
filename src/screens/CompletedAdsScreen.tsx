import React, {useCallback, useContext, useEffect, useState} from 'react';

import {RefreshControl, StyleSheet, View} from 'react-native';
import OtherHeader from '../components/MyHeader/OtherHeader';

import AdsCard from '../components/EndAdvertisiment/EndAdvertisimentCard';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import {LanguageContext} from '../context/LanguageContext';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import NotFoundAds from '../components/NotFound/NotFoundAd';
import {getActiveAds} from '../redux/apis/userApi';
import HomeLoading from '../components/Loading/HomeLoading';
import useLanguage from '../hooks/useLanguage';

const CompletedAdsScreen = () => {
  const {language} = useContext(LanguageContext);
  const navigation = useNavigation();
  const t = useLanguage();
  const {complateAds} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getActiveAds({status: 'inactive'})).then(() => {
      setRefreshing(false);
    });
  }, [dispatch]);
  const onGetComplateAds = useCallback(() => {
    setLoading(true);
    dispatch(getActiveAds({status: 'inactive'})).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    onGetComplateAds();
  }, [onGetComplateAds]);
  console.log(complateAds?.data);

  return (
    <View style={styles.container}>
      <OtherHeader title={t('closeAds')} />
      {loading ? (
        <HomeLoading />
      ) : (
        <Animated.FlatList
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          refreshing={refreshing}
          exiting={FadeOutUp.duration(1000)}
          entering={FadeInDown.duration(1000)}
          keyExtractor={({id}) => id}
          data={complateAds?.data}
          renderItem={({item, index}) => {
            return (
              <AdsCard
                item={item}
                index={index}
                navigation={navigation}
                active={false}
                lang={language}
              />
            );
          }}
          ListEmptyComponent={() => <NotFoundAds title={t('noClosedAds')} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default CompletedAdsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
