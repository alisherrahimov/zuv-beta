import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';

export const styles = StyleSheet.create({
  cn: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainBg,
  },
  icon: {
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
  },
  btnContainer: {
    paddingTop: 20,
  },
});
