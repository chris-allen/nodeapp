import React, { Component } from 'react'
import { redirect } from 'react-isomorphic-render'
import Gravatar from 'react-gravatar'

import { connect } from 'react-redux';
import { connector, logout_user } from '../redux/auth'

import { Dropdown, MenuItem } from 'react-bootstrap'

@connect(state => ({ ...connector(state.auth) }), { logout_user, redirect })
export default class TopNav extends Component {

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

        const avatarDropdown = user ? (
            <Dropdown id="avatar-dropdown" pullRight>
                <Dropdown.Toggle>
                    <Gravatar email={ user.email } size={40} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={ this.log_user_out }>Logout</MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        ) : null;
        const markup = (
            <nav className="top-nav clearfix" role="navigation">
                <div className="right-nav">
                    <div className="btn-group">
                        { avatarDropdown }
                    </div>
                </div>
            </nav>
        )
        return markup
    }
}