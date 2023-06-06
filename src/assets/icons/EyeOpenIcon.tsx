import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';

const EyeOpenIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} rx={7} fill="#30DB5B" />
    <G clipPath="url(#a)">
      <Path
        d="M15 10.003a8.142 8.142 0 0 1 7.35 4.583A8.142 8.142 0 0 1 15 19.169a8.142 8.142 0 0 1-7.35-4.583A8.142 8.142 0 0 1 15 10.003Zm0-1.667c-4.166 0-7.725 2.592-9.166 6.25 1.441 3.658 5 6.25 9.166 6.25 4.167 0 7.725-2.592 9.167-6.25-1.442-3.658-5-6.25-9.167-6.25Zm0 4.167A2.084 2.084 0 1 1 15 16.67 2.084 2.084 0 0 1 15 12.503Zm0-1.667a3.756 3.756 0 0 0-3.75 3.75 3.756 3.756 0 0 0 3.75 3.75 3.756 3.756 0 0 0 3.75-3.75 3.756 3.756 0 0 0-3.75-3.75Z"
        fill="#FAFAFA"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(5 5)" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EyeOpenIcon;
