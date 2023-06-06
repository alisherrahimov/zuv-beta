import React, {useCallback, useContext, useEffect, useState} from 'react';

import {colors} from '../helpers/Colors';
import useLanguage from '../hooks/useLanguage';
import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';
import CustomText from '../components/Text/CustomText';
import {useAppDispatch} from '../hooks/useStore';
import {getNotification} from '../redux/apis/userApi';
import HomeLoading from '../components/Loading/HomeLoading';
import {LanguageContext} from '../context/LanguageContext';
import NotFoundAds from '../components/NotFound/NotFoundAd';

StatusBar.setBarStyle('dark-content');
const NotificationScreen = () => {
  const t = useLanguage();
  const dispatch = useAppDispatch();
  const {language} = useContext(LanguageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const getAllNotification = useCallback(() => {
    try {
      setLoading(true);
      dispatch(getNotification())
        .then(val => {
          if (val.payload.code === 1) {
            setData(val.payload?.data);
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllNotification();
  }, []);

  const onCheckingLocatonLang = (lang: any) => {
    switch (lang) {
      case 'uz':
        return 'text_uz';
      case 'oz':
        return 'text_oz';
      case 'ru':
        return 'text_ru';
      default:
        return 'text_uz';
    }
  };
  console.log(data);
  return (
    <View style={styles.cn}>
      <View style={styles.header}>
        <CustomText lebel={t('notification')} bottom={10} size={16} />
      </View>
      {loading ? (
        <HomeLoading />
      ) : (
        <FlatList
          onRefresh={getAllNotification}
          data={data?.data}
          refreshing={loading}
          renderItem={({item, index}) => {
            return (
              <View key={index.toString()} style={styles.card}>
                <Image source={{uri: item.img}} style={styles.image} />
                <View style={styles.txContainer}>
                  <CustomText
                    lebel={String(item[`${onCheckingLocatonLang(language)}`])}
                  />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => <NotFoundAds title={'notificationNot'} />}
        />
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  cn: {
    flex: 1,
  },
  header: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
  },
  txContainer: {
    padding: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
});
