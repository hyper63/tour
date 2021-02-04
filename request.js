if (!globalThis.fetch) {
  globalThis.fetch = require('@vercel/fetch')(require('node-fetch'))
}
const daggy = require('daggy')

const Request = daggy.tagged('Request', ['get', 'post', 'put', 'delete'])
const createHeaders = token => ({ 
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
})
const createOptions = token => (method, body) => { 
  let result = { method, headers: createHeaders(token) }
  if (body) { result.body = JSON.stringify(body) }
  return result
}
const xfetch = url => async (path, options) => await fetch(`${url}${path}`, options).then(res => {
  if (res.status >= 400) {
    return res.text() 
  }
  return res.json()
})
const noop = () => null

module.exports = (url, token) => {
  const doOptions = createOptions(token)
  const $ = xfetch(url)

  return Request.from({
    get: (path) => $(path, doOptions('GET')),
    post: (path, body) => $(path, doOptions('POST', body)),
    put: (path, body) => $(path, doOptions('PUT', body)),
    'delete': (path) => $(path, doOptions('DELETE')) 
  })
}
