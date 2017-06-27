import { action, createHandler, stateConnector } from 'react-isomorphic-render'
import settings from '../react-isomorphic-render-async'
import Cookies from 'universal-cookie';

const handler = createHandler(settings);


export const signup_user = action
({
    namespace: 'AUTH',
    event: 'SIGNUP_USER',
    action: async (values, http) =>
    {
        // await delay(1000)
        return http.post(`/api/signup`, values)
    },
    result: (state, result) => {
        const cookies = new Cookies();
        cookies.set('token', result.token, { path: '/' });
        return ({
            ...state,
            user: result.user
        })
    }
},
handler)

export const login_user = action
({
    namespace: 'AUTH',
    event: 'LOGIN_USER',
    action: async (creds, http) =>
    {
        await delay(1000)
        return http.post(`/api/login`, creds)
    },
    result: (state, result) => {
        const cookies = new Cookies();
        cookies.set('token', result.token, { path: '/' });
        return ({
            ...state,
            user: result.user
        })
    }
},
handler)

export const logout_user = action({
    namespace: 'AUTH',
    event: 'LOGOUT_USER',
    action: async (http) =>
    {
        await delay(500)
    },
    result: (state, result) => {
        const cookies = new Cookies()
        cookies.remove('token')
        return ({
            ...state,
            user: null
        })
    }
}, handler)


export const get_me = action
({
    namespace: 'AUTH',
    event: 'GET_ME',
    action: async (http) => {
        // If we're not logged in, don't throw a 401, just no-op
        if (http.cookies_raw && http.cookies_raw.indexOf('token=') >= 0)
            return http.get('/api/me')
        else
            await delay(0)
    },
    result: (state, result) => ({
        ...state,
        user: result
    })
},
handler)

handler.addStateProperties('user')

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)


const initial_state = { user: null }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
function delay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
}