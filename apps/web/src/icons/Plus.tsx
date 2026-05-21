import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconPlus({ size = 24, ...rest }: IconProps) {
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
      <rect x="4" y="10" width="16" height="4" rx="2" />
      <rect x="10" y="4" width="4" height="16" rx="2" />
    </svg>
  );
}
