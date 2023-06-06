import * as React from 'react';
import Svg, {SvgProps, Path, Rect, Polygon} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 496 496"
    style={{
      enableBackground: 'new 0 0 496 496',
    }}
    xmlSpace="preserve"
    {...props}>
    <Path
      style={{
        fill: '#E73B36',
      }}
      d="M0,304v65.6C0,396.8,21.6,416,48,416h400c26.4,0,48-19.2,48-46.4V304H0z"
    />
    <Path
      style={{
        fill: '#F0F7F6',
      }}
      d="M448,80H48C21.6,80,0,99.2,0,126.4V192h496v-65.6C496,99.2,474.4,80,448,80z"
    />
    <Rect
      y={192}
      style={{
        fill: '#3757A6',
      }}
      width={496}
      height={112}
    />
    <Path
      style={{
        fill: '#D31C1C',
      }}
      d="M446.4,416c26.4,0,49.6-19.2,49.6-46.4V304H315.2L446.4,416z"
    />
    <Path
      style={{
        fill: '#DFF2EF',
      }}
      d="M448,80H48l132.8,112H496v-65.6C496,99.2,474.4,80,448,80z"
    />
    <Polygon
      style={{
        fill: '#20448E',
      }}
      points="316,304 496,304 496,192 180,192 "
    />
    <Path
      style={{
        fill: '#CAEAE4',
      }}
      d="M448,80H48l370.4,112H496v-65.6C496,99.2,474.4,80,448,80z"
    />
    <Polygon
      style={{
        fill: '#103577',
      }}
      points="496,214.4 496,192 414.4,192 "
    />
    <Path
      style={{
        fill: '#C41010',
      }}
      d="M496,368.8c0,29.6-21.6,47.2-48,47.2H48c-26.4,0-48-20.8-48-48"
    />
  </Svg>
);
export default SVGComponent;
