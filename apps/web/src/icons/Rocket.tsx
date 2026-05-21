import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconRocket({ size = 24, ...rest }: IconProps) {
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
      <path d="M20.9 3.1c.3 3.8-.8 7.5-3.3 10l-3.2 3.2-6.7-6.7 3.2-3.2c2.5-2.5 6.2-3.6 10-3.3Z" />
      <path d="M8.5 10.9 5 12a2.9 2.9 0 0 0-2 2.8v1.9l7.1-2.4-1.6-3.4ZM13.1 15.5 12 19a2.9 2.9 0 0 1-2.8 2H7.3l2.4-7.1 3.4 1.6Z" />
      <path d="M7.2 16.8c-1.4.3-2.5 1-3.2 2.1-.4.7.2 1.5 1 1.2 1.1-.4 2.1-1 3.2-2.1l-1-1.2Z" />
      <circle cx="15.7" cy="8.3" r="1.6" opacity="0.42" />
    </svg>
  );
}
