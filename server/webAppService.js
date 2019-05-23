/**
 *
 * @author  晴云
 * @create 2019-05-07 8:55
 * @note 干什么的呢？
 **/

let fs = require('fs')
let axios = require('axios')

exports.get_search_data = function (key, start, end) {
  return axios({
    url: 'https://your.test.com/bsdataopt/datascreen/invest',
    method: 'GET'
  })
}
