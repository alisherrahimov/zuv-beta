import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';

import Header from '../components/MyHeader/Header';

import NotFound from '../components/NotFound/NotFound';
import Card from '../components/HomeCard/Card';
import {colors} from '../helpers/Colors';
import {useNavigation} from '@react-navigation/native';

import {LanguageContext} from '../context/LanguageContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import FilterModal from '../components/Modals/FilterModal';

import {getUserAction, getUserFavourite} from '../redux/apis/userApi';
import {getPercelsAction} from '../redux/apis/percels';
import {getCouriersAction} from '../redux/apis/courier';
import useLanguage from '../hooks/useLanguage';
import HomeLoading from '../components/Loading/HomeLoading';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import {storage} from '../helpers/dataStorage';
import NetInfo from '@react-native-community/netinfo';
import Internet from '../components/NotFound/Internet';
import AdTypeModal from '../components/Modals/AdTypeModal';

const {height} = Dimensions.get('screen');

StatusBar.setBarStyle('dark-content');
const HomeScreen = () => {
  const key = useId();

  let bottomRef = useRef(null);
  let bottomRef2 = useRef(null);

  const navigation = useNavigation();
  const {language} = useContext(LanguageContext);
  const {user} = useAppSelector(state => state.user);
  const {percels, couriers} = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const t = useLanguage();

  const [isActive, setIsActive] = useState<string>('del');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [internet, setInternet] = useState(true);

  const onGetDel = useCallback(async () => {
    dispatch(getPercelsAction())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);
  const getUser = useCallback(async () => {
    setLoading(true);
    let token = storage.getString('token');

    if (token?.length !== 0) {
      dispatch(getUserAction())
        .then(res => {
          if (res.payload?.code === 3) {
            navigation.reset({
              routes: [{name: 'PhoneNumberScreen'}],
              index: 0,
            });
            storage.set('token', '');
            storage.set('reftoken', '');
          } else {
            dispatch(getUserFavourite());
            onGetDel();
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err, 'err');
        });
    } else {
      onGetDel();
    }
  }, [dispatch, navigation, onGetDel]);
  const onGetPassenger = useCallback(() => {
    dispatch(getCouriersAction())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);
  const onGetPassengerOnRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCouriersAction())
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, [dispatch]);
  const onDelRefResh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getPercelsAction())
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, [dispatch]);
  const onchageHeader = useCallback(() => {
    if (isActive === 'del') {
      setIsActive('pass');
      onGetDel();
    } else {
      onGetPassenger();
      setIsActive('del');
    }
  }, [isActive, onGetPassenger, onGetDel]);
  const onUpdate = useCallback(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setInternet(true);
      } else {
        setInternet(false);
      }
    });
  }, []);

  const renderList = useMemo(() => {
    return (
      <Animated.FlatList
        exiting={FadeOutUp.duration(1000)}
        entering={FadeInDown.duration(1000)}
        data={isActive !== 'del' ? percels.percels : couriers.couriers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Card
              navigation={navigation}
              item={item}
              index={index}
              key={key}
              lang={language}
              isActive={isActive}
              userID={user.id || null}
              type={2}
              t={t}
              dispatch={dispatch}
            />
          );
        }}
        onRefresh={() => {
          isActive !== 'del' ? onDelRefResh() : onGetPassengerOnRefresh();
        }}
        refreshing={refreshing}
        ListEmptyComponent={() => (
          <NotFound active={isActive} bottomRef2={bottomRef2} />
        )}
      />
    );
  }, [
    couriers.couriers,
    isActive,
    key,
    language,
    navigation,
    onDelRefResh,
    onGetPassengerOnRefresh,
    percels.percels,
    refreshing,
    user,
    dispatch,
    t,
  ]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setInternet(true);
      } else {
        setInternet(false);
      }
    });
  }, []);

  useEffect(() => {
    onGetDel();
    onGetPassenger();
  }, []);

  // @ts-ignore
  return (
    <View style={styles.container}>
      <Header
        isActive={isActive}
        setIsActive={onchageHeader}
        isSearch={true}
        bottomRef={bottomRef}
      />

      {internet ? (
        <>
          {loading ? <HomeLoading /> : renderList}
          <RBSheet
            ref={bottomRef}
            closeDuration={300}
            closeOnDragDown={false}
            dragFromTopOnly={true}
            animationType="fade"
            height={height / 1.2}
            openDuration={300}
            customStyles={{container: styles.bottom}}>
            <FilterModal
              bottomRef={bottomRef}
              setLoading={setLoading}
              isActive={isActive}
            />
          </RBSheet>
        </>
      ) : (
        <Internet onUpdate={onUpdate} />
      )}
      <RBSheet
        ref={bottomRef2}
        closeDuration={200}
        closeOnDragDown={true}
        openDuration={200}
        customStyles={{container: styles.bottom}}
        height={height / 3.5}>
        <AdTypeModal bottomRef={bottomRef2} />
      </RBSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  bottom: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
export default HomeScreen;
