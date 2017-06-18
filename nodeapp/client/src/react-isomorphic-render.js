import routes  from './routes'
import * as reducer from './redux/reducer'
import wrapper from './wrapper'
import asyncSettings from './react-isomorphic-render-async'

// "Favicon" must be imported on the client side too
// since no assets are emitted on the server side
export { default as icon } from '../assets/images/icon.png'

export default
{
	reducer: reducer,
	routes: routes,
	wrapper: wrapper,

	error: (error, { path, url, redirect, dispatch, getState, server }) => {
		console.error(`Error while preloading "${url}"`)
		console.error(error)
		
		// // Not authenticated
		if (error.status === 401) {
			return redirect('/login')
		}

		// // Not authorized
		// if (error.status === 403)
		// {
		// 	return redirect('/unauthorized')
		// }

		// Redirect to a generic error page
		if (process.env.NODE_ENV === 'production')
		{
			redirect('/error')
		}

		// throw error
	},

	http: {
	    request: (request, { store }) => {
	    	const bearerToken = request.get('Authorization')
	    	if (bearerToken) {
	    		request.set('Authorization', bearerToken.substring(7))
	    	}
	    }
	},

	authentication: {
		protectedCookie: 'token',
		accessToken: (getCookie, helpers) => {
			const token = getCookie('token')
			if (token) {
				return token
			}
			else {
				const state = helpers.store.getState()
				if (state.auth.token) {
					return state.auth.token
				}
				return ""
			}
		}
	},

	...asyncSettings
}