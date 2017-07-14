
var config = require(__dirname + '/../../.config.json');

// This is needed for the CLI to work
module.exports = {
    "development": {
        "url": config.DB_CONN_URL
    }
}