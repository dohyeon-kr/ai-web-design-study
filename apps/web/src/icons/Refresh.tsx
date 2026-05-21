import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconRefresh({ size = 24, ...rest }: IconProps) {
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
      <path d="M18.9 6.1a8.4 8.4 0 0 0-13.3 2 1.55 1.55 0 0 0 2.8 1.3 5.3 5.3 0 0 1 8.5-1.2l-1.1 1.1c-.7.7-.2 1.9.8 1.9h4.1c.6 0 1.1-.5 1.1-1.1V6c0-1-.2-1.4-.9-.7l-1 1a5 5 0 0 0-1-1.2Z" />
      <path d="M5.1 17.9a8.4 8.4 0 0 0 13.3-2 1.55 1.55 0 0 0-2.8-1.3 5.3 5.3 0 0 1-8.5 1.2l1.1-1.1c.7-.7.2-1.9-.8-1.9H3.3c-.6 0-1.1.5-1.1 1.1V18c0 1 .2 1.4.9.7l1-1c.3.4.6.8 1 1.2Z" />
    </svg>
  );
}
