import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconGift({ size = 24, ...rest }: IconProps) {
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
      <path d="M7.7 3.2c1.5 0 2.8 1.1 3.7 2.5.9-1.4 2.2-2.5 3.7-2.5 1.6 0 2.9 1.1 2.9 2.6 0 .8-.4 1.5-1 2h1.5A2.5 2.5 0 0 1 21 10.3V12H3v-1.7a2.5 2.5 0 0 1 2.5-2.5H7c-.6-.5-1-1.2-1-2 0-1.5 1.3-2.6 2.9-2.6Z" />
      <path d="M4.2 13.4h15.6v5.2a2.8 2.8 0 0 1-2.8 2.8H7a2.8 2.8 0 0 1-2.8-2.8v-5.2Z" />
      <path d="M10.5 7.8H8.7c-.8 0-1.3-.5-1.3-1.1 0-.6.5-1.1 1.3-1.1.8 0 1.5.8 1.8 2.2ZM13.5 7.8h1.8c.8 0 1.3-.5 1.3-1.1 0-.6-.5-1.1-1.3-1.1-.8 0-1.5.8-1.8 2.2Z" opacity="0.42" />
      <rect x="10.4" y="7.8" width="3.2" height="13.6" rx="1" />
      <circle cx="12" cy="7.8" r="1.15" />
    </svg>
  );
}
