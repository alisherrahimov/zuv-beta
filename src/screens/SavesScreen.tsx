import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';

import Header from '../components/MyHeader/Header';

import Card from '../components/HomeCard/Card';
import NotFound from '../components/NotFound/NotFound';
import {useNavigation} from '@react-navigation/native';
import {LanguageContext} from '../context/LanguageContext';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import useLanguage from '../hooks/useLanguage';
import {getUserFavourite} from '../redux/apis/userApi';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import AdTypeModal from '../components/Modals/AdTypeModal';
const {height} = Dimensions.get('screen');
StatusBar.setBarStyle('dark-content');
const SavesScreen = () => {
  const key = useId();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const bottomRef2 = useRef(null);

  const [isActive, setIsActive] = useState<string>('del');
  const {language} = useContext(LanguageContext);
  const t = useLanguage();
  const {favourites, user} = useAppSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getUserFavourite());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (user) {
      dispatch(getUserFavourite(user.id));
    }
    setRefreshing(false);
  }, [dispatch, user]);

  console.log(JSON.stringify(favourites, null, 2));
  return (
    <View style={styles.container}>
      <Header isActive={isActive} setIsActive={setIsActive} isSearch={false} />
      <Animated.FlatList
        exiting={FadeOutUp.duration(1000)}
        entering={FadeInDown.duration(1000)}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={isActive !== 'del' ? favourites.percels : favourites.couriers}
        renderItem={({item, index}) => (
          <Card
            navigation={navigation}
            item={item}
            index={index}
            key={key}
            isActive={isActive}
            lang={language}
            userID={user.id}
            type={1}
            t={t}
            dispatch={dispatch}
          />
        )}
        ListEmptyComponent={() => (
          <NotFound active={isActive} bottomRef2={bottomRef2} />
        )}
      />
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
    flex: 1,
  },
  bottom: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
export default SavesScreen;
// watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
