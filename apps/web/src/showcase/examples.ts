export type ExampleStatus = 'live' | 'soon';

export type ExampleSlot = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  status: ExampleStatus;
  branch: string;
  /** Path appended after BASE_URL when status === 'live' */
  embedPath?: string;
};

export const EXAMPLES: ExampleSlot[] = [
  {
    slug: 'fruit-shop',
    label: 'Fruit Shop',
    tagline: '듀얼 폰 — 라일락 / 과일 카드',
    description:
      '두 폰을 나란히 보여주는 커머스 컨셉. 토큰을 의미 단위로 묶고, spacing 책임을 parent에게 위임한 첫 실험입니다.',
    status: 'live',
    branch: 'feature/fruit-shop-ui',
    embedPath: 'showcases/fruit-shop/',
  },
  {
    slug: 'select-shop',
    label: 'Select Shop',
    tagline: '편집샵 컨셉 — 준비 중',
    description: '컴포넌트 contract 위주로 다시 설계해보는 두 번째 실험. 곧 공개됩니다.',
    status: 'soon',
    branch: 'feature/select-shop-ui',
  },
  {
    slug: 'slot-3',
    label: 'Slot 03',
    tagline: '다음 실험 슬롯',
    description: '레이아웃 contract만으로 화면 하나를 조립해보는 실험을 준비 중입니다.',
    status: 'soon',
    branch: '—',
  },
];

export function findExampleBySlug(slug: string | null): ExampleSlot {
  if (slug) {
    const found = EXAMPLES.find((ex) => ex.slug === slug);
    if (found) return found;
  }
  return EXAMPLES[0];
}
