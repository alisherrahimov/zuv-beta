import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';

const RulesIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} rx={7} fill="#5856D6" />
    <G clipPath="url(#a)">
      <Path
        d="m17.083 15.494.75 3.234L15 17.019l-2.833 1.709.75-3.225-2.5-2.159 3.3-.283L15 10.019l1.283 3.034 3.3.283-2.5 2.158ZM15 7.661l5.833 2.592v3.916c0 3.767-2.483 7.242-5.833 8.275-3.35-1.033-5.833-4.508-5.833-8.275v-3.916L15 7.66Zm0-1.825L7.5 9.169v5c0 4.625 3.2 8.95 7.5 10 4.3-1.05 7.5-5.375 7.5-10v-5L15 5.836Z"
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

export default RulesIcon;
