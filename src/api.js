var API = require('sse-api-client');
if(!process.env.SSE_API_ROOT) {
  console.log("Warning: SSE_API_ROOT not set")
}

module.exports = new API(process.env.SSE_API_ROOT);