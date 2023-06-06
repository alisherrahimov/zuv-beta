import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={14} height={8} viewBox="0 0 14 8" fill="none" {...props}>
    <Path
      d="M1 1L7 7L13 1"
      stroke="#999999"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
