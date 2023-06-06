import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import OtherHeader from '../components/MyHeader/OtherHeader';
import {CameraIcon} from '../assets/icons';
import {colors} from '../helpers/Colors';
import * as ImagePicker from 'react-native-image-picker';
import MyInput from '../components/Input/MyInput';
import CustomText from '../components/Text/CustomText';
import {useAppDispatch, useAppSelector} from '../hooks/useStore';
import MyTouchableOpacity from '../components/Button/MyTouchableOpacity';
import {checkingPhone, handleEncrypted, removeSpace} from '../helpers/helpers';
import {MediaAxios} from '../context/AxiosContext';
import {postMedia} from '../helpers/urls';
import {getUserAction, updateUserAction} from '../redux/apis/userApi';
import {useNavigation} from '@react-navigation/native';
import useLanguage from '../hooks/useLanguage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const {height} = Dimensions.get('screen');

const ProfileEditScreen = () => {
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const t = useLanguage();

  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);

  const onSelectImage = useCallback(async () => {
    try {
      const data = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'currentContext',
        maxHeight: 139,
        maxWidth: 139,
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
          .catch(err => {});
      }
    } catch (error) {}
  }, []);

  const onSuccess = useCallback(() => {
    setBtnLoading(true);
    dispatch(
      user.phone === phone.replace(/\s/g, '')
        ? updateUserAction({
            name: name,
            avatar: image.length === 0 ? user.avatar : image,
          })
        : updateUserAction({
            name: name,
            avatar: image.length === 0 ? user.avatar : image,
            phone: removeSpace(phone),
          }),
    )
      .then(res => {
        if (res.payload?.code === 1) {
          //toast chiqadi
          Toast.show({
            type: 'tomatoToast',
            autoHide: true,
            text1: t('available'),
            visibilityTime: 2000,
          });
          setBtnLoading(false);
        }
        if (res.payload?.code === 2) {
          setBtnLoading(false);
          navigation.navigate('PhoneNumberEdit', {
            phone: phone.replace(/\s/g, ''),
          });
        }
        if (res.payload?.code === 3) {
          dispatch(getUserAction())
            .then(() => {
              setBtnLoading(false);
              navigation.goBack();
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        setBtnLoading(false);
      });
  }, [dispatch, user.phone, user.avatar, phone, name, image, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <OtherHeader title={t('edit')} />
          <ScrollView>
            <View
              style={{
                height: Platform.OS === 'ios' ? height - 100 : height - 85,
              }}>
              <View style={styles.logo}>
                <Image
                  source={{uri: image.length === 0 ? user.avatar : image}}
                  resizeMode="cover"
                  style={styles.avatar as any}
                />
                <TouchableOpacity
                  disabled={loading ? true : false}
                  onPress={onSelectImage}
                  style={styles.btn(loading)}>
                  {loading ? (
                    <ActivityIndicator color={colors.white} size="small" />
                  ) : (
                    <CameraIcon />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.main}>
                <CustomText lebel={t('enterNameText')} size={14} mrBottom={8} />
                <MyInput value={name} onChangeText={text => setName(text)} />
                <CustomText
                  lebel={t('phone_number')}
                  size={14}
                  mrBottom={8}
                  mrTop={8}
                />
                <MyInput
                  value={checkingPhone(phone)}
                  props={{keyboardType: 'number-pad', maxLength: 17}}
                  onChangeText={text => setPhone(text)}
                />
                <View style={styles.btnConta}>
                  <MyTouchableOpacity
                    disabled={btnLoading ? true : false}
                    onPress={onSuccess}>
                    {btnLoading ? (
                      <ActivityIndicator color={colors.white} size="small" />
                    ) : (
                      <CustomText
                        lebel={t('confirm')}
                        color={colors.white}
                        size={16}
                      />
                    )}
                  </MyTouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 139,
    height: 139,
    borderRadius: 100,
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
  btnConta: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 40,
  },
  main: {
    paddingHorizontal: 16,
    marginTop: 20,
    flex: 1,
  },
  btn: (loading: boolean) => ({
    backgroundColor: loading ? colors.red['100'] : colors.red[300],
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  }),
});
