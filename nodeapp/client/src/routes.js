import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout       from './pages/Layout'
import GenericError from './pages/Error'
import NotFound     from './pages/NotFound'
import Users        from './pages/Users'
import Profile      from './pages/Profile'
import Home         from './pages/Home'

// import { authorize } from 'react-isomorphic-render'

// // Gets `user` from Redux state
// const getUser = state => state.authentication.user

// // Restricts a `<Route/>` to a certain part of users
// const restricted = (route, authorization) => authorize(getUser, authorization, route)

export default
(
	<Route path="/" component={ Layout }>
		<IndexRoute component={ Home }/>
        <Route path="profile" component={ Profile }/>
		<Route path="users" component={ Users }/>
		<Route path="error" component={ GenericError }/>
		<Route path="*" component={ NotFound } status={ 404 }/>
	</Route>
)