import React, {useCallback, useMemo, useState} from 'react';

import {colors} from '../../helpers/Colors';

import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ArrowBottom,
  ArrowLeftIcon,
  CheckBoxIcon,
  RussinFlag,
  UnCheckBoxIcon,
  UzbFlag,
} from '../../assets/icons';

import useLanguage from '../../hooks/useLanguage';

import CustomText from '../../components/Text/CustomText';
import {fonts} from '../../helpers/fonts';
import MyTouchableOpacity from '../../components/Button/MyTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../../hooks/useStore';
import {LoginAction} from '../../redux/apis/userApi';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const flagBnt = 56;
const resizeBtn = 56 * 3;

const PhoneNumberScreen = () => {
  const btnHeight = useSharedValue(flagBnt);
  const opacityView = useSharedValue(0);

  const t = useLanguage();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const onChangeCheckBox = useCallback(() => {
    setCheck(!check);
  }, [check]);

  const onPressNext = useCallback(() => {
    setLoading(true);
    setDisabled(true);
    dispatch(LoginAction('+998' + value))
      .then(res => {
        if (res?.payload?.payload === true) {
          navigation.navigate('CodeVerifyScreen', {
            type: 1,
            phone: '+998' + value,
          });
          setLoading(false);
          setDisabled(false);
        } else {
          Toast.show({
            position: 'top',
            autoHide: true,
            visibilityTime: 3000,
            type: 'tomatoToast',
            text1: t('sendSmsError2'),
          });
          setLoading(false);
          setDisabled(false);
        }
      })
      .catch(() => {});
  }, [dispatch, value, navigation]);

  const useBtnStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(btnHeight.value, {duration: 300}),
    };
  }, []);

  const langViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityView.value, {duration: 500}),
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkingButton = () => {
    if (value.length === 9 && check === true) {
      return false;
    } else {
      return true;
    }
  };

  const renderInput = useMemo(() => {
    return (
      <Animated.View style={[styles.inputContainerX, useBtnStyle]}>
        <Animated.View
          style={[
            {
              backgroundColor: colors.neatural[100],
              borderRadius: 12,
              width: 81,
              zIndex: 0,
            },
          ]}>
          <TouchableOpacity
            // onPress={() => {
            //   if (btnHeight.value === resizeBtn) {
            //     setOpen(!open);
            //     btnHeight.value = flagBnt;
            //     opacityView.value = 0;
            //   } else {
            //     setOpen(!open);
            //     btnHeight.value = resizeBtn;
            //     opacityView.value = 1;
            //   }
            // }}
            style={styles.codeUz}>
            <UzbFlag width={24} height={24} style={{marginRight: 10}} />
            <ArrowBottom
              style={{transform: [{rotate: open ? '180deg' : '0deg'}]}}
            />
          </TouchableOpacity>
          <Animated.View style={[langViewStyle]}>
            <TouchableOpacity
              onPress={() => {
                console.log('red');
              }}
              style={[styles.codeUz]}>
              <RussinFlag width={24} height={24} style={{marginRight: 21}} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('red');
              }}
              style={[styles.codeUz]}>
              <UzbFlag width={24} height={24} style={{marginRight: 21}} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: colors.neatural['100'],
              height: 56,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText lebel="+998" pngLeft={10} size={18} />
          </View>
          <TextInput
            value={value}
            onChangeText={text => {
              setValue(text);
            }}
            maxLength={9}
            keyboardType={'number-pad'}
            style={styles.textInput}
          />
        </View>
      </Animated.View>
    );
  }, [btnHeight, langViewStyle, opacityView, useBtnStyle, value]);

  const renderFooter = useMemo(() => {
    return (
      <>
        <View style={styles.row}>
          <TouchableOpacity onPress={onChangeCheckBox}>
            {check ? <CheckBoxIcon /> : <UnCheckBoxIcon />}
          </TouchableOpacity>
          <Text style={styles.text}>
            {t('continueEnd')}{' '}
            <Text
              onPress={() => {
                Linking.openURL('https://www.zuvexpress.com/termsofuse');
              }}
              style={[styles.text, {color: colors.red['300']}]}>
              {t('contract')}
            </Text>{' '}
            {t('qabulqildim')}
          </Text>
          {/* <CustomText
            mnLeft={12}
            size={16}
            lineHeight={17}
            lebel={t('universalContractText')}
          /> */}
        </View>
        <MyTouchableOpacity
          disabled={checkingButton() || disabled}
          onPress={onPressNext}
          style={styles.btn}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <CustomText lebel={t('continue')} size={18} color={colors.white} />
          )}
        </MyTouchableOpacity>
      </>
    );
  }, [
    check,
    checkingButton,
    disabled,
    loading,
    onChangeCheckBox,
    onPressNext,
    t,
  ]);

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.main}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          </View>
          <View>
            <CustomText
              lebel={t('phoneNumber')}
              size={16}
              fontFamily="SourceSansPro-Regular"
              lineHeight={22}
              fontWeight="700"
              mrTop={20}
            />
            <CustomText
              lebel={t('codeSendText')}
              lineHeight={22}
              fontWeight="400"
              size={16}
              mrTop={10}
            />
            <View style={styles.inputContainer}>{renderInput}</View>
          </View>
          <View style={styles.footer}>{renderFooter}</View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  main: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    flex: 1,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginLeft: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  btn: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center',
  },
  header: {
    height: Platform.OS === 'ios' ? 80 : 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    marginTop: 40,
  },
  textInput: {
    flex: 1,
    paddingLeft: 4,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
    color: colors.black,
    backgroundColor: colors.neatural['100'],
    height: 56,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  inputContainerX: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
  },
  codeUz: {
    height: 56,
    width: 81,
    borderRadius: 12,

    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
  },
});

export default PhoneNumberScreen;
