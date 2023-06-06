import {Platform, StyleSheet} from 'react-native';
import {colors} from '../helpers/Colors';

export const styles = StyleSheet.create({
  buttonContainer: size => ({
    alignItems: 'center',
    paddingTop: 10,
    flex: 1,
    height: 60,
    backgroundColor: colors.white,
    marginBottom: Platform.OS === 'ios' ? size - 20 : size,
  }),
  bottom: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
