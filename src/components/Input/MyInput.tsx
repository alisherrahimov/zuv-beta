import {TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {colors} from '../../helpers/Colors';
interface InputProps {
  placeholder?: string;
  valid?: boolean;
  value?: string;
  onChangeText?: (value: string) => void;
  style?: any;
  defaultValue?: string;
  props?: TextInputProps;
}
const MyInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  defaultValue,
  props,
}) => {
  return (
    <TextInput
      {...props}
      defaultValue={defaultValue}
      value={value}
      style={[styles.input, style]}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.neatural['400']}
    />
  );
};

export default MyInput;
