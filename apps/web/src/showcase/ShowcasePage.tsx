import { useEffect, useState } from 'react';
import type { Route } from '../shared/routing';
import styles from './ShowcasePage.module.css';
import { EXAMPLES, type ExampleSlot, findExampleBySlug } from './examples';

type Props = {
  selectedSlug: string | null;
  onNavigate: (route: Route) => void;
};

export default function ShowcasePage({ selectedSlug, onNavigate }: Props) {
  const active = findExampleBySlug(selectedSlug);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Showcase
        </span>
        <h1 className={styles.title}>예시 프로젝트 둘러보기</h1>
        <p className={styles.sub}>
          브랜치별로 만들어진 예시들을 한 페이지에서 탭으로 살펴봅니다. 각 예시는 격리된 iframe
          안에서 자체 viewport로 렌더링됩니다.
        </p>
      </header>

      <nav className={styles.tabs} aria-label="예시 선택">
        {EXAMPLES.map((ex) => (
          <button
            type="button"
            key={ex.slug}
            className={ex.slug === active.slug ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => onNavigate({ name: 'showcase', exampleSlug: ex.slug })}
          >
            {ex.label}
            <span
              className={
                ex.status === 'live' ? `${styles.tabBadge} ${styles.tabBadgeLive}` : styles.tabBadge
              }
            >
              {ex.status === 'live' ? 'live' : 'soon'}
            </span>
          </button>
        ))}
      </nav>

      <section className={styles.slotMeta}>
        <div className={styles.slotMetaCopy}>
          <h2 className={styles.slotMetaTitle}>{active.label}</h2>
          <p className={styles.slotMetaTagline}>{active.tagline}</p>
        </div>
        <span className={styles.slotMetaBranch}>{active.branch}</span>
      </section>

      <ExampleFrame example={active} />
    </div>
  );
}

function ExampleFrame({ example }: { example: ExampleSlot }) {
  if (example.status !== 'live' || !example.embedPath) {
    return <PlaceholderStage example={example} />;
  }

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const src = `${base}${example.embedPath}`;

  if (import.meta.env.DEV) {
    return (
      <div className={styles.frame}>
        <div className={styles.frameToolbar}>
          <div className={styles.frameDots} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.frameAddress}>{src}</div>
        </div>
        <div className={styles.frameStage}>
          <PlaceholderStage example={example} mode="dev" src={src} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      <div className={styles.frameToolbar}>
        <div className={styles.frameDots} aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.frameAddress}>{src}</div>
      </div>
      <div className={styles.frameStage}>
        <LiveOrFallbackFrame src={src} example={example} />
      </div>
    </div>
  );
}

function LiveOrFallbackFrame({ src, example }: { src: string; example: ExampleSlot }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    setStatus('loading');
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        setStatus(res.ok ? 'ready' : 'missing');
      })
      .catch(() => {
        if (!cancelled) setStatus('missing');
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status === 'missing') {
    return <PlaceholderStage example={example} mode="dev" src={src} />;
  }

  return (
    <iframe
      key={src}
      className={styles.iframe}
      src={src}
      title={`${example.label} 미리보기`}
      loading="lazy"
    />
  );
}

function PlaceholderStage({
  example,
  mode = 'soon',
  src,
}: {
  example: ExampleSlot;
  mode?: 'soon' | 'dev';
  src?: string;
}) {
  if (mode === 'dev') {
    return (
      <div className={styles.placeholder}>
        <span className={styles.placeholderBadge}>dev preview unavailable</span>
        <h3 className={styles.placeholderTitle}>이 예시는 빌드 후에 보입니다</h3>
        <p className={styles.placeholderText}>
          GitHub Pages 배포 워크플로우가 <code>{example.branch}</code>를 빌드해서{' '}
          <code>{example.embedPath}</code>에 정적으로 배치합니다. 로컬에서는 빈 경로라 fallback이
          뜨고 있어요.
        </p>
        {src ? <code className={styles.placeholderCode}>{src}</code> : null}
      </div>
    );
  }

  return (
    <div className={styles.placeholder}>
      <span className={styles.placeholderBadge}>coming soon</span>
      <h3 className={styles.placeholderTitle}>{example.label}</h3>
      <p className={styles.placeholderText}>{example.description}</p>
      <code className={styles.placeholderCode}>{example.branch}</code>
    </div>
  );
}
