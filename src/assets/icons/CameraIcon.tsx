import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const CameraIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G
      clipPath="url(#a)"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <Path d="M5 7h2a2 2 0 0 0 2-2 1 1 0 0 1 1-1h2m9 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2M15 6h6M18 3v6" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CameraIcon;
