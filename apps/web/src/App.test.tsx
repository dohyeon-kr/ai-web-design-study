import { render, screen, within } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App shell', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  afterEach(() => {
    window.location.hash = '';
  });

  it('초기 진입 시 랜딩 페이지의 hero 제목을 렌더링한다', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /어디까지/ })).toBeInTheDocument();
  });

  it('헤더에 두 개의 섹션 nav 버튼이 보인다', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /주요 섹션/ });
    expect(within(nav).getByRole('button', { name: '연구 소개' })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: '쇼케이스' })).toBeInTheDocument();
  });

  it('쇼케이스 탭으로 이동하면 예시 탭 목록이 보인다', () => {
    render(<App />);
    act(() => {
      window.location.hash = '#/showcase';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    const tabsNav = screen.getByRole('navigation', { name: /예시 선택/ });
    expect(within(tabsNav).getByRole('button', { name: /Fruit Shop/ })).toBeInTheDocument();
    expect(within(tabsNav).getByRole('button', { name: /Select Shop/ })).toBeInTheDocument();
    expect(within(tabsNav).getByRole('button', { name: /Slot 03/ })).toBeInTheDocument();
  });

  it('쇼케이스 진입 시 첫 번째 예시가 활성 슬롯으로 표시된다', () => {
    render(<App />);
    act(() => {
      window.location.hash = '#/showcase';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(screen.getByRole('heading', { level: 2, name: 'Fruit Shop' })).toBeInTheDocument();
  });
});
