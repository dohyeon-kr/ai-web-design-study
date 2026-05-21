import type { Route } from '../shared/routing';
import styles from './LandingPage.module.css';

type Props = {
  onNavigate: (route: Route) => void;
};

type CodeTone = 'plain' | 'accent' | 'warn' | 'ok';
type CodeFragment = { id: string; tone?: CodeTone; text: string };

const TONE_CLASS: Record<Exclude<CodeTone, 'plain'>, string> = {
  accent: styles.codeAccent,
  warn: styles.codeWarn,
  ok: styles.codeOk,
};

function CodeBlock({ fragments }: { fragments: CodeFragment[] }) {
  return (
    <pre className={styles.codeBlock}>
      {fragments.map((frag) => {
        const tone = frag.tone ?? 'plain';
        const className = tone === 'plain' ? undefined : TONE_CLASS[tone];
        return (
          <span key={frag.id} className={className}>
            {frag.text}
          </span>
        );
      })}
    </pre>
  );
}

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div className={styles.root}>
      <Hero onNavigate={onNavigate} />
      <RiskMatrix />
      <DividerResearch />
      <TokenLadder />
      <SkillStructure />
      <SkillsInUse />
      <Conclusion />
    </div>
  );
}

function DividerResearch() {
  return (
    <figure className={styles.sectionDivider}>
      <img
        src={`${import.meta.env.BASE_URL}images/landing-divider-research.png`}
        alt="레이아웃 그리드와 연결선이 교차하는 연구 노트 구분선"
        loading="lazy"
      />
    </figure>
  );
}

function Hero({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <section className={`${styles.section} ${styles.hero}`}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Research notes · 2026
        </span>
        <h1 className={styles.heroTitle}>
          Agent에게 CSS를 <br />
          <span className={styles.heroTitleAccent}>어디까지</span> 맡길 수 있는가?
        </h1>
        <p className={styles.heroSub}>
          이 프로젝트는 AI 에이전트에게 웹 디자인 구현을 위임하는 방법을 실험합니다. CSS는 "코드
          생성"보다 의도 해석·영향 범위 제어·회귀 방지가 어렵고, 그래서 진짜 설계 대상은 Agent가
          아니라 Agent에게 노출되는 작업 경계와 검증 시스템입니다.
        </p>
        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => onNavigate({ name: 'showcase', exampleSlug: null })}
          >
            쇼케이스 보기 →
          </button>
          <a
            className={styles.btnGhost}
            href="https://github.com/dohyeon-kr/ai-web-design-study"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 저장소
          </a>
        </div>
      </div>
      <aside className={styles.heroAside}>
        <figure className={styles.heroFigure}>
          <img
            className={styles.heroImage}
            src={`${import.meta.env.BASE_URL}images/landing-hero-moodshot.jpg`}
            alt="잉크와 그리드가 담긴 디자이너의 작업 책상"
            loading="eager"
            fetchPriority="high"
          />
        </figure>
        <div className={styles.heroCard}>
          <span className={styles.heroCardLabel}>Core hypothesis</span>
          <p className={styles.heroCardQuote}>
            CSS를 Agent에게 맡기는 일은
            <br />
            <strong>"더 똑똑한 Agent"를 만드는 일</strong>이 아니라
            <br />
            <strong>"Agent가 망치기 어려운 시스템"</strong>을 만드는 일에 가깝다.
          </p>
          <p className={styles.heroCardFootnote}>
            위임의 단위는 코드가 아니라 contract — Agent가 다루는 추상화 레벨을 끌어올려야 한다.
          </p>
        </div>
      </aside>
    </section>
  );
}

function RiskMatrix() {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Section 01 · Risk matrix
      </span>
      <h2 className={styles.sectionHeading}>잘하는 작업과 위험한 작업을 가른다</h2>
      <p className={styles.sectionLede}>
        Agent에게 무엇이든 시키지 않는다. CSS 작업은 영향 범위가 큰 만큼, Agent가 안전하게 수행
        가능한 작업과 그렇지 않은 작업을 시스템 수준에서 가른다.
      </p>
      <div className={styles.riskGrid}>
        <article className={`${styles.riskCard} ${styles.riskCardSafe}`}>
          <span className={`${styles.riskBadge} ${styles.riskBadgeSafe}`}>Agent가 잘하는 작업</span>
          <h3 className={styles.riskTitle}>경계가 닫혀 있는 변경</h3>
          <ul className={styles.riskList}>
            <li>단순 스타일 추가 / 토큰 적용</li>
            <li>반복적인 클래스 정리·정렬</li>
            <li>반응형 보정 (기존 break point 안)</li>
            <li>기존 패턴을 따른 컴포넌트 스타일 작성</li>
            <li>스토리북 변형 추가</li>
          </ul>
        </article>
        <article className={`${styles.riskCard} ${styles.riskCardDanger}`}>
          <span className={`${styles.riskBadge} ${styles.riskBadgeDanger}`}>
            Agent에게 위험한 작업
          </span>
          <h3 className={styles.riskTitle}>경계를 넘는 변경</h3>
          <ul className={styles.riskList}>
            <li>전역 CSS 수정</li>
            <li>레이아웃 구조 변경</li>
            <li>z-index / position / overflow 조작</li>
            <li>디자인 토큰 자체 변경</li>
            <li>여러 페이지에 영향 주는 공통 컴포넌트 수정</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function TokenLadder() {
  const rows = [
    {
      tag: 'Level 01',
      name: 'Primitive Token',
      example: 'gray.100 · spacing.4 · radius.xl2',
      verdict: '직접 선택 금지',
      verdictClass: styles.verdictRefuse,
    },
    {
      tag: 'Level 02',
      name: 'Semantic Token',
      example: 'text.primary · surface.default · border.subtle',
      verdict: '조심해서 허용',
      verdictClass: styles.verdictCautious,
    },
    {
      tag: 'Level 03',
      name: 'Component Contract',
      example: 'Button variant="primary" size="md"',
      verdict: 'Agent에게 권장',
      verdictClass: styles.verdictPrefer,
    },
    {
      tag: 'Level 04',
      name: 'Layout Contract',
      example: 'Stack gap="md" · Cluster justify="between"',
      verdict: 'Agent에게 권장',
      verdictClass: styles.verdictPrefer,
    },
  ];

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Section 02 · Token trap
      </span>
      <h2 className={styles.sectionHeading}>"토큰을 썼다" ≠ "디자인 시스템을 따랐다"</h2>
      <p className={styles.sectionLede}>
        토큰만 도입해서는 부족하다. Agent는 토큰을 임의 조합할 수 있다. 선택 가능한 추상화 레벨을
        올려서 "픽셀"이 아니라 "의도"를 다루게 해야 한다.
      </p>
      <div className={styles.ladder}>
        {rows.map((row) => (
          <div key={row.tag} className={styles.ladderRow}>
            <div className={styles.ladderLevel}>
              <span className={styles.ladderLevelTag}>{row.tag}</span>
              <span className={styles.ladderLevelName}>{row.name}</span>
            </div>
            <pre className={styles.ladderExample}>{row.example}</pre>
            <span className={`${styles.ladderVerdict} ${row.verdictClass}`}>{row.verdict}</span>
          </div>
        ))}
      </div>
      <div className={styles.code}>
        <div className={styles.codeHeader}>example · token misuse</div>
        <CodeBlock
          fragments={[
            { id: 'tm-bad-header', text: '// 나쁨 — 토큰을 썼지만 임의 조합\n' },
            {
              id: 'tm-bad-body',
              tone: 'warn',
              text: 'color: vars.color.gray[473]\npadding: vars.spacing[13]\nborderRadius: vars.radius.xl2',
            },
            { id: 'tm-good-header', text: '\n\n// 좋음 — 의미 단위로 묶인 contract\n' },
            {
              id: 'tm-good-body',
              tone: 'ok',
              text: 'variant: "primary"\nsize: "md"\ntone: "brand"\ndensity: "comfortable"',
            },
          ]}
        />
      </div>
    </section>
  );
}

function SkillStructure() {
  const steps = [
    {
      title: '철학',
      body: 'CSS는 속성 조합이 아니라 layout responsibility를 설계하는 작업이다.',
    },
    {
      title: '원칙',
      body: 'spacing은 parent gap을 우선한다.',
    },
    {
      title: '금지',
      body: '형제 간 간격을 만들기 위해 child margin을 추가하지 않는다.',
    },
    {
      title: '예시',
      body: 'List 내부 Item 간격은 Item margin-bottom이 아니라 List gap으로 처리한다.',
    },
    {
      title: '검증',
      body: 'Item이 다른 컨테이너에서 재사용될 때 불필요한 외부 간격이 생기지 않아야 한다.',
    },
  ];

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Section 03 · Skill structure
      </span>
      <h2 className={styles.sectionHeading}>Skill은 문법이 아니라 판단을 주입한다</h2>
      <p className={styles.sectionLede}>
        Agent skill의 역할은 "CSS 생성 규칙"이 아니라 "CSS 사고방식"을 박는 것이다. 다음 5단 구조가
        가장 안정적이다.
      </p>
      <div className={styles.skillLayout}>
        <ol className={styles.skillSteps}>
          {steps.map((step, idx) => (
            <li key={step.title} className={styles.skillStep}>
              <span className={styles.skillStepIndex}>{String(idx + 1).padStart(2, '0')}</span>
              <div className={styles.skillStepBody}>
                <h3 className={styles.skillStepTitle}>{step.title}</h3>
                <p className={styles.skillStepText}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.code}>
          <div className={styles.codeHeader}>example · skill prompt</div>
          <CodeBlock
            fragments={[
              { id: 'sk-title', text: '# CSS Agent Skill\n\n' },
              { id: 'sk-check-head', tone: 'accent', text: '## 수정 전 확인' },
              {
                id: 'sk-check-body',
                text:
                  '\n- 이 요소는 block / flex / grid / absolute 중 무엇인가?' +
                  '\n- sizing 책임은 self vs parent 중 누구에게 있는가?' +
                  '\n- spacing 책임은 parent gap vs child margin 중 누구에게 있는가?' +
                  '\n- overflow / z-index / position을 건드리는가?' +
                  '\n- token / variant / recipe로 해결 가능한가?' +
                  '\n\n',
              },
              { id: 'sk-deny-head', tone: 'warn', text: '## 금지' },
              {
                id: 'sk-deny-body',
                text:
                  '\n- 임의 px 추가' +
                  '\n- primitive token 직접 선택' +
                  '\n- 의도 없는 overflow: hidden' +
                  '\n- width: 100% 만 추가해서 해결 시도' +
                  '\n\n',
              },
              { id: 'sk-prefer-head', tone: 'ok', text: '## 선호' },
              {
                id: 'sk-prefer-body',
                text:
                  '\n- parent gap' +
                  '\n- min-width: 0 명시' +
                  '\n- semantic token / recipe variant' +
                  '\n- layout contract 추가',
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

const SKILL_REPO_BASE =
  'https://github.com/dohyeon-kr/ai-web-design-study/blob/main/.claude/skills';

type SkillGroup = {
  label: string;
  caption: string;
  skills: {
    id: string;
    headline: string;
    summary: string;
    triggers: string[];
    pillars: string[];
    docHref: string;
  }[];
};

function SkillsInUse() {
  const groups: SkillGroup[] = [
    {
      label: 'Guide — 작업을 시작·진행할 때',
      caption: '판단의 기준과 어휘를 작업 직전에 주입',
      skills: [
        {
          id: 'css-judgment',
          headline: 'CSS work 판단',
          summary:
            'CSS는 속성 조합이 아니라 책임·언어·범위의 설계. padding/gap부터 z-index/overflow, 토큰 직접 사용까지 — 작업 직전에 세 가지 렌즈로 판단을 강제한다.',
          triggers: [
            'padding · margin · gap · 사이징',
            'z-index · overflow · sticky · position',
            'primitive token 직접 사용',
          ],
          pillars: ['Layout responsibility', 'Design language', 'Blast radius'],
          docHref: `${SKILL_REPO_BASE}/css-judgment/SKILL.md`,
        },
        {
          id: 'image-asset-strategy',
          headline: 'UI 시작 전 자산 카탈로그',
          summary:
            'UI 작업이 reference 이미지에서 시작하면 SVG로 사진을 흉내내는 충동이 먼저 나온다. 자산 슬롯을 먼저 카탈로그하고 Codex의 imagegen으로 라우팅한다.',
          triggers: [
            'design reference / mockup / Figma URL',
            'human · model · product · hero photo',
            'editorial / 3D-rendered visual',
          ],
          pillars: ['Catalog first', 'Route to /codex:rescue', 'Inline SVG는 UI 아이콘만'],
          docHref: `${SKILL_REPO_BASE}/image-asset-strategy/SKILL.md`,
        },
        {
          id: 'korean-typography',
          headline: '한글 본문 typography 표준',
          summary:
            'Stripe / Linear / Smashing 같은 영문 디자인 article의 type scale을 그대로 가져오면 한글에선 작고 답답해진다. Pretendard + line-height 1.7± + word-break:keep-all 등 한글 기준 7개 self-question.',
          triggers: [
            '본문이 한글 위주인 페이지',
            '"글자가 작아 / 행간이 답답해 / 끝 정렬 어색해"',
            'font-family / 토큰 / wrap 규칙 설계',
          ],
          pillars: ['Pretendard 1순위 폰트 스택', 'line-height 1.7±', 'word-break: keep-all'],
          docHref: `${SKILL_REPO_BASE}/korean-typography/SKILL.md`,
        },
      ],
    },
    {
      label: 'Verification — 끝나기 직전·끝난 직후',
      caption: '"빌드 통과 / 테스트 통과"는 디자인 검증이 아니다',
      skills: [
        {
          id: 'visual-design-audit',
          headline: '심미성 + 유저편의성 16-lens audit',
          summary:
            'Reference가 없어도 디자인 자체가 올바른지 audit. Refactoring UI / NN/g 10 Heuristics / WCAG / Apple HIG / 8pt grid / modular scale 등 정전을 16개 lens로 압축. 측정 우선, eyeball 금지. 마지막에 self-critique 강제.',
          triggers: [
            '작업 끝 / "report complete" 직전',
            '"디자인 어때 / 괜찮아 보여 / 검토해줘"',
            '토큰·테마 변경 후 시각 점검',
          ],
          pillars: ['심미성 8 lens', '유저 편의성 8 lens', 'Self-critique loop 강제'],
          docHref: `${SKILL_REPO_BASE}/visual-design-audit/SKILL.md`,
        },
        {
          id: 'visual-regression-guard',
          headline: 'before/after diff로 회귀 방지',
          summary:
            '토큰·테마·공통 컴포넌트 변경은 보지 않는 화면에서 깨진다. 변경 전에 baseline 캡처 → 후에 재캡처 → diff. 회귀 발견 시 4-step recovery (locate → hypothesize → bisect → route).',
          triggers: [
            'design token / theme / shared CSS 변경',
            '공통 컴포넌트 / breakpoint / 외부 폰트 CDN 변경',
            '"다른 페이지에 영향 없는지 확인해"',
          ],
          pillars: [
            'Phase 1: baseline 캡처',
            'Phase 2: diff + classify',
            'Recovery 4-step + route',
          ],
          docHref: `${SKILL_REPO_BASE}/visual-regression-guard/SKILL.md`,
        },
        {
          id: 'visual-reference-compare',
          headline: 'reference image와 측정 비교',
          summary:
            '외부 reference(목업·Figma URL)가 주어진 작업에선 렌더된 viewport와 reference를 비율·여백·정렬 단위로 측정해서 차이를 punch list로 보고한다.',
          triggers: [
            '외부 reference image / mockup 제공됨',
            '"reference와 비교 / 비율 / 패딩이 달라"',
            'PR open 직전 시각 마감',
          ],
          pillars: ['Capture viewport', 'Measure, not eyeball', 'Punch list로 차이 보고'],
          docHref: `${SKILL_REPO_BASE}/visual-reference-compare/SKILL.md`,
        },
      ],
    },
  ];

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Section 04 · Skills in use
      </span>
      <h2 className={styles.sectionHeading}>이 연구에서 쓰는 6가지 스킬</h2>
      <p className={styles.sectionLede}>
        설계철학을 코드 옆에 박제하기 위해 Claude Code skill로 만들어 운영한다. 작업의 두 단계 —
        <strong> 가이드</strong>(시작·진행)와 <strong>검증</strong>(끝나기 직전·끝난 직후) — 마다
        다른 스킬이 다른 판단을 주입한다. 새 케이스가 잡힐 때마다 스킬에 박제 → 다음 작업에서 스킬이
        먼저 안내하는 사이클로 연구가 누적된다.
      </p>
      {groups.map((group, gIdx) => (
        <div key={group.label} className={styles.skillsGroup}>
          <header className={styles.skillsGroupHeader}>
            <span className={styles.skillsGroupTag}>Group {String(gIdx + 1).padStart(2, '0')}</span>
            <h3 className={styles.skillsGroupLabel}>{group.label}</h3>
            <p className={styles.skillsGroupCaption}>{group.caption}</p>
          </header>
          <div className={styles.skillCardsGrid}>
            {group.skills.map((skill, idx) => (
              <article key={skill.id} className={styles.skillCard}>
                <header className={styles.skillCardHeader}>
                  <span className={styles.skillCardIndex}>
                    {String(gIdx * 3 + idx + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.skillCardTitles}>
                    <span className={styles.skillCardSlug}>{skill.id}</span>
                    <h4 className={styles.skillCardHeadline}>{skill.headline}</h4>
                  </div>
                </header>
                <p className={styles.skillCardSummary}>{skill.summary}</p>
                <dl className={styles.skillCardMeta}>
                  <div>
                    <dt className={styles.skillCardLabel}>Triggers</dt>
                    <ul className={styles.skillCardList}>
                      {skill.triggers.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <dt className={styles.skillCardLabel}>Pillars</dt>
                    <ul className={styles.skillCardList}>
                      {skill.pillars.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </dl>
                <a
                  className={styles.skillCardLink}
                  href={skill.docHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>SKILL.md 확인하기</span>
                  <span aria-hidden>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Conclusion() {
  const flow = [
    'raw css',
    'semantic token',
    'component contract',
    'layout contract',
    'agent skill',
    'skill chain by phase',
    'self-evolving skill loop',
  ];

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Section 05 · Where we're going
      </span>
      <h2 className={styles.sectionHeading}>강한 엔지니어는 Agent가 사고할 언어를 설계한다</h2>
      <p className={styles.sectionLede}>
        개발의 초점은 "내가 구현한다" → "AI가 구현한다" → "AI가 안정적으로 구현할 수 있는 환경을
        설계한다"로 이동하고 있다. CSS 위임 문제도 결국 추상화 레벨을 끌어올리는 작업이다.
      </p>
      <div className={styles.conclusion}>
        <div className={styles.flowCard}>
          <h3 className={styles.flowTitle}>추상화 사다리</h3>
          <div className={styles.flowSteps}>
            {flow.map((step, idx) => (
              <div key={step}>
                <div
                  className={
                    idx === flow.length - 1
                      ? `${styles.flowStep} ${styles.flowStepActive}`
                      : styles.flowStep
                  }
                >
                  {step}
                </div>
                {idx < flow.length - 1 ? <div className={styles.flowArrow}>↓</div> : null}
              </div>
            ))}
          </div>
        </div>
        <aside className={styles.callout}>
          <span className={styles.calloutLabel}>Closing note</span>
          <p className={styles.calloutQuote}>
            구체 지시는 손을 움직이게 하고, 설계철학은 판단을 바꾼다.
          </p>
          <p className={styles.calloutFootnote}>
            모든 상황을 미리 나열할 수 없으니, Agent에게는 판단 기준을 공유한다.
          </p>
          <img
            className={styles.closingMark}
            src={`${import.meta.env.BASE_URL}images/landing-closing-mark.png`}
            alt="손 도장처럼 찍힌 AI 연구 노트의 마무리 마크"
            loading="lazy"
          />
        </aside>
      </div>
    </section>
  );
}
