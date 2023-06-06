import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={19}
    height={props.height || 60}
    viewBox={`0 0 19 ${
      String(props.height).length > 0 ? Number(props.height) - 20 : 60
    }`}
    fill="none"
    {...props}>
    <G clipPath="url(#clip0_2331_275)">
      <Path
        d="M9.46232 2.06982C5.78232 2.06982 2.79565 5.05649 2.79565 8.73649C2.79565 12.4165 5.78232 15.4032 9.46232 15.4032C13.1423 15.4032 16.129 12.4165 16.129 8.73649C16.129 5.05649 13.1423 2.06982 9.46232 2.06982ZM9.46232 14.0698C6.51565 14.0698 4.12899 11.6832 4.12899 8.73649C4.12899 5.78982 6.51565 3.40316 9.46232 3.40316C12.409 3.40316 14.7957 5.78982 14.7957 8.73649C14.7957 11.6832 12.409 14.0698 9.46232 14.0698Z"
        fill="#30D158"
      />
      <Path
        d="M9.33728 10.4839C10.3728 10.4839 11.2123 9.64442 11.2123 8.60889C11.2123 7.57335 10.3728 6.73389 9.33728 6.73389C8.30175 6.73389 7.46228 7.57335 7.46228 8.60889C7.46228 9.64442 8.30175 10.4839 9.33728 10.4839Z"
        fill="#30D158"
      />
    </G>
    <Path
      d={`M9.46228 18.7341L9.46228 ${Number(props.height) / 1.6 || 58}`}
      stroke="#30D158"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 3"
    />

    <G
      y={String(props.height).length > 0 ? Number(props.height) / 15 : 60}
      clipPath="url(#clip1_2331_275)">
      <Path
        d="M9.46228 47.2339C6.55978 47.2339 4.21228 49.5814 4.21228 52.4839C4.21228 56.4214 9.46228 62.2339 9.46228 62.2339C9.46228 62.2339 14.7123 56.4214 14.7123 52.4839C14.7123 49.5814 12.3648 47.2339 9.46228 47.2339ZM5.71228 52.4839C5.71228 50.4139 7.39228 48.7339 9.46228 48.7339C11.5323 48.7339 13.2123 50.4139 13.2123 52.4839C13.2123 54.6439 11.0523 57.8764 9.46228 59.8939C7.90228 57.8914 5.71228 54.6214 5.71228 52.4839Z"
        fill="#30D158"
      />
      <Path
        d="M9.46228 54.3589C10.4978 54.3589 11.3373 53.5194 11.3373 52.4839C11.3373 51.4484 10.4978 50.6089 9.46228 50.6089C8.42675 50.6089 7.58728 51.4484 7.58728 52.4839C7.58728 53.5194 8.42675 54.3589 9.46228 54.3589Z"
        fill="#30D158"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2331_275">
        <Rect
          width={16}
          height={16}
          fill="white"
          transform="translate(1.46228 0.733887)"
        />
      </ClipPath>
      <ClipPath id="clip1_2331_275">
        <Rect
          width={18}
          height={18}
          fill="white"
          transform="translate(0.46228 45.7339)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;
