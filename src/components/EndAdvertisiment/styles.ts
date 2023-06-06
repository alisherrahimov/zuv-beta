import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';

export const styles = StyleSheet.create({
  ctn: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
  },
  cardInside: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  button: (color: string, isBorder) => ({
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    borderWidth: isBorder ? 0.5 : 0,
    borderColor: isBorder ? colors.neatural[300] : null,
    paddingHorizontal: 16,
  }),

  info: {
    marginTop: 13,
    flexDirection: 'row',
  },
  rowx: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  fl: {flex: 1},
  rowb: {
    alignItems: 'flex-end',
    marginTop: 13,
  },
  rw: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  green: {
    backgroundColor: colors.green,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginLeft: 4,
  },
  iconCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconsCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerCard: {
    borderTopColor: colors.neatural[300],
    borderTopWidth: 0.5,
  },
  image: {
    width: 24,
    height: 24,
  },
});
