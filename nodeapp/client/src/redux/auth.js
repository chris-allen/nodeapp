import { action, createHandler, stateConnector } from 'react-isomorphic-render'
import settings from '../react-isomorphic-render-async'
import Cookies from 'universal-cookie';

const handler = createHandler(settings);

export const login_user = action
({
    namespace: 'AUTH',
    event: 'LOGIN_USER',
    action: async (creds, http) =>
    {
        // await delay(1000)
        return http.post(`/api/login`, creds)
    },
    result: (state, result) => {
        const cookies = new Cookies();
        cookies.set('token', result.token, { path: '/' });
        return ({
            ...state,
            token: result.token,
            user: result.user
        })
    }
},
handler)

handler.addStateProperties('token', 'user')

export const logout_user = action({
    namespace: 'AUTH',
    event: 'LOGOUT_USER',
    action: async (http) =>
    {
        await delay(500)
    },
    result: (state, result) => {
        const cookies = new Cookies()
        cookies.set('token', null)
        return ({
            ...state,
            token: null,
            user: null
        })
    }
}, handler)


export const get_me = action
({
    namespace: 'AUTH',
    event: 'GET_ME',
    action: async (http) => {
        return http.get('/api/me')
    },
    result: (state, result) => {
        console.log("MEMEME")
        console.log(result)
        return ({
            ...state,
            user: result
        })
    }
},
handler)

handler.addStateProperties('user')

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)


const initial_state = { token: null, user: null }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
// function delay(delay)
// {
//     return new Promise(resolve => setTimeout(resolve, delay))
// }