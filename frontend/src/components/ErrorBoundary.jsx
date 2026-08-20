import React from 'react';

// Top-level safety net — catches render-time exceptions anywhere in the tree
// so a single bug shows a recoverable message instead of a blank white screen.
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.error('Unhandled error caught by ErrorBoundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F] text-center px-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
                        <p className="text-sky-100/60 mb-6">
                            Please refresh the page. If the problem persists, try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn primary-btn"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
