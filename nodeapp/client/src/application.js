// The polyfill will emulate a full ES6 environment (for old browsers)
// (including generators, which means async/await)
import 'babel-polyfill'
import { render } from 'react-isomorphic-render'
import settings from './react-isomorphic-render'

import '../assets/styles/style.scss'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import rrui from 'react-responsive-ui/style.css'

// renders the webpage on the client side
render(settings, {
  // enable/disable Redux dev-tools
  devtools: REDUX_DEVTOOLS ? require('./devtools').default : undefined
})
.then(({ store, rerender }) => {
  if (module.hot) {
    module.hot.accept('./react-isomorphic-render', () => {
      store.hotReload(settings.reducer)
      rerender()
    })
  }
})
