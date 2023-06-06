import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M2 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H8C8.55 18 9 17.55 9 17C9 16.45 8.55 16 8 16H2V2Z"
      fill="#262626"
    />
    <Path
      d="M17.65 8.65247L14.86 5.86247C14.54 5.54247 14 5.76247 14 6.21247V8.00247H7C6.45 8.00247 6 8.45247 6 9.00247C6 9.55247 6.45 10.0025 7 10.0025H14V11.7925C14 12.2425 14.54 12.4625 14.85 12.1425L17.64 9.35247C17.84 9.16247 17.84 8.84247 17.65 8.65247Z"
      fill="#262626"
    />
  </Svg>
);
export default SVGComponent;
