import * as React from "react";
import type { SVGProps } from "react";
const SvgTimeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#DCFFF8"
      d="M16.482 1.667H3.519v1.851H1.667v12.963h1.852v1.852h12.963v-1.852h1.852V3.518h-1.852zm0 1.851v12.963H3.519V3.518zM9.074 5.37h1.852v5.556h3.704v1.852H9.074z"
    />
  </svg>
);
export default SvgTimeIcon;
