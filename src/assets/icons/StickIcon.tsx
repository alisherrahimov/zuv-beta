import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const StickIcon = (props: SvgProps) => (
  <Svg width={2} height={27} fill="none" {...props}>
    <Path
      d="M1 1v25"
      stroke="#30D158"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 3"
    />
  </Svg>
);

export default StickIcon;
