import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={18} height={63} viewBox="0 0 18 63" fill="none" {...props}>
    <G clipPath="url(#clip0_2620_4199)">
      <Path
        d="M9.00016 1.33594C5.32016 1.33594 2.3335 4.3226 2.3335 8.0026C2.3335 11.6826 5.32016 14.6693 9.00016 14.6693C12.6802 14.6693 15.6668 11.6826 15.6668 8.0026C15.6668 4.3226 12.6802 1.33594 9.00016 1.33594ZM9.00016 13.3359C6.0535 13.3359 3.66683 10.9493 3.66683 8.0026C3.66683 5.05594 6.0535 2.66927 9.00016 2.66927C11.9468 2.66927 14.3335 5.05594 14.3335 8.0026C14.3335 10.9493 11.9468 13.3359 9.00016 13.3359Z"
        fill="#30D158"
      />
      <Path
        d="M8.875 9.75C9.91053 9.75 10.75 8.91053 10.75 7.875C10.75 6.83947 9.91053 6 8.875 6C7.83947 6 7 6.83947 7 7.875C7 8.91053 7.83947 9.75 8.875 9.75Z"
        fill="#30D158"
      />
    </G>
    <Path
      d="M9 18L9 42.9998"
      stroke="#30D158"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 3"
    />
    <G clipPath="url(#clip1_2620_4199)">
      <Path
        d="M9 46.5C6.0975 46.5 3.75 48.8475 3.75 51.75C3.75 55.6875 9 61.5 9 61.5C9 61.5 14.25 55.6875 14.25 51.75C14.25 48.8475 11.9025 46.5 9 46.5ZM5.25 51.75C5.25 49.68 6.93 48 9 48C11.07 48 12.75 49.68 12.75 51.75C12.75 53.91 10.59 57.1425 9 59.16C7.44 57.1575 5.25 53.8875 5.25 51.75Z"
        fill="#30D158"
      />
      <Path
        d="M9 53.625C10.0355 53.625 10.875 52.7855 10.875 51.75C10.875 50.7145 10.0355 49.875 9 49.875C7.96447 49.875 7.125 50.7145 7.125 51.75C7.125 52.7855 7.96447 53.625 9 53.625Z"
        fill="#30D158"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2620_4199">
        <Rect width={16} height={16} fill="white" transform="translate(1)" />
      </ClipPath>
      <ClipPath id="clip1_2620_4199">
        <Rect width={18} height={18} fill="white" transform="translate(0 45)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
