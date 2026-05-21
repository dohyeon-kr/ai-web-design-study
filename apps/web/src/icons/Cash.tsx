import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconCash({ size = 24, ...rest }: IconProps) {
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
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <circle cx="12" cy="12" r="3.1" opacity="0.34" />
      <rect x="5.4" y="10.4" width="3.2" height="3.2" rx="1" opacity="0.42" />
      <rect x="15.4" y="10.4" width="3.2" height="3.2" rx="1" opacity="0.42" />
    </svg>
  );
}
