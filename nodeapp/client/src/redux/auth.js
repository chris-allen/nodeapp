import { action, createHandler, stateConnector } from 'react-isomorphic-render'
import settings from '../react-isomorphic-render-async'

const handler = createHandler(settings);

export const gogo_user = action
({
    namespace: 'AUTH',
    event: 'GOGO_USER',
    action: async (creds, http) =>
    {
        // await delay(1000)
        console.log(creds)
        return http.post(`/api/login`, creds)
    },
    result: (state, result) =>
    ({
        ...state,
        token: result.token,
        user: result.user
    })
},
handler)

handler.addStateProperties('token')

/*
export const logout = action({
    namespace: 'AUTH',
    event: 'LOGOUT',
    action: async (http) =>
    {
        await delay(500)
    },
    result: (state, result) =>
    ({
        ...state,
        token: null,
        user: null,
    })
}, handler)
*/

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)

// const initial_state = { token: null }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer()

// "Sleep" using `Promise`
// function delay(delay)
// {
//     return new Promise(resolve => setTimeout(resolve, delay))
// }