import React, { Component } from 'react'
import { flat as style } from 'react-styling'
import { TextInput, Button } from 'react-responsive-ui'
import Form, { Field, Submit } from 'simpler-redux-form'
import { Title } from 'react-isomorphic-render'

import husky from '../../assets/images/husky.jpg'

export default class Page extends Component
{
    login() {
        console.log("ALL DONE");
        setTimeout(function() {
            dispatch({ type: 'AUTH_USER' });
        }, 2000);
    }
    render()
    {
        const markup = 
        (
            <section className="content">
                <Title>Login</Title>

                <h1 style={ styles.header }>
                    Login
                </h1>

                
                <LoginForm onSubmitted={ this.login }/>
            </section>
        )

        return markup
    }
}


@Form
class LoginForm extends Component
{
    constructor()
    {
        super()

        this.submit = this.submit.bind(this)
    }

    async submit(values)
    {
        const { add_user, onSubmitted } = this.props

        await add_user(values)
        onSubmitted()
    }

    validate_email(value)
    {
        if (!value)
        {
            return "Enter a valie email address"
        }
    }

    render()
    {
        const { submit, submitting } = this.props

        return (
            <form onSubmit={ submit(this.submit) }>
                <Field
                    name="email"
                    label="Email"
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

    login_form_input, login_form_submit
        display        : inline-block
        vertical-align : top
        font-size      : 85%
        
    login_form_input
        margin-right   : 0.6em

    login_form_submit
        margin-top     : 0.3em
`