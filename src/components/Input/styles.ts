import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';
import {fonts} from '../../helpers/fonts';

export const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.neatural['100'],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
});
