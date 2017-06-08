
export default function(state = { authenticated: false, admin_privileges: false }, action) {

  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, error: '', authenticated: true };
    case 'UNAUTH_USER':
      return { ...state, authenticated: false, admin_privileges: false };
    case 'AUTH_ERROR':
      return { ...state, error: action.payload };
    case 'FETCH_MESSAGE':
      return { ...state, message: action.payload };
    case 'FETCH_ADMIN_MESSAGE':
      return { ...state, message: action.payload };
    case 'SET_ADMIN_PRIVILEGES':
      return { ...state, admin_privileges: true };
  }

  return state;

}