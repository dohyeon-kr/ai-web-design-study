import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('홈 화면의 브랜드명과 포인트 카운터를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByText(/포인트팡/)).toBeInTheDocument();
    const hero = screen.getByLabelText('오늘의 포인트');
    expect(hero).toHaveTextContent('2,480');
  });

  it('네 가지 미션 카드를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /클릭형 미션 시작/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /포스팅형 미션 시작/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /보너스 미션 시작/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /자동형 미션 시작/ })).toBeInTheDocument();
  });

  it('랭킹 미리보기에 본인 행을 강조해서 표시한다', () => {
    render(<App />);
    expect(screen.getByText(/나 \(도현\)/)).toBeInTheDocument();
  });

  it('현재 페이지를 홈으로 표시한다', () => {
    render(<App />);
    const homeNav = screen.getByRole('button', { current: 'page' });
    expect(homeNav).toHaveTextContent('홈');
  });
});
