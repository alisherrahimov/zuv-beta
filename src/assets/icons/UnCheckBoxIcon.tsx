import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

const UnCheckBoxIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect
      x={1}
      y={1}
      width={22}
      height={22}
      rx={3}
      stroke="#F50537"
      strokeWidth={2}
    />
  </Svg>
);

export default UnCheckBoxIcon;
