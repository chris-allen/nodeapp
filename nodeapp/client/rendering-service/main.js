import React from 'react'
import webpageServer from 'react-isomorphic-render/server'
import { devtools } from 'universal-webpack'
import path from 'path'

import settings, { icon } from '../src/react-isomorphic-render'

import Log from 'log'
const log = new Log('info')

const WEB_SERVICE_PORT = 3000
const PAGE_SERVICE_PORT = 3002

export default function(parameters) {
  // Starts webpage rendering server
  const server = webpageServer(settings, {
    // HTTP host and port for performing all AJAX requests
    // when rendering pages on server-side.
    // E.g. an AJAX request to `/items/5` will be transformed to
    // `http://${host}:${port}/items/5` during server-side rendering.
    // Specify `secure: true` flag to use `https` protocol instead of `http`.
    application: {
      host: 'localhost',
      port: WEB_SERVICE_PORT
      // secure: true
    },

    // Http Urls to javascripts and (optionally) CSS styles
    // which will be insterted into the <head/> element of the resulting Html webpage
    // (as <script src="..."/> and <link rel="style" href="..."/> respectively)
    //
    // Also a website "favicon".
    //
    assets: (path, { store }) =>
    {
      return {
        // Retrieve asset chunk file names
        // (which are output by client side Webpack build)
        ...parameters.chunks(),

        // Webpack entry point (can be used for code splitting)
        entries: ['main'],

        // Add "favicon"
        icon: icon
      }
    },

    html: {
      // Will be inserted into server rendered webpage <head/>
      // (this `head()` function is optional and is not required)
      // (its gonna work with or without this `head()` parameter)
      head(path) {
        if (process.env.NODE_ENV !== 'production') {
          // `devtools` just tampers with CSS styles a bit.
          // It's not required for operation and can be omitted.
          // It just removes the "flash of unstyled content" in development mode.
          return `<script>${devtools({ ...parameters, entry: 'main' })}</script>`
        }
      },

      // Isomorphic CSS flag
      bodyStart(path) {
        return `
          <script>
            // This line is just for CSS
            document.body.classList.add('javascript-is-enabled');
          </script>
        `;
      }
    }
  })

  // Start webpage rendering server
  server.listen(PAGE_SERVICE_PORT, function(error) {
    if (error) {
      log.error('Webpage rendering server shutdown due to an error')
      throw error
    }

    log.info(`Webpage server is listening at http://localhost:${PAGE_SERVICE_PORT}`)
  })
}
