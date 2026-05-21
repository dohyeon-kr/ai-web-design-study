# CLAUDE.md — ai-web-design-study

이 저장소는 AI 에이전트에게 웹 디자인 구현을 어디까지 위임할 수 있는지 실험하는 스터디 프로젝트다.
`main`은 통합 셸(랜딩 + 쇼케이스)을 호스팅하고, 각 예시는 `feature/<example>-ui` 브랜치에서 독립적으로 빌드되어 GitHub Pages의 부 경로에 모여 임베드된다.

연구 주제 / 디자인 철학은 [README.md](README.md) 참조. 이 파일은 **다음 작업자(또는 다음 세션의 나)**가 일관되게 움직이도록 박제한 운영 규약이다.

---

## 1. 저장소 구조

```
apps/web/                       # main 셸 (랜딩 + 쇼케이스) — Vite + React 18
  src/
    App.tsx                     # 라우터 셸 (hash 기반)
    shared/routing.ts           # parseHash / buildHash / useRoute
    shell/Header.tsx            # 상단 sticky nav
    landing/LandingPage.tsx     # 연구 소개 5섹션 + CodeBlock 헬퍼
    showcase/
      ShowcasePage.tsx          # 탭 + iframe frame
      examples.ts               # 슬롯 메타 (slug / label / status / branch / embedPath)
.github/workflows/pages.yml     # main 셸 + 매트릭스 빌드 → /showcases/<slug>/ → gh-pages 배포
README.md                       # 연구 노트 (외부 공개용)
CLAUDE.md                       # 이 파일
```

각 예시 브랜치(`feature/<example>-ui`)는 자체 `apps/web` 트리를 갖고 main과 독립적으로 빌드된다.
즉 main의 `apps/web`은 **셸 전용**이며, 예시 콘텐츠를 main에 합치지 않는다.

---

## 2. 새 예시 추가 절차 (반드시 이 순서)

`Slot 03`을 채우는 경우라고 가정:

### Step 1 — 예시 브랜치 작업

1. `cdf0688` baseline에서 분기:
   ```
   git worktree add ~/work-trees/study/feature-slot-3 -b feature/slot-3-ui cdf0688
   ```
2. 그 워크트리에서 `apps/web/src/` 안에 자유롭게 디자인. 기존 `home/` 컴포넌트는 지우거나 갈아엎어도 무방.
3. 정적 자산은 `apps/web/public/` 에 둔다.
4. 검증: 워크트리 안에서 `pnpm install` → `pnpm --dir apps/web build` / `pnpm --dir apps/web test` / `pnpm lint`.

### Step 2 — 자산 경로 가드 (반드시 확인)

GitHub Pages에서 예시는 `/ai-web-design-study/showcases/<slug>/` 하위로 배포된다.
`<img src="/images/foo.jpg">` 같은 절대 경로는 base 적용이 안 돼 404가 난다.

**무조건 `import.meta.env.BASE_URL` prefix를 통하라.** 같은 패턴을 두 예시에서 이미 적용:

```ts
// fruit-shop: src/shop/data.ts, select-shop: src/home/asset.ts
const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

// 사용
imageSrc: asset('images/product.jpg')
<img src={asset('images/hero.jpg')} />
```

`BASE_URL`은 항상 trailing slash로 끝남 — dev에서는 `/`, prod에서는 `/ai-web-design-study/showcases/<slug>/`.

### Step 3 — 브랜치 push

```
git push -u origin feature/slot-3-ui
```

push 게이트(Rachel 리뷰)가 작동한다. base는 `origin/HEAD` (= main)이라 diff가 크게 잡히지만 정상 — main과 다른 디자인이 의도된 분기다.

### Step 4 — 셸에서 슬롯 활성화 (main 브랜치)

main에서 두 파일만 수정:

1. **`apps/web/src/showcase/examples.ts`** — 해당 슬롯의 `status: 'soon'` → `'live'`, `embedPath: 'showcases/<slug>/'` 추가, tagline/description은 실제 컨셉으로 갱신.

2. **`.github/workflows/pages.yml`** — `entries` 배열에 `"<slug>:feature/<slug>-ui"` 한 줄 추가:
   ```yaml
   entries=(
     "fruit-shop:feature/fruit-shop-ui"
     "select-shop:feature/select-shop-ui"
     "slot-3:feature/slot-3-ui"   # ← 추가
   )
   ```

3. commit + push → 게이트 → main 워크플로우 자동 트리거.

### Step 5 — production 시각 검증

배포 완료 후 `https://dohyeon-kr.github.io/ai-web-design-study/#/showcase/<slug>` 에서 cmux 브라우저로 확인.
탭 활성화 + iframe 안에 예시가 실제로 렌더되고 이미지가 모두 로드되는지 본다 — "빌드 통과"는 검증이 아니다.

---

## 3. dev 환경에서 쇼케이스 보기

dev 서버(`pnpm dev`)는 SPA fallback이 모든 경로에 index.html을 반환하기 때문에, `/showcases/<slug>/`도 200을 돌려준다 — 그러면 iframe이 **자기 자신을 임베드**해버려 무한 중첩처럼 보인다.

`ShowcasePage.tsx`의 `ExampleFrame`은 이를 막기 위해 `import.meta.env.DEV`에서는 무조건 placeholder를 표시한다.

**dev에서 실제 예시 화면을 보고 싶으면 그 브랜치 워크트리에서 별도로 `pnpm dev`를 띄워서 본다.**

---

## 4. 빌드/배포 파이프라인

### 4.1 main push → 워크플로우

`.github/workflows/pages.yml`이 main push와 `workflow_dispatch`에서 트리거된다.

1. main 체크아웃 → `pnpm install` → `pnpm --dir apps/web exec vite build --base "/ai-web-design-study/"`
2. 결과를 `site/` 로 복사
3. `entries` 배열 순회:
   - `git ls-remote --exit-code --heads origin "$branch"` 가드 — 브랜치가 origin에 없으면 warning + skip (전체 빌드를 죽이지 않는다)
   - `git worktree add` 로 그 브랜치 체크아웃 → `pnpm install` + `vite build --base "/ai-web-design-study/showcases/<slug>/"`
   - 결과를 `site/showcases/<slug>/` 로 복사
4. `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4` 로 게시

### 4.2 알려진 함정

- **워크플로우는 lint를 돌리지 않는다.** 빌드만 통과하면 배포된다. 예시 브랜치의 lint warning은 production을 막지 않는다.
- **`pnpm/action-setup@v4`는 `version` 키 + `package.json`의 `packageManager` 동시 지정 시 reject한다.** 한쪽만 둘 것 — 현재는 `packageManager: pnpm@10.33.0` 만 사용.
- **dispatch 트리거**: main에 변경 없이 워크플로우만 다시 돌리려면 `gh workflow run pages.yml --ref main`.
- **GitHub Pages 활성화는 한 번만**: 처음 저장소에 `gh api repos/<owner>/<repo>/pages -X POST -f build_type=workflow`. UI에서 Settings → Pages → Source: GitHub Actions 와 동일.

---

## 5. 워크트리 운영

여러 예시 브랜치를 동시에 만지므로 워크트리가 표준이다. `~/.claude/rules/git-worktree.md` 룰을 그대로 따르되, 이 저장소 한정 관습:

- main 작업은 `/Users/judohyeon/projects/study/` 그대로
- 예시 브랜치 작업은 `~/work-trees/study/feature-<slug>-ui/` 워크트리
- 워크트리에서 build/test/lint를 워크트리 내부 cwd 기준으로 실행

---

## 6. 검증 컨벤션

각 단계의 통과 조건:

| 단계 | 통과 조건 |
|---|---|
| 코드 변경 | `pnpm lint` (main) / 워크트리 lint — 0 errors. a11y warning은 별도 task로 분리 허용 |
| 셸 동작 | `pnpm --dir apps/web test` — vitest 통과 |
| 빌드 | `pnpm --dir apps/web build` — vite 산출물 생성 |
| dev 시각 확인 | cmux 브라우저로 `http://localhost:<port>/` 에서 랜딩/쇼케이스 클릭 워크플로우 |
| production 시각 확인 | 워크플로우 완료 후 `https://dohyeon-kr.github.io/ai-web-design-study/#/showcase/<slug>` |

production 검증은 "워크플로우 success" 가 끝이 아니다. **iframe 안 이미지가 실제로 로드되는지** 까지가 한 묶음.

---

## 7. 코딩 컨벤션 (이 저장소 한정)

- **스타일**: CSS Modules + `tokens.css` (semantic 토큰만 노출; raw px 금지). 컴포넌트는 클래스명 단위로 묶기.
- **라우팅**: hash 기반 SPA. 외부 라우터 라이브러리 도입 금지 — 셸을 가볍게 유지.
- **테스트**: vitest + @testing-library/react + jsdom. 비동기 fetch는 `src/test/setup.ts`의 globalThis.fetch mock으로 처리됨 — production HEAD 요청을 jsdom에서 직접 날리지 않는다.
- **Biome**: `biome check` 가 fail하면 `biome check --fix --unsafe` 로 한 번 돌린 뒤 변경 검토. 의도된 ARIA 패턴은 `// biome-ignore lint/a11y/...` 로 사유 명시.
- **자산**: `apps/web/public/` + 코드에서 항상 `asset()` helper로 prefix.

---

## 8. 변경 로그 / 결정 박제

| 일자 | 결정 / 변경 | 이유 |
|---|---|---|
| 2026-05-20 | main을 통합 셸로 재구성, baseline `home/` 제거 | 셸과 예시를 명확히 분리해야 매트릭스 빌드가 깔끔 |
| 2026-05-20 | vite `--base` CLI 옵션으로 brunch별 base 주입 | 각 브랜치의 vite.config을 수정하는 부담 제거 |
| 2026-05-20 | 워크플로우에 ls-remote 가드 추가 | 누락된 브랜치가 entries에 들어가도 전체 빌드를 죽이지 않게 |
| 2026-05-21 | public 자산을 `asset()` helper로 감싸기 | `--base` 적용 시 절대 경로 자산이 404 나는 문제 해결 |

새 결정을 박제할 땐 위 표에 한 줄 추가. 이미 코드에서 자명한 사실(파일 위치, 함수 이름)은 적지 않는다 — 적는 건 "왜 다른 선택지를 버렸는가".
