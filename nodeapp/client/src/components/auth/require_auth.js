import React, { Component } from 'react';
// import { PropTypes } from 'prop-types'
import { connect } from 'react-redux';
import { preload } from 'react-isomorphic-render'

import { connector, get_me } from '../../redux/auth'

export default function(ComposedComponent) {
  @preload(({ dispatch, getState }) => { return dispatch(get_me()) })
  @connect(state => ({ ...connector(state.auth) }), { get_me })
  class Authentication extends Component {
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

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return Authentication
}