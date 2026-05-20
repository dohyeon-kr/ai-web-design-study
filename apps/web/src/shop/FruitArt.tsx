type Props = {
  src: string;
  alt: string;
};

export default function FruitArt({ src, alt }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        userSelect: 'none',
      }}
    />
  );
}
