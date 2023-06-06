import * as React from 'react';
import Svg, {
  SvgProps,
  Rect,
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
} from 'react-native-svg';

const NotificationIconWithBackground = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} rx={7} fill="#FF453A" />
    <G clipPath="url(#a)">
      <Path
        d="M15 23.336c.916 0 1.666-.75 1.666-1.667h-3.333c0 .917.75 1.667 1.667 1.667Zm5-5v-4.167c0-2.558-1.359-4.7-3.75-5.266v-.567c0-.692-.559-1.25-1.25-1.25-.692 0-1.25.558-1.25 1.25v.567c-2.384.566-3.75 2.7-3.75 5.266v4.167l-1.667 1.667v.833h13.333v-.833L20 18.336Zm-1.667.833h-6.667v-5c0-2.066 1.259-3.75 3.334-3.75s3.333 1.684 3.333 3.75v5Z"
        fill="#FAFAFA"
      />
      <Circle cx={20.556} cy={9.444} r={3.944} fill="#fff" stroke="#FF453A" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(5 5)" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default NotificationIconWithBackground;
