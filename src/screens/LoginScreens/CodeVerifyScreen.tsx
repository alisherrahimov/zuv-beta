import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {colors} from '../../helpers/Colors';
import {
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {VerifyScreenRouteDto} from '../../redux/types/types';
import {ArrowLeftIcon} from '../../assets/icons';
import CustomText from '../../components/Text/CustomText';
import {fonts} from '../../helpers/fonts';
import MyTouchableOpacity from '../../components/Button/MyTouchableOpacity';
import useLanguage from '../../hooks/useLanguage';

import {
  LoginAction,
  VerifyCodeAction,
  getActiveAds,
  getUserAction,
  getUserFavourite,
} from '../../redux/apis/userApi';
import {getPercelsAction} from '../../redux/apis/percels';
import {getCouriersAction} from '../../redux/apis/courier';

import {useAppDispatch} from '../../hooks/useStore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {storage} from '../../helpers/dataStorage';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const {height} = Dimensions.get('screen');
const time = new Date();
time.setSeconds(300);

const CodeVerifyScreen = () => {
  const {type, phone} =
    useRoute<RouteProp<VerifyScreenRouteDto, 'Details'>>().params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const t = useLanguage();
  let refTimer = useRef<number>();
  const [verifyCode, setVerifyCode] = useState<string>('');
  const verifyCodeRef = useBlurOnFulfill({value: verifyCode, cellCount: 5});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verifyCode,
    setValue: setVerifyCode,
  });

  const [second, setSecond] = useState<number | void>(59);
  const [endTimer, setEndTimer] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const Timer = useCallback(() => {
    refTimer.current = setInterval(() => {
      setSecond(pr => {
        if (pr === 0) {
          clearInterval(refTimer.current);
          setEndTimer(true);
          return 0;
        } else {
          return Number(pr) - 1;
        }
      });
    }, 1000);
  }, []);
  const toSecond = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '00', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  };
  const isCheckingBtn = () => {
    if (verifyCode.length !== 5) {
      return true;
    } else {
      return false;
    }
  };

  const onChackingVerifyCode = useCallback(() => {
    setLoading(true);
    dispatch(VerifyCodeAction({phone, otp: verifyCode}))
      .then(res => {
        if (res.payload.code === 1) {
          if (res.payload?.user.name !== '' && res.payload?.user?.name) {
            storage.set('token', res.payload.user.access_token);
            storage.set('reftoken', res.payload.user.refresh_token);
            dispatch(getUserAction()).then(val => {
              dispatch(getActiveAds({status: 'active'}));
              dispatch(getCouriersAction());
              dispatch(getPercelsAction());
              dispatch(getUserFavourite());
              clearInterval(refTimer.current);
              navigation.navigate('BottomNavigator');
              setLoading(false);
            });
          } else {
            setLoading(false);
            clearInterval(refTimer.current);
            storage.set('token', res.payload.user.access_token);
            storage.set('reftoken', res.payload.user.refresh_token);
            navigation.navigate('RegisterScreen');
          }
        } else {
          if (res.payload.code === 2) {
            setError(true);
            Toast.show({
              type: 'tomatoToast',
              autoHide: true,
              position: 'top',
              text1: t('sendSmsError'),
            });
          }
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        Toast.show({
          type: 'tomatoToast',
          autoHide: true,
          position: 'top',
          text1: t('sendSmsError'),
        });
      });
  }, [dispatch, phone, verifyCode, navigation, t]);

  const onStartTimer = useCallback(() => {
    setSecond(59);
    setEndTimer(false);
    Timer();
    dispatch(LoginAction(phone));
  }, [Timer, dispatch, phone]);

  // const renderInputs = useMemo(() => {
  //   return (
  //     <View style={styles.row}>
  //       <TextInput
  //         value={code.one}
  //         ref={inputRef1}
  //         maxLength={2}
  //         keyboardType="number-pad"
  //         style={styles.input(error)}
  //         onChangeText={text => {
  //           console.log(text);
  //           if (text === '') {
  //             setCode({...code, one: text});
  //           } else {
  //             setCode({...code, one: text.slice(1, 2)});
  //             inputRef2.current?.focus();
  //           }
  //         }}
  //       />
  //       <TextInput
  //         value={code.two}
  //         ref={inputRef2}
  //         maxLength={2}
  //         keyboardType="number-pad"
  //         style={styles.input(error)}
  //         onKeyPress={({nativeEvent}) => {
  //           if (nativeEvent.key === 'Backspace') {
  //             inputRef1.current?.focus();
  //           }
  //         }}
  //         onChangeText={text => {
  //           if (text === '') {
  //             inputRef1.current?.focus();
  //             setCode({...code, two: text});
  //           } else {
  //             setCode({...code, two: text});
  //             inputRef3.current?.focus();
  //           }
  //         }}
  //       />
  //       <TextInput
  //         value={code.three}
  //         ref={inputRef3}
  //         maxLength={2}
  //         keyboardType="number-pad"
  //         style={styles.input(error)}
  //         onKeyPress={({nativeEvent}) => {
  //           if (nativeEvent.key === 'Backspace') {
  //             inputRef2.current?.focus();
  //           }
  //         }}
  //         onChangeText={text => {
  //           if (text === '') {
  //             inputRef2.current?.focus();
  //             setCode({...code, three: text});
  //           } else {
  //             setCode({...code, three: text});
  //             inputRef4.current?.focus();
  //           }
  //         }}
  //       />
  //       <TextInput
  //         value={code.four}
  //         ref={inputRef4}
  //         maxLength={2}
  //         keyboardType="number-pad"
  //         style={styles.input(error)}
  //         onKeyPress={({nativeEvent}) => {
  //           if (nativeEvent.key === 'Backspace') {
  //             inputRef3.current?.focus();
  //           }
  //         }}
  //         onChangeText={text => {
  //           if (text === '') {
  //             inputRef3.current?.focus();
  //             setCode({...code, four: text});
  //           } else {
  //             inputRef5.current?.focus();
  //             setCode({...code, four: text});
  //           }
  //         }}
  //       />
  //       <TextInput
  //         value={code.five}
  //         ref={inputRef5}
  //         maxLength={2}
  //         keyboardType="number-pad"
  //         style={styles.input(error)}
  //         onKeyPress={({nativeEvent}) => {
  //           if (nativeEvent.key === 'Backspace') {
  //             inputRef4.current?.focus();
  //           }
  //         }}
  //         onChangeText={text => {
  //           if (text === '') {
  //             inputRef4.current?.focus();
  //           }
  //           setCode({...code, five: text});
  //         }}
  //       />
  //     </View>
  //   );
  // }, [code, error]);
  console.log(verifyCode.length);
  const verif = useMemo(() => {
    return (
      <View>
        <CodeField
          ref={verifyCodeRef}
          {...props}
          value={verifyCode}
          onChangeText={text => setVerifyCode(text)}
          cellCount={5}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          textInputStyle={{fontFamily: fonts.bold, color: '#000'}}
          renderCell={({index, symbol, isFocused}) => {
            return (
              <View
                style={{
                  borderRadius: 25,
                  overflow: 'hidden',
                }}>
                <Text
                  key={index}
                  style={[styles.cell(error)]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }, [error, getCellOnLayoutHandler, props, verifyCode, verifyCodeRef]);

  const renderTimer = useMemo(() => {
    return (
      <TouchableOpacity
        disabled={endTimer ? false : true}
        onPress={onStartTimer}>
        <CustomText
          lebel={endTimer ? t('resendCode') : toSecond(Number(second))}
          textAlign="center"
          mrBottom={30}
          size={18}
          fontWeight="700"
        />
      </TouchableOpacity>
    );
  }, [endTimer, onStartTimer, second, t]);

  useEffect(() => {
    Timer();
    return () => {
      clearInterval(refTimer.current);
    };
  }, []);

  return (
    // <KeyboardAvoidingView behavior="height" style={styles.container}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            lebel={t('sentCodeText')}
            size={18}
            fontFamily="SourceSansPro-Regular"
            lineHeight={22}
            fontWeight="700"
            mrTop={20}
          />
          <CustomText
            lebel={t('sentNumberText') + ' ' + phone}
            lineHeight={22}
            fontWeight="400"
            size={18}
            mrTop={10}
          />
        </View>
        <View>{verif}</View>

        <View style={styles.footer}>
          <View style={styles.btn}>
            {renderTimer}
            <MyTouchableOpacity
              disabled={isCheckingBtn() || disabled || loading}
              onPress={onChackingVerifyCode}>
              {loading ? (
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
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.black, height: height},
  main: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    flex: 1,
  },
  btn: {
    width: '100%',
  },
  header: {
    height: Platform.OS === 'ios' ? 80 : 70,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  footer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',

    flex: 1,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  // input: (error: boolean) => ({
  //   width: 56,
  //   height: 56,
  //   backgroundColor: error ? colors.red['50'] : colors.neatural[100],
  //   borderRadius: 12,
  //   fontFamily: fonts.regular,
  //   fontWeight: '700',
  //   color: colors.black,
  //   fontSize: 32,
  //   textAlign: 'center',
  //   borderWidth: error ? 1 : 0,
  //   borderColor: error ? colors.red['600'] : colors.neatural['100'],
  // }),
  codeFiledRoot: {marginTop: 40, justifyContent: 'center'},
  cell: err => {
    return {
      width: 60,
      height: 60,
      fontSize: 40,
      backgroundColor: err ? colors.red['50'] : colors.neatural[100],
      textAlign: 'center',
      borderRadius: 12,
      margin: 3,
      fontFamily: fonts.regular,
      fontWeight: 'bold',
      borderWidth: 2,
      borderColor: err ? colors.red['50'] : colors.neatural[100],
    };
  },
});

export default CodeVerifyScreen;
