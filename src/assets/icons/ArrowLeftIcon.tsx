import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const ArrowLeftIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M16.62 2.993a1.25 1.25 0 0 0-1.77 0l-8.31 8.31a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77l-7.24-7.25 7.25-7.25c.48-.48.48-1.28-.01-1.76Z"
        fill="#8E8E93"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowLeftIcon;
