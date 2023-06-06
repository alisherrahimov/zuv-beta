import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={2}
    height={props.height}
    viewBox="0 0 2 45"
    fill="none"
    {...props}>
    <Path
      d={`M0.999999 1L0.999999 ${props.height}`}
      stroke="#30D158"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 3"
    />
  </Svg>
);
export default SVGComponent;
