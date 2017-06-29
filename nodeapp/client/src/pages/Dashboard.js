import React, { Component } from 'react'
import { flat as style } from 'react-styling'
import { Link, Title, redirect } from 'react-isomorphic-render'

export default class Dashboard extends Component {
    render() {
        const { user } = this.props

        const markup = (
            <section className="content">
                <Title>Dashboard</Title>

                <h1 style={ styles.header }>
                    Dashboard
                </h1>

            </section>
        )

        return markup
    }
}

const styles = style
`
    header
        text-align: center
`