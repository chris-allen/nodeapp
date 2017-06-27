import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flat as style } from 'react-styling'
// import { TextInput, Button } from 'react-responsive-ui'
import Form from 'simpler-redux-form'
import { redirect, Title } from 'react-isomorphic-render'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

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
                
                <LoginForm className="col-md-offset-4 col-md-4" onSubmitted={ this.user_logged_in }/>
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
                    value={this.state.email} />
                <FormControl
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={ this.handleChange }
                    value={this.state.password} />
                <Button type="submit" disabled={ loginUserPending }>
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