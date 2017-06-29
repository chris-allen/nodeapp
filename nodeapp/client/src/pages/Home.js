import React, { Component } from 'react'
import { flat as style } from 'react-styling'
import { Link, Title, preload, redirect } from 'react-isomorphic-render'

import TopNav from '../components/TopNav'
import husky from '../../assets/images/husky.jpg'

import { connect } from 'react-redux'
import { connector, get_me, logout_user } from '../redux/auth'

@preload(({ dispatch, getState }) => { return dispatch(get_me()) })
@connect(state => ({ ...connector(state.auth) }), { logout_user, redirect })
export default class Home extends Component
{
    constructor() {
        super()

        this.log_user_out = this.log_user_out.bind(this)
    }

    async log_user_out() {
        const { logout_user, redirect } = this.props
        await logout_user()
        redirect('/')
    }

    render() {
        const { user } = this.props

        const userLinks = (!user ?
            (<div><Link to='/login'>Login</Link> | <Link to='/signup'>Signup</Link></div>)
            : (<Link to='#' onClick={ this.log_user_out }>Logout</Link>)
        )

        const markup = (
            <section className="content">
                <Title>Home</Title>

                <div style={ styles.links }>
                    { userLinks }
                </div>

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

    links
        float: right
        margin-right: 20px

    image
        display: block

        margin-left  : auto
        margin-right : auto

        border-width : 1px
        border-style : solid
        border-color : #7f7f7f

        border-radius : 0.5em
`