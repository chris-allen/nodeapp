import React, { Component } from 'react'
import { redirect, Title } from 'react-isomorphic-render'

import { flat as style } from 'react-styling'
import Form from 'simpler-redux-form'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

import { connect } from 'react-redux'
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
        const { dispatch, redirect } = this.props
        dispatch(redirect('/app'));
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
                
                <LoginForm className="col-md-offset-4 col-md-4 text-center" onSubmitted={ this.user_logged_in }/>
            </section>
        )

        return markup
    }
}

@Form
@connect(state => ({ ...connector(state.auth) }), { login_user })
class LoginForm extends Component {
    state = {
        email: "",
        password: ""
    }

    constructor() {
        super()

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async submit() {
        const { login_user, onSubmitted } = this.props
        const values = {
            email: this.state.email,
            password: this.state.password
        }

        await login_user(values)
        onSubmitted()
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
      }

    render() {
        const { submit, loginUserPending } = this.props

        return (
            <form className={ this.props.className }  onSubmit={ submit(this.submit) }>
                <FormControl
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={ this.handleChange }
                    value={this.state.email}
                    style={ styles.login_form_input } />
                <FormControl
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={ this.handleChange }
                    value={this.state.password}
                    style={ styles.login_form_input } />
                <Button type="submit" disabled={ loginUserPending } style={ styles.login_form_submit }>
                    Login
                </Button>
            </form>
        )
    }
}

const styles = style
`
    header
        text-align: center
        
    login_form_input, login_form_submit
        margin-top     : 10px

    login_form_submit
        width          : 100px
`