import React, { Component } from 'react'
import { flat as style } from 'react-styling'
import { Link, Title } from 'react-isomorphic-render'

import husky from '../../assets/images/husky.jpg'

import { connect } from 'react-redux'
import { connector } from '../redux/auth'

@connect(state => ({ ...connector(state.auth) }), { })
export default class Page extends Component
{
	render()
	{
		const { user } = this.props

		const userMarkup = (user ?
			`Welcome back ${user.first_name}!` : <Link to='/login'>Login</Link>
		)

		const markup = 
		(
			<section className="content">
				<Title>Home</Title>

				{ userMarkup }
				<h1 style={ styles.header }>
					Husky
				</h1>

				<img src={ husky } style={ styles.image }/>
			</section>
		)

		return markup
	}
}

const styles = style
`
	header
		text-align: center

	image
		display: block

		margin-left  : auto
		margin-right : auto

		border-width : 1px
		border-style : solid
		border-color : #7f7f7f

		border-radius : 0.5em
`