import {TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../Text/CustomText';
import {styles} from './style';
import {colors} from '../../helpers/Colors';
interface TouchableOpacityProps {
  onPress?: () => void;
  title?: string;
  children: any;
  style?: any;
  disabled?: boolean;
}
const MyTouchableOpacity: React.FC<TouchableOpacityProps> = ({
  onPress,
  children,
  style = {},
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.cn(disabled), style]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default MyTouchableOpacity;
