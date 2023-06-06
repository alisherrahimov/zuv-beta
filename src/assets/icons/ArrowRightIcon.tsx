import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const ArrowRightIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="m9 18 6-6-6-6"
        stroke="#8E8E93"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="rotate(-180 12 12)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowRightIcon;
