import { action, createHandler, stateConnector } from 'react-isomorphic-render'
import settings from '../react-isomorphic-render-async'

const handler = createHandler(settings);

export const get_profile = action({
    namespace: 'PROFILE',
    event: 'GET_PROFILE',
    action: async (id, http) =>
    {
        await delay(1000)
        await http.get(`/api/users/${id}`)
    },
    result: (state, result) =>
    ({
        ...state,
        profile: result
    })
}, handler)

// // A developer can additionally handle any other custom events
// handler.handle('CUSTOM_EVENT', (state, action) =>
// ({
//   ...state,
//   customProperty: action.result
// }))

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)

const initial_state = { profile: null }

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
function delay(delay)
{
    return new Promise(resolve => setTimeout(resolve, delay))
}