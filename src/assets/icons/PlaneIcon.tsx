import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';

const PlaneIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Rect width={30} height={30} rx={7} fill="#30DB5B" />
    <G clipPath="url(#a)">
      <Path
        d="m17.834 19.164 1.083 3.667H18l-2.166-3.667h-2.5a.836.836 0 0 1-.834-.833c0-.459.375-.834.834-.834h2.5L18 13.831h.917l-1.084 3.666h2.376l.625-.833h.833l-.5 1.667.5 1.666h-.834l-.624-.833h-2.375Zm-8.042-8.333-.625-.834h-.833l.5 1.667-.5 1.667h.833l.625-.834h2.375l-1.083 3.667H12l2.167-3.667h2.5a.836.836 0 0 0 .833-.833.836.836 0 0 0-.833-.833h-2.5L12 7.164h-.916l1.083 3.667H9.792Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(5 5)" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PlaneIcon;
