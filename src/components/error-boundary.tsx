import { Component, type ReactNode, type ErrorInfo } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='p-6 text-center text-slate-700 flex flex-col items-center justify-center min-h-[40vh] gap-3'>
          <span className='text-2xl'>⚠️</span>
          <p className='text-sm font-semibold'>Something went wrong loading this view.</p>
          <button
            type='button'
            onClick={() => this.setState({ hasError: false })}
            className='px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all'
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
