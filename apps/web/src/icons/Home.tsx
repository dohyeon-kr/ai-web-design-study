import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconHome({ size = 24, ...rest }: IconProps) {
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
      <path d="M3 11.3 11 4a1.5 1.5 0 0 1 2 0l8 7.3c.8.7.3 2-.8 2h-.7v5.3a2.8 2.8 0 0 1-2.8 2.8H7.3a2.8 2.8 0 0 1-2.8-2.8v-5.3h-.7c-1.1 0-1.6-1.3-.8-2Z" />
      <rect x="10" y="15" width="4" height="6.4" rx="1.2" opacity="0.36" />
    </svg>
  );
}
