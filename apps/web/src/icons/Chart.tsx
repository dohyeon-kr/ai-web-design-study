import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconChart({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable={false}
      {...rest}
    >
      <rect x="4" y="11.5" width="4" height="7.5" rx="1.4" />
      <rect x="10" y="8" width="4" height="11" rx="1.4" />
      <rect x="16" y="4.5" width="4" height="14.5" rx="1.4" />
      <rect x="3" y="19.8" width="18" height="1.7" rx="0.85" />
    </svg>
  );
}
