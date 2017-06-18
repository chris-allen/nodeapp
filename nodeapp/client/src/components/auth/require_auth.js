import React, { Component } from 'react';

export default class RequireAuthComponent extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.router.push('/login');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.user) {
      this.props.router.push('/');
    }
  }
}