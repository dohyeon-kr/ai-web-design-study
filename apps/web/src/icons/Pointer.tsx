import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function IconPointer({ size = 24, ...rest }: IconProps) {
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
      <path d="M9 2.8a2 2 0 0 1 2 2v7.7l.7-.7a2.2 2.2 0 0 1 3.1 0l.5.5.4-.4a2.1 2.1 0 0 1 3 .1 2.3 2.3 0 0 1 .6 1.6v2.9c0 3.1-2.4 5.5-5.5 5.5h-2.6a6.4 6.4 0 0 1-5.1-2.5l-3-4a2.1 2.1 0 0 1 3.1-2.8l.8.7V4.8a2 2 0 0 1 2-2Z" />
      <path d="M12.7 14.7c.3-.3.8-.3 1.1 0l.8.8c.4.4 1 .4 1.4 0l.7-.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-.7.7a3 3 0 0 1-4.2 0l-.8-.8c-.3-.3-.3-.8 0-1.1Z" opacity="0.26" />
    </svg>
  );
}
