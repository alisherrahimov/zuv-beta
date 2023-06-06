import {StyleSheet, Text, View} from 'react-native';
import {colors} from './Colors';
import {fonts} from './fonts';
import { ToastConfig } from "react-native-toast-message";

export const toastConfig = {
  tomatoToast: ({text1}: {text1: string}) => {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <View style={styles.container}>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <Text style={styles.text}>{text1}</Text>
      </View>
    );
  },

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red['600'],
    width: '90%',
    borderRadius: 16,
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: 'bold',
    maxWidth: '100%',
    margin: 16,
  },
});
