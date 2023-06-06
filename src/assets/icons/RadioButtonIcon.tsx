import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const RadioButtonIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G clipPath="url(#a)" fill="#30D158">
      <Path d="M8 1.336a6.67 6.67 0 0 0-6.667 6.667A6.67 6.67 0 0 0 8 14.669a6.67 6.67 0 0 0 6.667-6.666A6.669 6.669 0 0 0 8 1.336Zm0 12a5.332 5.332 0 0 1-5.333-5.333A5.332 5.332 0 0 1 8 2.669a5.332 5.332 0 0 1 5.334 5.334A5.332 5.332 0 0 1 8 13.336Z" />
      <Path d="M7.875 9.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default RadioButtonIcon;
