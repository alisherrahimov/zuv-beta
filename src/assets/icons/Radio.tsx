import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <G clipPath="url(#clip0_2620_4200)">
      <Path
        d="M8.00016 1.33594C4.32016 1.33594 1.3335 4.3226 1.3335 8.0026C1.3335 11.6826 4.32016 14.6693 8.00016 14.6693C11.6802 14.6693 14.6668 11.6826 14.6668 8.0026C14.6668 4.3226 11.6802 1.33594 8.00016 1.33594ZM8.00016 13.3359C5.0535 13.3359 2.66683 10.9493 2.66683 8.0026C2.66683 5.05594 5.0535 2.66927 8.00016 2.66927C10.9468 2.66927 13.3335 5.05594 13.3335 8.0026C13.3335 10.9493 10.9468 13.3359 8.00016 13.3359Z"
        fill="#30D158"
      />
      <Path
        d="M7.875 9.75C8.91053 9.75 9.75 8.91053 9.75 7.875C9.75 6.83947 8.91053 6 7.875 6C6.83947 6 6 6.83947 6 7.875C6 8.91053 6.83947 9.75 7.875 9.75Z"
        fill="#30D158"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2620_4200">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
