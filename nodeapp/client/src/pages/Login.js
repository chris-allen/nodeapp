import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flat as style } from 'react-styling'
import { TextInput, Button } from 'react-responsive-ui'
import Form, { Field, Submit } from 'simpler-redux-form'
import { redirect, Title } from 'react-isomorphic-render'

import { connector, login_user } from '../redux/auth'

@connect(state => ({ ...connector(state.auth) }), { login_user, redirect })
export default class Login_page extends Component
{
    // state = {}

    constructor() {
        super()

        this.user_logged_in = this.user_logged_in.bind(this)
    }

    user_logged_in() {
        const { redirect } = this.props
        redirect('/users');
    }

    render() {
        const { token, loginUserError } = this.props

        const markup = 
        (
            <section className="content">
                <Title>Login</Title>

                <h1 style={ styles.header }>
                    Login
                </h1>
                
                <LoginForm onSubmitted={ this.user_logged_in }/>
            </section>
        )

        return markup
    }
}


@Form
@connect(state => ({}), { login_user })
class LoginForm extends Component {
    constructor() {
        super()

        this.submit = this.submit.bind(this)
    }

    async submit(values) {
        const { login_user, onSubmitted } = this.props

        await login_user(values)
        onSubmitted()
    }

    validate_email(value) {
        if (!value) {
            return "Enter a valid email address"
        }
    }

    render() {
        const { submit, submitting } = this.props

        return (
            <form onSubmit={ submit(this.submit) } style={ styles.login_form }>
                <Field
                    name="email"
                    validate={ this.validate_email }
                    component={ TextInput }
                    style={ styles.login_form_input }/>
                <Field
                    name="password"
                    type="password"
                    validate={ this.validate_email }
                    component={ TextInput }
                    style={ styles.login_form_input }/>

                <Submit
                    submit
                    component={ Button }
                    className="rrui__button--border"
                    style={ styles.login_form_submit }>
                    Login
                </Submit>
            </form>
        )
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

    login_form
        width: 300px;
        margin: 0 auto;

    login_form_input, login_form_submit
        display        : inline-block
        vertical-align : top
        font-size      : 0.8em
        
    login_form_input
        margin-right   : 0.6em

    login_form_submit
        margin-top     : 0.3em
`