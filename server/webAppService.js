/**
 *
 * @author  晴云
 * @create 2019-05-07 8:55
 * @note 干什么的呢？
 **/

let fs = require('fs')
let axios = require('axios')

exports.get_search_data = function (key, start, end) {
  console.log('这里是 加载 的结果-------------', 123)
  return axios({
    // url: 'https://your.test.com/bsdataopt/datascreen/invest',
    url: 'https://dohko.m.hualala.com/orh5/qrcode/info?s=100549_I7V4&groupID=11157',
    method: 'GET'
  })
}
