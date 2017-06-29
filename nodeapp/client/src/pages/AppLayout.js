import React, { Component } from 'react'
import { Title, Meta, preload } from 'react-isomorphic-render'
import { PropTypes } from 'prop-types'

import TopNav       from '../components/TopNav'
import Preloading from '../components/Preloading'

import { connect } from 'react-redux';
import { connector, get_me } from '../redux/auth'

@preload(({ dispatch, getState }) => {
    const { auth } = getState()

    // Don't bother preloading the user if it's already there because we just logged in
    if (!auth.user) {
        return dispatch(get_me())
    }
    return Promise.resolve()
})
@connect(state => ({ ...connector(state.auth) }), { get_me })
export default class AppLayout extends Component
{
    static propTypes = {
        children : PropTypes.node.isRequired
    }

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
        const { children } = this.props

        const meta =
        [
            // <meta charset="utf-8"/>
            { charset: 'utf-8' },

            // <meta name="..." content="..."/>
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },

            // <meta property="..." content="..."/>
            { property: 'og:title',       content: 'APAX Software Hour Tracker' },
            { property: 'og:description', content: 'Track stuff' },
            { property: 'og:locale',      content: 'en-US' }
        ]

        const markup = (
            <div className="content">
                <Meta>{ meta }</Meta>
                <Title>WebApp</Title>

                <Preloading/>

                <TopNav/>

                { children }

                <footer></footer>
            </div>
        )

        return markup
    }
}