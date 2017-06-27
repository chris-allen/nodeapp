import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flat as style } from 'react-styling'
import { TextInput, Button } from 'react-responsive-ui'
import Form, { Field, Submit } from 'simpler-redux-form'
import { redirect, Title } from 'react-isomorphic-render'

import { connector, signup_user } from '../redux/auth'

@connect(state => ({ ...connector(state.auth) }), { signup_user, redirect })
export default class Signup_page extends Component
{
    // state = {}

    constructor() {
        super()

        this.user_signed_up = this.user_signed_up.bind(this)
    }

    user_signed_up() {
        const { redirect } = this.props
        redirect('/users');
    }

    render() {
        const { token, loginUserError } = this.props

        const markup = 
        (
            <section className="content">
                <Title>Signup</Title>

                <h1 style={ styles.header }>
                    Signup
                </h1>
                
                <SignupForm onSubmitted={ this.user_signed_up }/>
            </section>
        )

        return markup
    }
}


@Form
@connect(state => ({ ...connector(state.auth) }), { signup_user })
class SignupForm extends Component {
    constructor() {
        super()

        this.submit = this.submit.bind(this)
    }

    async submit(values) {
        const { signup_user, onSubmitted } = this.props

        await signup_user(values)
        onSubmitted()
    }

    validate_email(value) {
        if (!value) {
            return "Enter a valid email address"
        }
    }

    render() {
        const { submit, submitting, signupUserError } = this.props

        let errors = {}
        if (signupUserError) {
            const errors_array = JSON.parse(signupUserError.message)
            for (var error of errors_array) {
                errors[error.path] = error.message
            }
        }

        return (
            <form onSubmit={ submit(this.submit) } style={ styles.login_form }>
                <Field
                    name="first_name"
                    label="First Name"
                    component={ TextInput }
                    error={ errors['first_name'] }
                    style={ styles.signup_form_input }/>

                <Field
                    name="last_name"
                    label="Last Name"
                    component={ TextInput }
                    error={ errors['last_name'] }
                    style={ styles.signup_form_input }/>
                <Field
                    name="email"
                    label="Email"
                    validate={ this.validate_email }
                    component={ TextInput }
                    error={ errors['email'] }
                    style={ styles.signup_form_input }/>
                <Field
                    name="password"
                    type="password"
                    label="Password"
                    error={ errors['password'] }
                    component={ TextInput }
                    style={ styles.signup_form_input }/>
                <Field
                    name="password_confirmation"
                    type="password"
                    label="Password Confirmation"
                    error={ errors['password_confirmation'] }
                    component={ TextInput }
                    style={ styles.signup_form_input }/>
                <Submit
                    submit
                    component={ Button }
                    className="rrui__button--border"
                    style={ styles.login_form_submit }>
                    Signup
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

    signup_form_input, login_form_submit
        display        : inline-block
        margin-top     : 10px
        vertical-align : top
        font-size      : 0.8em
        
    signup_form_input
        margin-right   : 0.6em

    login_form_submit
        margin-top     : 0.3em
`