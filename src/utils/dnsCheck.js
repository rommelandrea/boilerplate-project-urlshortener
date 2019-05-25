const validUrl = require('valid-url')
const dns = require('dns')
const url = require('url')

class DnsCheck {
  constructor() {}

  async checkValidURL(uri) {
    if (validUrl.isUri(uri)) {
      const myURL = new URL(uri)
      return new Promise((resolve, reject) => {
        dns.lookup(myURL.hostname, (err, addr, family) => {
          if(err) reject(err)
          resolve(addr)
        })
      })

    } else {
      return false
    }
  }
}

module.exports = DnsCheck


/*
await dns.lookup(myURL.hostname, (err, addr, family) => {
        if (err) {
          console.log('error')
          console.error(err)
          return false
        }
        console.log(addr)
        return addr
      })
      */
