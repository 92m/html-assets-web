export const json = function({url, params, callback}) {
  return new Promise((resolve, reject)=> {
    let script = document.createElement('script')
    window[callback] = function(data) {
      resolve(datas)
      document.body.removeChild(script)
    }
    params = {...params, callback}
    let any = []
    for(let key in params) {
      any.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${any.join('&')}`
    document.body.appendChild(script)
  })
}