import type { ComponentType, ErrorInfo, ReactElement } from 'react';
import { Component } from 'react';

class ErrorBoundary extends Component<
  {
    children: ReactElement;
    fallback: ReactElement;
  },
  {
    hasError: boolean;
  }
> {
  override state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  override render(): ReactElement {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function withErrorBoundary<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  ErrorComponent: ReactElement,
) {
  return function WithErrorBoundary(props: T): JSX.Element {
    return (
      <ErrorBoundary fallback={ErrorComponent}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
