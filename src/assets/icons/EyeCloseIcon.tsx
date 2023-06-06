import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';

const EyeCloseIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} rx={7} fill="#FF6482" />

    <G clipPath="url(#a)">
      <Path
        d="M15 9.997a8.142 8.142 0 0 1 7.35 4.584 8.039 8.039 0 0 1-2.008 2.6l1.175 1.175a9.834 9.834 0 0 0 2.65-3.775c-1.442-3.659-5-6.25-9.167-6.25a9.876 9.876 0 0 0-3.033.475l1.375 1.375A8.427 8.427 0 0 1 15 9.997Zm-.892.95 1.726 1.725c.474.209.858.592 1.066 1.067l1.725 1.725c.067-.283.117-.583.117-.892.008-2.066-1.675-3.741-3.742-3.741-.308 0-.6.041-.892.116ZM6.675 8.222l2.234 2.234a9.782 9.782 0 0 0-3.076 4.125c1.442 3.658 5 6.25 9.167 6.25a9.774 9.774 0 0 0 3.6-.684l2.85 2.85 1.175-1.175L7.85 7.04 6.675 8.222Zm6.25 6.25 2.175 2.175c-.033.009-.066.017-.1.017a2.084 2.084 0 0 1-2.083-2.083c0-.042.008-.067.008-.109Zm-2.833-2.833 1.458 1.458c-.192.459-.3.959-.3 1.484a3.756 3.756 0 0 0 5.225 3.45l.817.816c-.734.2-1.5.317-2.292.317a8.142 8.142 0 0 1-7.35-4.583 8.252 8.252 0 0 1 2.442-2.942Z"
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

export default EyeCloseIcon;
