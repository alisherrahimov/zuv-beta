import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';

export const styles = StyleSheet.create({
  cn: dis => ({
    backgroundColor: dis ? colors.red['200'] : colors.red['500'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
  }),
});
