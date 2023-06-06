import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={18} height={19} viewBox="0 0 18 19" fill="none" {...props}>
    <G clipPath="url(#clip0_2359_4307)">
      <Path
        d="M4.5 14.75C4.5 15.575 5.175 16.25 6 16.25H12C12.825 16.25 13.5 15.575 13.5 14.75V5.75H4.5V14.75ZM6 7.25H12V14.75H6V7.25ZM11.625 3.5L10.875 2.75H7.125L6.375 3.5H3.75V5H14.25V3.5H11.625Z"
        fill="#525252"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2359_4307">
        <Rect
          width={18}
          height={18}
          fill="white"
          transform="translate(0 0.5)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
