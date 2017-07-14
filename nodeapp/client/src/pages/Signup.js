import React, { Component } from 'react'
import { connect } from 'react-redux'
import { flat as style } from 'react-styling'
// import { TextInput, Button } from 'react-responsive-ui'
import Form from 'simpler-redux-form'
import { FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap'
import { redirect, Title } from 'react-isomorphic-render'

import { connector, signup_user } from '../redux/auth'

@connect(state => ({ ...connector(state.auth) }), { signup_user, redirect })
export default class Signup_page extends Component {
    // state = {}

    constructor() {
        super()

        this.user_signed_up = this.user_signed_up.bind(this)
    }

    user_signed_up() {
        const { dispatch, redirect } = this.props
        dispatch(redirect('/app'));
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
                
                <SignupForm className="col-md-offset-4 col-md-4 text-center" onSubmitted={ this.user_signed_up }/>
            </section>
        )

        return markup
    }
}


@Form
@connect(state => ({ ...connector(state.auth) }), { signup_user })
class SignupForm extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }

    constructor() {
        super()

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async submit() {
        const { signup_user, onSubmitted } = this.props
        const values = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        await signup_user(values)
        onSubmitted()
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
      }

    render() {
        const { submit, signupUserPending, signupUserError } = this.props

        let errors = {}
        if (signupUserError) {
            const errors_array = JSON.parse(signupUserError.message)
            for (var error of errors_array) {
                errors[error.path] = <HelpBlock>{error.message}</HelpBlock>
            }
        }

        return (
            <form className={ this.props.className }  onSubmit={ submit(this.submit) }>
                <FormGroup controlId="firstNameControl" validationState={errors['first_name'] ? 'error' : null}>
                    <FormControl
                        name="first_name"
                        type="text"
                        placeholder="Enter first name"
                        onChange={ this.handleChange }
                        value={this.state.first_name}
                        style={ styles.signup_form_input } />
                    { errors['first_name'] }
                </FormGroup>
                <FormGroup controlId="lastNameControl" validationState={errors['last_name'] ? 'error' : null}>
                    <FormControl
                        name="last_name"
                        type="text"
                        placeholder="Enter last name"
                        onChange={ this.handleChange }
                        value={this.state.last_name}
                        style={ styles.signup_form_input } />
                    { errors['last_name'] }
                </FormGroup>
                <FormGroup controlId="emailNameControl" validationState={errors['email'] ? 'error' : null}>
                    <FormControl
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={ this.handleChange }
                        value={this.state.email}
                        style={ styles.signup_form_input } />
                    { errors['email'] }
                </FormGroup>
                <FormGroup controlId="pwdNameControl" validationState={errors['password'] ? 'error' : null}>
                    <FormControl
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        onChange={ this.handleChange }
                        value={this.state.password}
                        style={ styles.signup_form_input } />
                    { errors['password'] }
                </FormGroup>
                <FormGroup controlId="pwdCmfNameControl" validationState={errors['password_confirmation'] ? 'error' : null}>
                    <FormControl
                        name="password_confirmation"
                        type="password"
                        placeholder="Enter password again"
                        onChange={ this.handleChange }
                        value={this.state.password_confirmation}
                        style={ styles.signup_form_input } />
                    { errors['password_confirmation'] }
                </FormGroup>
                <Button type="submit" disabled={ signupUserPending } style={ styles.signup_form_submit }>
                    Signup
                </Button>
            </form>
        )
    }
}

const styles = style
`
    header
        text-align: center
        
    signup_form_input, signup_form_submit
        margin-top     : 10px

    signup_form_submit
        width          : 100px
`