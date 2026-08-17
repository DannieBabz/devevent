import * as React from "react";
import type { SVGProps } from "react";
const SvgVenueIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.02 13.005h4v-2h-14v2h4v4H1.022v2H19.02v-2h-6zm-4 4v-4h2v4zM3.019 1.005h14v2h-14zM3.018 3.001h-2c.002 2.668-.002 5.331 0 7.999h2c-.002-2.668.002-5.331 0-7.999M17.02 3.006c.001 2.668-.003 5.331 0 7.999h2c-.003-2.668.001-5.331 0-7.999zM13.019 5.005h2v2h-2z"
    />
  </svg>
);
export default SvgVenueIcon;
