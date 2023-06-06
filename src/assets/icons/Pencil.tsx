import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={14} height={15} viewBox="0 0 14 15" fill="none" {...props}>
    <Path
      d="M0.25 14.2481H3.0625L11.3575 5.95312L8.545 3.14062L0.25 11.4356V14.2481ZM1.75 12.0581L8.545 5.26313L9.235 5.95312L2.44 12.7481H1.75V12.0581Z"
      fill="white"
    />
    <Path
      d="M11.7777 0.969375C11.4852 0.676875 11.0127 0.676875 10.7202 0.969375L9.34766 2.34187L12.1602 5.15438L13.5327 3.78188C13.8252 3.48938 13.8252 3.01688 13.5327 2.72438L11.7777 0.969375Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;
