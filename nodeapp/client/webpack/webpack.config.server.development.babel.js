import { cloneDeep } from 'lodash';
import webpack from 'webpack';
import baseConfiguration from './webpack.config.server';

const WEBPACK_DEV_SERVER_PORT = 3001

const configuration = cloneDeep(baseConfiguration)

// This resolves an issue where files edited from a host OS don't trigger vagrant's webpack watch
configuration.watchOptions = { poll: true }

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://localhost:${WEBPACK_DEV_SERVER_PORT}${configuration.output.publicPath}`

export default configuration
