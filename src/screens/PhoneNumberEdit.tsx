import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {colors} from '.././helpers/Colors';
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
import {VerifyScreenRouteDto} from '.././redux/types/types';
import {ArrowLeftIcon} from '.././assets/icons';
import CustomText from '.././components/Text/CustomText';
import {fonts} from '.././helpers/fonts';
import MyTouchableOpacity from '.././components/Button/MyTouchableOpacity';
import useLanguage from '.././hooks/useLanguage';

import {
  VerifyCodeAction,
  getUserAction,
  onChangePhoneAction,
} from '.././redux/apis/userApi';
import {useAppDispatch} from '.././hooks/useStore';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const {height} = Dimensions.get('screen');
const time = new Date();
time.setSeconds(300);

const PhoneNumberEdit = () => {
  const {phone} = useRoute<RouteProp<VerifyScreenRouteDto, 'Details'>>().params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const t = useLanguage();

  const [verifyCode, setVerifyCode] = useState<string>('');
  const verifyCodeRef = useBlurOnFulfill({value: verifyCode, cellCount: 5});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verifyCode,
    setValue: setVerifyCode,
  });

  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const isCheckingBtn = () => {
    if (verifyCode.length !== 5) {
      return true;
    } else {
      return false;
    }
  };

  const onChackingVerifyCode = useCallback(() => {
    setLoading(true);
    try {
      dispatch(onChangePhoneAction({phone: phone, otp: verifyCode}))
        .then(res => {
          console.log(res.payload, 'codedadsadsd');
          if (res.payload?.code == 1) {
            setLoading(false);
            dispatch(getUserAction()).then(() => {
              setLoading(false);
              navigation.navigate('BottomNavigator');
            });
          } else {
            setLoading(false);
            setError(true);
          }
        })
        .catch(err => {
          setError(true);
          setLoading(false);
          console.log(err, 'erororrrr');
        });
    } catch {
      setError(true);
    }
  }, [dispatch, navigation, phone, verifyCode]);

  const renderInputs = useMemo(() => {
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
        <View>{renderInputs}</View>

        <View style={styles.footer}>
          <View style={styles.btn}>
            {/* {renderTimer} */}
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
  codeFiledRoot: {marginTop: 40, justifyContent: 'center'},
});

export default PhoneNumberEdit;
