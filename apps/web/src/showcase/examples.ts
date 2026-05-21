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
    tagline: 'Quiet Tailoring — 다크 톤 편집샵',
    description:
      '에디토리얼 매거진 흐름으로 설계한 두 번째 실험. 잉크/페이퍼 톤 + 사진 카드 + 큰 타이포로 Fruit Shop과 대조되는 디자인 언어를 보여줍니다.',
    status: 'live',
    branch: 'feature/select-shop-ui',
    embedPath: 'showcases/select-shop/',
  },
  {
    slug: 'slot-3',
    label: '포인트팡',
    tagline: '리워드 게이미피케이션 — 코랄/선샤인 톤',
    description:
      '포인트 적립형 부업 앱을 역설계 스펙(컴포넌트 트리 + 도메인 타입)만으로 조립한 세 번째 실험. 출석 도장 / 미션 그리드 / 랭킹 / 온보딩 단축이 한 화면에 모인 모바일 홈으로, fruit-shop·select-shop과 대비되는 에너제틱한 디자인 언어를 보여줍니다.',
    status: 'live',
    branch: 'feature/slot-3-ui',
    embedPath: 'showcases/slot-3/',
  },
];

export function findExampleBySlug(slug: string | null): ExampleSlot {
  if (slug) {
    const found = EXAMPLES.find((ex) => ex.slug === slug);
    if (found) return found;
  }
  return EXAMPLES[0];
}
