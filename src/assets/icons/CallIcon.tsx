import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <G clipPath="url(#clip0_2359_4322)">
      <Path
        d="M16.025 12.7161L13.9084 12.4745C13.4 12.4161 12.9 12.5911 12.5417 12.9495L11.0084 14.4828C8.65003 13.2828 6.7167 11.3578 5.5167 8.99115L7.05837 7.44948C7.4167 7.09115 7.5917 6.59115 7.53337 6.08281L7.2917 3.98281C7.1917 3.14115 6.48337 2.50781 5.63337 2.50781H4.1917C3.25003 2.50781 2.4667 3.29115 2.52503 4.23281C2.9667 11.3495 8.65837 17.0328 15.7667 17.4745C16.7084 17.5328 17.4917 16.7495 17.4917 15.8078V14.3661C17.5 13.5245 16.8667 12.8161 16.025 12.7161Z"
        fill={props.color || '#404040'}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2359_4322">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
