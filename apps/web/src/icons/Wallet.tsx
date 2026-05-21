import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconWallet({ size = 24, ...rest }: IconProps) {
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
      <path d="M4.7 5.2h12.6A2.7 2.7 0 0 1 20 7.9v1.2H7.4A2.4 2.4 0 0 1 5 6.7c0-.6-.4-1.2-.3-1.5Z" opacity="0.42" />
      <rect x="3" y="7" width="18" height="12.8" rx="3.2" />
      <rect x="13.2" y="10.5" width="8.4" height="5.8" rx="2.4" />
      <circle cx="16.4" cy="13.4" r="1" opacity="0.44" />
    </svg>
  );
}
