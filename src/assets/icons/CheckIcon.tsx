import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const CheckIcon = (props: SvgProps) => (
  <Svg width={18} height={19} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="m6.75 12.652-2.625-2.625a.738.738 0 0 0-1.05 0 .738.738 0 0 0 0 1.05l3.142 3.143a.747.747 0 0 0 1.058 0l7.95-7.943a.738.738 0 0 0 0-1.05.738.738 0 0 0-1.05 0L6.75 12.652Z"
        fill="#FAFAFA"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(0 .5)" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CheckIcon;
