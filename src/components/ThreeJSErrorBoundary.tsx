import React, { Component, ReactNode } from 'react';
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ThreeJSErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ThreeJS Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 bg-gradient-panel border-border shadow-panel h-full">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <AlertTriangle className="h-16 w-16 text-space-orange mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              3D Visualization Error
            </h3>
            <p className="text-muted-foreground mb-4">
              Unable to load the 3D Earth visualization. This may be due to WebGL compatibility issues.
            </p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-space-cyan text-white rounded hover:bg-space-cyan/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}