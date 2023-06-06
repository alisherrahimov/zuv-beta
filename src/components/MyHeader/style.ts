import {StyleSheet} from 'react-native';
import {colors} from '../../helpers/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red[600],
    height: 155,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 93,
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '90%',
    height: 40,
    backgroundColor: colors.backgroundColor,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  buttons: {
    flexDirection: 'row',
    height: '100%',
  },
  tabButtons: (bgColor: string) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    backgroundColor: bgColor,
    opacity: 100,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  }),
});
