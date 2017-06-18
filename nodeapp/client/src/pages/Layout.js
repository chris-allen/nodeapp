import React, { Component } from 'react'
import { Title, Meta } from 'react-isomorphic-render'
import { PropTypes } from 'prop-types'

import Menu       from '../components/Menu'
import Preloading from '../components/Preloading'

import { connect } from 'react-redux';
import { preload } from 'react-isomorphic-render'
import { connector, get_me } from '../redux/auth'

@preload(({ dispatch, getState }) => { return dispatch(get_me()) })
@connect(state => ({ ...connector(state.auth) }), { get_me })
export default class Layout extends Component
{
	static propTypes =
	{
		children : PropTypes.node.isRequired
	}

	render()
	{
		const { children } = this.props

		// Html document metadata

		const description = 'A generic web application boilerplate'

		const meta =
		[
			// <meta charset="utf-8"/>
			{ charset: 'utf-8' },

			// <meta name="..." content="..."/>
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },

			// <meta property="..." content="..."/>
			{ property: 'og:title',       content: 'International Bodybuilders Club' },
			{ property: 'og:description', content: 'Do some push ups' },
			{ property: 'og:locale',      content: 'ru-RU' }
		]

		const menu_items =
		[{
			name: 'Home',
			link: '/'
		}, {
			name: 'Users',
			link: '/users'
		}]

		const header = this.props.profile ? (
			<header>
				<Menu items={ menu_items }/>
			</header>
		) : null;

		const markup = 
		(
			<div className="content">
				<Meta>{ meta }</Meta>
				<Title>WebApp</Title>

				<Preloading/>

				{ header }

				{ children }

				<footer></footer>
			</div>
		)

		return markup
	}
}