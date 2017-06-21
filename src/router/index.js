import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import Rotate from '../components/rotate'
import Lyric from '../components/lyric'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
      children: [
        {
          path: 'rotate',
          component: Rotate
        },
        {
          path: 'lyric',
          component: Lyric
        }
      ]
    }
  ]
})
