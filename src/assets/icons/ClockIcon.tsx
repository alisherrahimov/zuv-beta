import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const ClockIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M9.992 1.664c-4.6 0-8.325 3.733-8.325 8.333s3.725 8.334 8.325 8.334c4.608 0 8.342-3.734 8.342-8.334S14.6 1.664 9.992 1.664Zm.008 15a6.665 6.665 0 0 1-6.666-6.667A6.665 6.665 0 0 1 10 3.331a6.665 6.665 0 0 1 6.667 6.666A6.665 6.665 0 0 1 10 16.664Zm.417-10.833h-1.25v5l4.375 2.625.625-1.025-3.75-2.225V5.83Z"
        fill="#262626"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ClockIcon;
