import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('홈 화면의 인사말을 렌더링한다', () => {
    render(<App />);
    expect(screen.getByText(/Hello, Sandra/i)).toBeInTheDocument();
  });

  it('Your plan 섹션과 두 개의 PlanCard를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Your plan/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Yoga Group/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Balance/i })).toBeInTheDocument();
  });

  it('주간 스트립의 Wed 25를 선택 상태로 렌더링한다', () => {
    render(<App />);
    const selectedTab = screen.getByRole('tab', { selected: true });
    expect(selectedTab).toHaveTextContent('Wed');
    expect(selectedTab).toHaveTextContent('25');
  });
});
