import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={94}
    height={94}
    viewBox="0 0 94 94"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#clip0_813_4250)">
      <Path
        d="M46.9997 43.0833C55.6521 43.0833 62.6663 36.0691 62.6663 27.4167C62.6663 18.7642 55.6521 11.75 46.9997 11.75C38.3472 11.75 31.333 18.7642 31.333 27.4167C31.333 36.0691 38.3472 43.0833 46.9997 43.0833Z"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.5 82.25V74.4167C23.5 70.2616 25.1506 66.2767 28.0887 63.3387C31.0267 60.4006 35.0116 58.75 39.1667 58.75H54.8333C58.9884 58.75 62.9733 60.4006 65.9113 63.3387C68.8494 66.2767 70.5 70.2616 70.5 74.4167V82.25"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_813_4250">
        <Rect width={94} height={94} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
