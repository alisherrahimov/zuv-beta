import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },

  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  main: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 80,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.buttonColor,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  top: {
    marginTop: 20,
  },
  locationButton: {
    width: '49%',
    backgroundColor: colors.buttonColor,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowx: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dateBtn: (index: number, activeDay: number) => ({
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.neatural['50'],
    borderRadius: 12,
    marginLeft: index === 0 ? 0 : 10,
    borderWidth: index === activeDay ? 1 : 0,
    borderColor: colors.neatural['600'],
  }),
  trasportButton: {
    width: '49%',
    backgroundColor: colors.buttonColor,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowxx: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  footerButton: color => ({
    width: '49%',
    backgroundColor: color,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
