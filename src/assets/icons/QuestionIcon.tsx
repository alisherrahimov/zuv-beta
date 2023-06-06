import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';

const QuestionIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} rx={7} fill="#FF2D55" />
    <G clipPath="url(#a)">
      <Path
        d="M14.167 19.997h1.667v-1.666h-1.667v1.666ZM15 6.664a8.336 8.336 0 0 0-8.333 8.333c0 4.6 3.733 8.334 8.333 8.334s8.334-3.734 8.334-8.334S19.6 6.664 15 6.664Zm0 15a6.676 6.676 0 0 1-6.666-6.667A6.675 6.675 0 0 1 15 8.331a6.676 6.676 0 0 1 6.667 6.666A6.676 6.676 0 0 1 15 21.664Zm0-11.667a3.332 3.332 0 0 0-3.333 3.334h1.667c0-.917.75-1.667 1.666-1.667.917 0 1.667.75 1.667 1.667 0 1.666-2.5 1.458-2.5 4.166h1.667c0-1.875 2.5-2.083 2.5-4.166A3.332 3.332 0 0 0 15 9.997Z"
        fill="#FAFAFA"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(5 5)" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default QuestionIcon;
