import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppLayout    from './pages/AppLayout'
import Layout       from './pages/Layout'
import GenericError from './pages/Error'
import NotFound     from './pages/NotFound'
import Users        from './pages/Users'
import Home         from './pages/Home'
import Login        from './pages/Login'
import Signup        from './pages/Signup'

export default (
  <Route path="/" component={ Layout }>
    <IndexRoute component={ Home }/>

    <Route path="login" component={ Login }/>
    <Route path="signup" component={ Signup }/>

    <Route path="app" component={ AppLayout }>
        <Route path="users" component={ Users }/>
    </Route>

    <Route path="error" component={ GenericError }/>
    <Route path="*" component={ NotFound } status={ 404 }/>
  </Route>
)
