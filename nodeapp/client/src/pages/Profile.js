import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Title, preload } from 'react-isomorphic-render'
import { flat as style } from 'react-styling'

import { connector, get_profile } from '../redux/profile'

@preload(({ dispatch, getState }) => dispatch(get_profile(1)))
@connect(
    state => 
    ({
        ...connector(state.profile)
    }),
    { get_profile }
)
export default class Profile_page extends Component {
    state = {}

    constructor() {
        super()
    }

    render() {
        const
        {
            profile,
            getProfilePending
        }
        = this.props

        return (
            <section>
                <Title>Profile</Title>

                <div>
                    <p>Profile</p>

                    <div style={ styles.profile }>
                        { this.render_profile() }
                    </div>
                </div>
            </section>
        )
    }

    render_profile() {
        const
        {
            profile,
            getProfilePending,
            getProfileError,
        }
        = this.props

        if (getProfilePending)
        {
            return 'Loading profile...'
        }

        if (getProfileError)
        {
            return 'Failed to load the profile'
        }
        
        return (
            <h2>{ user.first_name }</h2>
        )
    }
}

const styles = style
`
    profile
        margin-top : 2em
`