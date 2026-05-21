import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconPencil({ size = 24, ...rest }: IconProps) {
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
      <path d="M15.9 3.1a2.2 2.2 0 0 1 3.1 0l1.9 1.9a2.2 2.2 0 0 1 0 3.1l-1 1-5-5 1-1Z" />
      <path d="m13.6 5.4 5 5-8.5 8.5-5.7.7.7-5.7 8.5-8.5Z" />
      <path d="m4.2 19.8 2.9-.4-2.5-2.5-.4 2.9Z" />
      <path d="m14.5 6.3 3.2 3.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" opacity="0.32" />
    </svg>
  );
}
