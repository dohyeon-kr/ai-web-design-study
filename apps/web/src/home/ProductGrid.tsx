import ProductCard, { type Product } from './ProductCard';
import styles from './ProductGrid.module.css';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={styles.grid}>
      {products.map((p) => (
        <li key={p.id} className={styles.cell}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
