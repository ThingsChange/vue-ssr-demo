/**
 *
 * @author  晴云
 * @create 2019-04-02 11:59
 * @note 干什么的呢？
 **/

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const router = createRouter()
  const app = new Vue({
    // 注入router到每一个根Vue实例
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router }
}
