import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const EyeOpenNoBackgroundIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M10 5.003a8.142 8.142 0 0 1 7.35 4.583A8.142 8.142 0 0 1 10 14.169a8.142 8.142 0 0 1-7.35-4.583A8.142 8.142 0 0 1 10 5.003Zm0-1.667c-4.167 0-7.725 2.592-9.167 6.25 1.442 3.658 5 6.25 9.167 6.25s7.725-2.592 9.167-6.25c-1.442-3.658-5-6.25-9.167-6.25Zm0 4.167A2.084 2.084 0 1 1 10 11.67 2.084 2.084 0 0 1 10 7.503Zm0-1.667a3.756 3.756 0 0 0-3.75 3.75 3.756 3.756 0 0 0 3.75 3.75 3.756 3.756 0 0 0 3.75-3.75A3.756 3.756 0 0 0 10 5.836Z"
        fill="#525252"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EyeOpenNoBackgroundIcon;
