import React from 'react';

export default function Logo(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="282px"
      height="194px"
      viewBox="0 0 282 194"
      version="1.1"
      {...props}
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-1"
        >
          <stop stopColor="#E97D7C" offset="0%"></stop>
          <stop stopColor="#EED3AF" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-2"
        >
          <stop stopColor="#427AC0" offset="0%"></stop>
          <stop stopColor="#B5E3F1" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="编组-9" transform="translate(0.632000, 0.148603)">
          <path
            d="M182.90958,0 L280.716906,192.057337 L243.93404,192.057337 L182.90958,71.7097951 L145.783629,150.887038 C145.390823,151.765787 144.986305,152.628587 144.57021,153.475654 L144.318765,154.004573 L144.31301,153.994303 C129.63338,183.317317 100.898992,193.550402 63.7669936,193.844825 L62.1,193.851397 L-6.03961325e-14,193.851397 L-6.03961325e-14,2.30739662 L62.1,2.30739662 C100.18155,2.30739662 129.635457,9.77610347 144.480626,39.9301195 L117.689927,90.3153821 C115.685739,44.1086825 95.1884168,33.1609651 61.4698172,32.9466315 L60.444,32.9433966 L36.156,32.9433966 L36.156,162.663397 L60.444,162.663397 C86.3837575,162.663397 104.17714,155.738978 112.490954,134.176663 L144.331,74.292 L182.90958,0 Z"
            id="形状结合"
            fill="url(#linearGradient-1)"
          />
          <polygon
            id="路径-8"
            fill="url(#linearGradient-2)"
            points="147.752637 193.851397 219.368 193.851397 183.560318 121.859067"
          />
        </g>
      </g>
    </svg>
  );
}
