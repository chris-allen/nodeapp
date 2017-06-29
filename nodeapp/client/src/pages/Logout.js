import React, { Component } from 'react'
import { flat as style } from 'react-styling'
import { Link, Title, redirect } from 'react-isomorphic-render'

import { connect } from 'react-redux'
import { connector, logout_user } from '../redux/auth'

// This class exists solely to be able to execute the logout action in the client
@connect(state => ({ ...connector(state.auth) }), { logout_user, redirect })
export default class Logout extends Component
{
    async componentDidMount() {
        console.log('componentDidMount')
        const { logout_user, redirect } = this.props
        await logout_user()
        redirect('/')
    }

    render() {

        const markup = (
            <section className="content">One sec...</section>
        )

        return markup
    }
}