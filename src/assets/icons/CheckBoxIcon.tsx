import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';

const CheckBoxIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={24} height={24} rx={4} fill="#F50537" />
    <G clipPath="url(#a)">
      <Path
        d="m9 16.202-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4L9 16.202Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CheckBoxIcon;
