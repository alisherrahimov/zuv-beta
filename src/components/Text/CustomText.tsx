import {Text, TextStyle} from 'react-native';
import React from 'react';
import {colors} from '../../helpers/Colors';

interface TextProps {
  size?: number | undefined;
  fontFamily?:
    | 'SourceSansPro-Black'
    | 'SourceSansPro-Bold'
    | 'SourceSansPro-Light'
    | 'SourceSansPro-Regular';
  color?: string | undefined;
  lineHeight?: number | undefined;
  lebel: string;
  mnLeft?: number;
  mrRight?: number;
  pngRight?: number;
  pngLeft?: number;
  bottom?: number;
  top?: number;
  mrTop?: number;
  mrBottom?: number;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  opacity?: number;
  style?: TextStyle;
}
const CustomText: React.FC<TextProps> = ({
  color,
  fontFamily = 'SourceSansPro-Regular',
  size = 14,
  lineHeight,
  lebel,
  pngLeft,
  pngRight,
  mnLeft,
  mrRight,
  textAlign,
  bottom,
  top,
  fontWeight,
  mrBottom,
  mrTop,
  opacity = 1,
  style,
}) => {
  return (
    <Text
      style={{
        color: color || colors.black,
        fontFamily: fontFamily,
        fontSize: size,
        lineHeight: lineHeight,
        marginRight: mrRight,
        marginLeft: mnLeft,
        paddingLeft: pngLeft,
        paddingRight: pngRight,
        textAlign: textAlign,
        top: top,
        bottom: bottom,
        fontWeight: fontWeight,
        marginTop: mrTop,
        marginBottom: mrBottom,
        opacity: opacity,
        ...style,
      }}>
      {lebel || ''}
    </Text>
  );
};

export default CustomText;
