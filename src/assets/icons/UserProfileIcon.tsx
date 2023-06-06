import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const UserProfileIcon = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <G
      clipPath="url(#a)"
      stroke="#737373"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M47 43.083c8.652 0 15.666-7.014 15.666-15.666 0-8.653-7.014-15.667-15.666-15.667-8.653 0-15.667 7.014-15.667 15.667 0 8.652 7.014 15.666 15.667 15.666ZM23.5 82.25v-7.833A15.666 15.666 0 0 1 39.167 58.75h15.666A15.666 15.666 0 0 1 70.5 74.417v7.833" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#000" d="M0 0h94v94H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default UserProfileIcon;
