import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const RANK_COLOR: Record<1 | 2 | 3, string> = {
  1: '#ffc24a',
  2: '#c9ccd2',
  3: '#d8956b',
};

export default function IconMedal({ rank, size = 24, ...rest }: IconProps & { rank: 1 | 2 | 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      focusable={false}
      {...rest}
    >
      <circle cx="12" cy="12" r="9" fill={RANK_COLOR[rank]} />
      <circle cx="12" cy="12" r="6.8" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.38" />
      <text
        x="12"
        y="12.9"
        fill="#fff"
        dominantBaseline="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="10.5"
        fontWeight="800"
        textAnchor="middle"
      >
        {rank}
      </text>
    </svg>
  );
}
