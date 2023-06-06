import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CameraIcon} from '../../assets/icons';

import {colors} from '../../helpers/Colors';
import * as ImagePicker from 'react-native-image-picker';

import useLanguage from '../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/Text/CustomText';
import {fonts} from '../../helpers/fonts';
import MyTouchableOpacity from '../../components/Button/MyTouchableOpacity';
import {handleEncrypted} from '../../helpers/helpers';
import {MediaAxios} from '../../context/AxiosContext';
import {postMedia} from '../../helpers/urls';
import {useAppDispatch} from '../../hooks/useStore';
import {
  getActiveAds,
  getUserAction,
  getUserFavourite,
  updateUserAction,
} from '../../redux/apis/userApi';
import {getCouriersAction} from '../../redux/apis/courier';
import {getPercelsAction} from '../../redux/apis/percels';

const RegisterScreen = () => {
  const t = useLanguage();

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const onSelectImage = useCallback(async () => {
    try {
      const data = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'currentContext',
      });
      let file: any = data?.assets && data?.assets[0];
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/webp' ||
        file.type === 'image/jpg';

      if (isJpgOrPng) {
        let fileMeta = {
          // uri: file.uri,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
          type: file.type,
          name: file.fileName,
        };
        const formData = new FormData();
        formData.append('file', fileMeta);
        formData.append('project', 'zuv');

        const headers = {
          'x-auth-key': handleEncrypted(),
          'Content-Type': 'multipart/form-data',
        };
        setLoading(true);
        await MediaAxios.post(postMedia, formData, {headers})
          .then(res => {
            setImage(res.data?.url);
            setLoading(false);
          })
          .catch(() => {});
      }
    } catch (error) {}
  }, []);

  const onFinish = useCallback(() => {
    setBtnLoading(true);
    dispatch(
      updateUserAction({
        name: name,
        avatar:
          image.length === 0
            ? 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
            : image,
      }),
    )
      .then(() => {
        dispatch(getUserAction()).then(() => {
          dispatch(getActiveAds({status: 'active'}));
          dispatch(getCouriersAction());
          dispatch(getPercelsAction());
          dispatch(getUserFavourite());
          navigation.reset({routes: [{name: 'BottomNavigator'}], index: 0});
          setLoading(false);
        });
      })
      .catch(() => {});
  }, [dispatch, name, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.main}>
            <View style={styles.header}>
              {/* <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowLeftIcon />
          </TouchableOpacity> */}
            </View>
            <View>
              <CustomText
                lebel={t('signUp')}
                size={18}
                fontFamily="SourceSansPro-Regular"
                lineHeight={22}
                fontWeight="700"
                mrTop={20}
              />
            </View>

            <View style={styles.logo}>
              {loading ? (
                <View>
                  <ActivityIndicator size={'small'} color={colors.red['600']} />
                </View>
              ) : (
                <Image
                  defaultSource={require('../../assets/images/UserProfileIcon.png')}
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}

              <TouchableOpacity onPress={onSelectImage} style={styles.btn}>
                <CameraIcon />
              </TouchableOpacity>
            </View>
            <View>
              <CustomText
                lebel={t('enterNameText')}
                size={18}
                color={colors.black}
                mrTop={12}
              />
              <TextInput
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                placeholder="Alisher Rakhimov"
                style={styles.input}
                placeholderTextColor={colors.neatural['400']}
              />
              <MyTouchableOpacity
                disabled={name.length <= 4 ? true : false}
                onPress={onFinish}
                style={[
                  styles.continueBtn,
                  {
                    backgroundColor:
                      name.length <= 4 ? colors.red['100'] : colors.red['600'],
                  },
                ]}>
                {btnLoading ? (
                  <ActivityIndicator size={'small'} color={colors.white} />
                ) : (
                  <CustomText
                    lebel={t('continue')}
                    color={colors.white}
                    size={18}
                  />
                )}
              </MyTouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: 139,
    height: 139,
    borderRadius: 100,
  },
  input: {
    backgroundColor: colors.neatural[100],
    borderRadius: 12,
    paddingVertical: 16,
    width: '100%',
    fontFamily: fonts.regular,
    fontSize: 18,
    marginTop: 12,
    paddingHorizontal: 12,
    color: colors.black,
  },
  continueBtn: {
    marginTop: 29,
  },
  main: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    height: Platform.OS === 'ios' ? 80 : 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 139,
    height: 139,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neatural[100],
    alignSelf: 'center',
    marginTop: 30,
  },
  btn: {
    backgroundColor: colors.red[300],
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
