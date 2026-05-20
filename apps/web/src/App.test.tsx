import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('greets Tanveer on the home screen', () => {
    render(<App />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Tanveer')).toBeInTheDocument();
  });

  it('shows the detail view price for the initial product', () => {
    render(<App />);
    expect(screen.getByText(/Considered to be the most aromatic/i)).toBeInTheDocument();
  });

  it('increments cart count when PAY NOW is pressed', () => {
    const originalAlert = window.alert;
    window.alert = () => {};
    try {
      render(<App />);
      const payButton = screen.getByRole('button', { name: /PAY NOW/i });
      fireEvent.click(payButton);
      // badge appears in bottom nav after first add
      expect(screen.getByText('1')).toBeInTheDocument();
    } finally {
      window.alert = originalAlert;
    }
  });
});
