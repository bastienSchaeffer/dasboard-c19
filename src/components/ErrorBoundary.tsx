import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
type ErrorBoundaryProps = {};
type ErrorBoundaryState = {hasError: boolean};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid item xs={12}>
          <h1>Something went wrong.</h1>
        </Grid>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
