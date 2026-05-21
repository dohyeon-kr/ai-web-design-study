import { useId, type SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function BrandMark({ size = 24, ...rest }: IconProps) {
  const id = useId();
  const gradientId = `brandmark-grad-${id}`;

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
      <defs>
        <linearGradient id={gradientId} x1="4" x2="20" y1="3" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6b3d" />
          <stop offset="1" stopColor="#ffb020" />
        </linearGradient>
      </defs>
      <path
        d="M5.2 20.5V4.7c0-.8.6-1.4 1.4-1.4h6.6c4 0 6.6 2.4 6.6 6.1s-2.6 6.1-6.6 6.1h-3v5c0 .8-.6 1.4-1.4 1.4H6.6c-.8 0-1.4-.6-1.4-1.4Zm5-9.4h2.7c1.5 0 2.5-.7 2.5-1.9s-1-1.9-2.5-1.9h-2.7v3.8Z"
        fill={`url(#${gradientId})`}
      />
      <circle cx="13.1" cy="9.2" r="1.15" fill="#fff" opacity="0.82" />
    </svg>
  );
}
