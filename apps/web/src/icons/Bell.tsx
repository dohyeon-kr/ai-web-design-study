import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconBell({ size = 24, ...rest }: IconProps) {
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
      <path d="M12 2.6c-1.2 0-2.2.8-2.5 1.9C6.7 5.4 5 7.9 5 11.2v3.3l-1.4 2.6c-.4.8.1 1.7 1 1.7h14.8c.9 0 1.4-.9 1-1.7L19 14.5v-3.3c0-3.3-1.7-5.8-4.5-6.7-.3-1.1-1.3-1.9-2.5-1.9Z" />
      <circle cx="8.6" cy="9" r="1.1" opacity="0.38" />
      <path d="M9 20.1h6c-.4 1.1-1.5 1.9-3 1.9s-2.6-.8-3-1.9Z" />
    </svg>
  );
}
