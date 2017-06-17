import React, { Component } from 'react'
import { Link } from 'react-router'
import { flat as style } from 'react-styling'
import { Title } from 'react-isomorphic-render'

import husky from '../../assets/images/husky.jpg'

export default class Page extends Component
{
	render()
	{
		const { user } = this.props
		console.log(user)

		const markup = 
		(
			<section className="content">
				<Title>Home</Title>

				<Link to='/login'>Login</Link>
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