import React, {useCallback, useContext, useRef, useState} from 'react';

import {
  Alert,
  Dimensions,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../components/Text/CustomText';
import {
  ArrowRightIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  LanguageIcon,
  LogoWhite,
  NotificationIconWithBackground,
  PenIcon,
  QuestionIcon,
  RulesIcon,
  Exit,
} from '../assets/icons';
import {colors} from '../helpers/Colors';
import MyTouchableOpacity from '../components/Button/MyTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

import {LanguageContext} from '../context/LanguageContext';

import {languageValues} from '../helpers/data';

import {phoneString} from '../helpers/helpers';

import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import RBSheet from 'react-native-raw-bottom-sheet';
import LanguageModal from '../components/Modals/LanguageModal';
import useLanguage from '../hooks/useLanguage';

import {onDeleteReducerFuntion} from '../redux/reducers/userReducer';
import {storage} from '../helpers/dataStorage';
import {getUserAction} from '../redux/apis/userApi';
import {getPercelsAction} from '../redux/apis/percels';
import {getCouriersAction} from '../redux/apis/courier';
import AdTypeModal from '../components/Modals/AdTypeModal';

const {height} = Dimensions.get('screen');
const ProfileScreen = () => {
  let bottomRef = useRef(null);
  let bottomRef2 = useRef(null);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const t = useLanguage();

  const onEditUser = useCallback(() => {
    navigation.navigate('ProfileEditScreen');
  }, [navigation]);

  const onExit = useCallback(() => {
    Alert.alert(t('exitApp'), '', [
      {
        onPress: () => {
          dispatch(onDeleteReducerFuntion());
          dispatch(getPercelsAction());
          dispatch(getCouriersAction());
          storage.set('token', '');
          storage.set('reftoken', '');
          navigation.navigate('BottomNavigator');
        },
        text: t('exit'),
      },
      {
        onPress: () => {},
        text: t('back'),
      },
    ]);
  }, [dispatch, navigation, t]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserAction())
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <View style={styles.headerIn}>
          <LogoWhite color={'red'} />
          {user.id === undefined ? null : (
            <TouchableOpacity onPress={onExit}>
              <View style={styles.editCn}>
                <Exit />
                <CustomText mnLeft={4} lebel={t('logOut')} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 20}}>
        {user.id === undefined ? null : (
          <UserInformationComponent
            navigation={navigation}
            user={user}
            t={t}
            bottomRef={bottomRef2}
            onEdit={onEditUser}
          />
        )}
        {user.id === undefined ? (
          <IsLogOutComponent navigation={navigation} t={t} />
        ) : null}
        {user.id === undefined ? null : (
          <IsLoginComponent navigation={navigation} user={user} t={t} />
        )}
        <MainComponent navigation={navigation} bottomRef={bottomRef} t={t} />

        <RBSheet
          ref={bottomRef}
          animationType="fade"
          openDuration={200}
          height={height / 2.2}
          closeOnDragDown={true}
          customStyles={{container: styles.bttom}}
          closeDuration={200}>
          <LanguageModal bottomRef={bottomRef} />
        </RBSheet>
        <RBSheet
          ref={bottomRef2}
          animationType="fade"
          openDuration={200}
          height={height / 3.5}
          closeOnDragDown={true}
          customStyles={{container: styles.bttom}}
          closeDuration={200}>
          <AdTypeModal bottomRef={bottomRef2} />
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const IsLogOutComponent = ({navigation, t}: {navigation: any; t: any}) => {
  const onEnter = useCallback(() => {
    navigation.navigate('PhoneNumberScreen');
  }, [navigation]);
  return (
    <View>
      <View style={styles.title}>
        <CustomText
          lebel={t('welcomeZuv')}
          size={16}
          fontFamily="SourceSansPro-Bold"
        />
      </View>
      <View style={[styles.title]}>
        <CustomText
          lebel={t('profileHeaderText')}
          size={16}
          fontFamily="SourceSansPro-Regular"
        />
      </View>
      <View style={styles.title}>
        <MyTouchableOpacity onPress={onEnter}>
          <CustomText lebel={t('logIn')} color={colors.white} size={16} />
        </MyTouchableOpacity>
      </View>
    </View>
  );
};

const MainComponent = ({
  navigation,
  bottomRef,
  t,
}: {
  navigation: any;
  bottomRef: any;
  t: any;
}) => {
  const {language} = useContext(LanguageContext);

  const items = [
    {
      id: 1,
      title: t('notification'),
      isCount: true,
      message: '2',
      icon: <NotificationIconWithBackground />,
      onPress: () => {
        navigation.navigate('NotificationScreen');
      },
    },
    {
      id: 1,
      title: t('help'),
      isCount: false,
      message: '12',
      icon: <QuestionIcon />,
      onPress: () => {
        navigation.navigate('HelpScreen');
      },
    },
    {
      id: 1,
      title: t('language'),
      isCount: true,
      message: languageValues[language],
      icon: <LanguageIcon />,
      onPress: () => {
        bottomRef?.current?.open();
      },
    },
    {
      id: 1,
      title: t('termsAndConditions'),
      isCount: false,
      message: '12',
      icon: <RulesIcon />,
      onPress: () => {
        Linking.openURL('https://www.zuvexpress.com/termsofuse');
      },
    },
  ];

  return (
    <View style={styles.settings}>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={item.onPress}
            key={index.toString()}
            style={[
              styles.button,
              {borderBottomWidth: index === items.length - 1 ? 0 : 0.5},
            ]}>
            <View style={styles.buttinInside}>
              <View style={styles.icon}>{item.icon}</View>
              <View style={styles.textContainer}>
                <CustomText lebel={item.title} size={16} lineHeight={20} />
                <View style={styles.row}>
                  {item.isCount ? (
                    <CustomText
                      color={colors.neatural[400]}
                      lebel={item.message}
                      mrRight={8}
                      size={16}
                      lineHeight={20}
                    />
                  ) : null}
                  <ArrowRightIcon />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const IsLoginComponent = ({
  navigation,
  user,
  t,
}: {
  navigation: any;
  user: any;
  t: any;
}) => {
  const items = [
    {
      id: 1,
      title: t('activeAds'),
      isCount: true,
      message: user.active_ads,
      icon: <EyeOpenIcon />,
      onPress: () => {
        navigation.navigate('ActiveAdsScreen');
      },
    },
    {
      id: 1,
      title: t('closedAds'),
      isCount: true,
      message: user.inactive_ads,
      icon: <EyeCloseIcon />,
      onPress: () => {
        navigation.navigate('CompletedAdsScreen');
      },
    },
  ];

  return (
    <View style={styles.settings}>
      {items.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={item.onPress}
            key={index.toString()}
            style={[
              styles.button,
              {borderBottomWidth: index === items.length - 1 ? 0 : 0.5},
            ]}>
            <View style={styles.buttinInside}>
              <View style={styles.icon}>{item.icon}</View>
              <View style={styles.textContainer}>
                <CustomText lebel={item.title} size={16} lineHeight={20} />
                <View style={styles.row}>
                  {item.isCount ? (
                    <CustomText
                      color={colors.neatural[400]}
                      lebel={item.message}
                      mrRight={8}
                      size={16}
                      lineHeight={20}
                    />
                  ) : null}
                  <ArrowRightIcon />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const UserInformationComponent = ({
  bottomRef,
  user,
  t,

  onEdit,
}: any) => {
  const {imageContainer, image} = styles;

  const onPress = useCallback(() => {
    bottomRef.current.open();
    // navigation.navigate('AddScreen', {type: 1});
  }, [bottomRef]);
  return (
    <View style={styles.main}>
      <View style={imageContainer}>
        <Image
          source={{
            uri:
              user?.avatar ??
              'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png',
          }}
          style={image}
        />
        <CustomText
          lebel={user?.name}
          fontFamily="SourceSansPro-Regular"
          textAlign="center"
          fontWeight="700"
          size={16}
          mrTop={12}
        />
        <CustomText
          lebel={phoneString(user?.phone)}
          fontFamily="SourceSansPro-Regular"
          textAlign="center"
          fontWeight="400"
          size={13}
          mrTop={6}
        />
      </View>
      <TouchableOpacity onPress={onEdit}>
        <View style={styles.edit}>
          <PenIcon />
          <CustomText lebel={t('edit')} />
        </View>
      </TouchableOpacity>
      <View style={styles.btn}>
        <MyTouchableOpacity onPress={onPress}>
          <CustomText lebel={t('postAd')} color={colors.white} size={16} />
        </MyTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  edit: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  exit: {
    marginHorizontal: 16,
  },
  bttom: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  btn: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  main: {
    marginTop: 12,
  },
  imageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 109,
    height: 109,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  editCn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: 100,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  headerIn: {
    bottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  settings: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  button: {
    height: 54,
    justifyContent: 'center',
    borderBottomColor: colors.neatural[300],
    borderBottomWidth: 0.5,
  },
  icon: {
    marginLeft: 12,
  },
  buttinInside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    left: 16,
    alignItems: 'center',
    height: '100%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
