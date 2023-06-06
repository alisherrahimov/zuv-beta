import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';

export const styles = StyleSheet.create({
  ctn: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
  },
  fromcity: {
    maxWidth: '61%',
    // paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  time: {
    justifyContent: 'flex-end',
    width: '33%',
  },
  x: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    marginTop: 13,
    flexDirection: 'row',
  },
  rowx: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fl: {width: '100%'},
  rowb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
  },
  rw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  green: {
    backgroundColor: colors.green,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginLeft: 4,
  },
  image: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
