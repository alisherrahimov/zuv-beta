import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M8.99199 0.664062C4.39199 0.664062 0.666992 4.3974 0.666992 8.9974C0.666992 13.5974 4.39199 17.3307 8.99199 17.3307C13.6003 17.3307 17.3337 13.5974 17.3337 8.9974C17.3337 4.3974 13.6003 0.664062 8.99199 0.664062ZM9.00033 15.6641C5.31699 15.6641 2.33366 12.6807 2.33366 8.9974C2.33366 5.31406 5.31699 2.33073 9.00033 2.33073C12.6837 2.33073 15.667 5.31406 15.667 8.9974C15.667 12.6807 12.6837 15.6641 9.00033 15.6641ZM9.41699 4.83073H8.16699V9.83073L12.542 12.4557L13.167 11.4307L9.41699 9.20573V4.83073Z"
      fill="#262626"
    />
  </Svg>
);
export default SVGComponent;