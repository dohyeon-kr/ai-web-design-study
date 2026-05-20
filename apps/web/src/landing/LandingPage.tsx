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
      <TokenLadder />
      <SkillStructure />
      <Conclusion />
    </div>
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
      <aside className={styles.heroCard}>
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

function Conclusion() {
  const flow = [
    'raw css',
    'semantic token',
    'component contract',
    'layout contract',
    'agent skill',
  ];

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} />
        Section 04 · Where we're going
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
        </aside>
      </div>
    </section>
  );
}
