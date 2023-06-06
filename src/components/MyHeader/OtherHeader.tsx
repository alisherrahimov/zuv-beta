import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../helpers/Colors';
import CustomText from '../Text/CustomText';
import {ArrowLeftIcon} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';

interface OtherHeaderProps {
  title?: string;
}

const OtherHeader: React.FC<OtherHeaderProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.button}>
        <ArrowLeftIcon />
      </TouchableOpacity>
      <View style={styles.headerIn}>
        <CustomText lebel={title} size={15} />
      </View>
    </View>
  );
};

export default OtherHeader;

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 100 : 85,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerIn: {
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    marginLeft: 10,
    paddingBottom: 15,
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
  },
});
