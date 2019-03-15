const util = {
  getCookie: function(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  },
  setCookie: function(name, value, expires, path, domain, secure) {
    var strCookie = name + '=' + value
    if (expires) {
      var curTime = new Date()
      curTime.setTime(curTime.getTime() + 24 * expires * 60 * 60 * 1e3)
      strCookie += '; expires=' + curTime.toGMTString()
    }
    strCookie += path ? '; path=' + path : ''
    strCookie += domain ? '; domain=' + domain : ''
    strCookie += secure ? '; secure' : ''
    document.cookie = strCookie
  },
  removeCookie: function(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    document.cookie = name + '=' + cval + ';  expires=' + exp.toGMTString()
  },
  getQueryString: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  getRequest: function(name) {
    const url = window.location.href
    const theRequest = {}
    if (url.indexOf('?') != -1) {
      var str = url.split('?')[1]
      const strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    return theRequest[name] ? theRequest[name] : null
  }
}

export default util
