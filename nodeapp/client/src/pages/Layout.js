import React, { Component } from 'react'
import { Title, Meta } from 'react-isomorphic-render'
import { PropTypes } from 'prop-types'

import TopNav       from '../components/TopNav'
import Preloading from '../components/Preloading'

import { connect } from 'react-redux';
import { preload } from 'react-isomorphic-render'
import { connector, get_me } from '../redux/auth'

@connect(state => ({ ...connector(state.auth) }), { })
export default class LoggedInLayout extends Component
{
    static propTypes =
    {
        children : PropTypes.node.isRequired
    }

    render()
    {
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

        const markup = 
        (
            <div className="content">
                <Meta>{ meta }</Meta>
                <Title>WebApp</Title>

                <Preloading/>

                { children }

                <footer></footer>
            </div>
        )

        return markup
    }
}