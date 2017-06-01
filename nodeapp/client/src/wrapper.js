import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { PropTypes } from 'prop-types'

export default class Wrapper extends Component
{
  static propTypes =
  {
    store: PropTypes.object.isRequired
  }

  render()
  {
    const { store, children } = this.props

    return (
      <AppContainer>
        <Provider store={ store }>
          { children }
        </Provider>
      </AppContainer>
    )
  }
}