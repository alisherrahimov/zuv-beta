import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const PenIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)" fill="#262626">
      <Path d="M3 21.005h3.75l11.06-11.06-3.75-3.75L3 17.255v3.75Zm2-2.92 9.06-9.06.92.92-9.06 9.06H5v-.92ZM18.37 3.292a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PenIcon;
