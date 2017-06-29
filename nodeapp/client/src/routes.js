import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Root
import Layout       from './pages/Layout'

// Onboarding
import Home         from './pages/Home'
import Login        from './pages/Login'
import Logout        from './pages/Logout'
import Signup       from './pages/Signup'

// App (enforces logged-in)
import AppLayout    from './pages/AppLayout'
import Dashboard    from './pages/Dashboard'
import Users        from './pages/Users'

// Static
import GenericError from './pages/Error'
import NotFound     from './pages/NotFound'

export default (
  <Route path="/" component={ Layout }>
    <IndexRoute component={ Home }/>

    <Route path="login" component={ Login }/>
    <Route path="signup" component={ Signup }/>
    <Route path="logout" component={ Logout }/>

    <Route path="app" component={ AppLayout }>
        <IndexRoute component={ Dashboard }/>
        <Route path="users" component={ Users }/>
    </Route>

    <Route path="error" component={ GenericError }/>
    <Route path="*" component={ NotFound } status={ 404 }/>
  </Route>
)
