import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HomeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="m12 6.19 5 4.5v7.81h-2v-6H9v6H7v-7.81l5-4.5Zm0-2.69-10 9h3v8h6v-6h2v6h6v-8h3l-10-9Z"
      fill={props.color}
    />
  </Svg>
);

export default HomeIcon;
