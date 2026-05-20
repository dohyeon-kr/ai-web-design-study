import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('RACK 브랜드 로고를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByText('RACK')).toBeInTheDocument();
  });

  it('Hero의 Weekly Edit 카피와 타이틀을 렌더링한다', () => {
    render(<App />);
    expect(screen.getByText('WEEKLY EDIT')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Quiet Tailoring/i })).toBeInTheDocument();
  });

  it("EDITOR'S PICK 섹션과 상품 카드를 렌더링한다", () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /EDITOR'S PICK/i })).toBeInTheDocument();
    const editor = screen.getByLabelText('에디터 픽');
    expect(within(editor).getByText(/Cashmere Crewneck Knit/i)).toBeInTheDocument();
    expect(within(editor).getByText(/Pleated Wool Slacks/i)).toBeInTheDocument();
  });

  it('카테고리 칩에서 ALL이 활성 상태로 렌더링된다', () => {
    render(<App />);
    const activeChip = screen.getByRole('button', { name: 'ALL', pressed: true });
    expect(activeChip).toBeInTheDocument();
  });

  it('Brand of the week 섹션과 KIN을 렌더링한다', () => {
    render(<App />);
    const brand = screen.getByLabelText('Brand of the week');
    expect(within(brand).getByRole('heading', { name: 'KIN' })).toBeInTheDocument();
  });

  it('Shop 탭이 현재 페이지로 표시된다', () => {
    render(<App />);
    const current = screen.getByRole('button', { current: 'page' });
    expect(current).toHaveTextContent(/Shop/i);
  });
});
