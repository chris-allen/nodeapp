import React, { Component } from 'react'
import { Link, IndexLink, redirect } from 'react-isomorphic-render'
import Gravatar from 'react-gravatar'
import { flat as style } from 'react-styling'

import { connect } from 'react-redux';
import { connector, get_me, logout_user } from '../redux/auth'

import { Dropdown, MenuItem } from 'react-bootstrap'

@connect(state => ({ ...connector(state.auth) }), { logout_user, redirect })
export default class TopNav extends Component {

    constructor() {
        super()

        this.log_user_out = this.log_user_out.bind(this)
    }

    async log_user_out() {
        const { logout_user } = this.props
        await logout_user()
        redirect('/')
    }

    render() {
        const { user } = this.props
        const markup = (
            <nav className="top-nav clearfix" role="navigation">
                <div className="right-nav">
                    <div className="btn-group">
                        <Dropdown id="avatar-dropdown" pullRight>
                            <Dropdown.Toggle>
                                <Gravatar email={ user.email } size={40} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MenuItem>Account Settings</MenuItem>
                                <MenuItem onClick={ this.log_user_out }>Logout</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        )
        return markup
    }
}