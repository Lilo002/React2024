import { beforeAll, afterAll, describe, expect, vi, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../src/errorBoundary/ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  it('Render error boundary', () => {
    render(
      <ErrorBoundary
        fallback={
          <div className="error">
            <h1>Oops, we crashed...</h1>
          </div>
        }
      >
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Oops, we crashed...')).toBeInTheDocument();
  });
});
