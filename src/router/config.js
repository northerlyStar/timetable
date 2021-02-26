import index from '@/pages/index'
// import lifeGame from '@/pages/lifeGame'
import calculate from '@/pages/calculate'
import fakedata from '@/pages/fakedata'
// import getHtml from '@/pages/startGetHtml'
import weather from '@/pages/weather'
import whim from '@/pages/whim'
import calendar from '@/whim/calendar'
import menu from '@/whim/menu'
import git from '@/whim/gitPage'
import countdown from '@/whim/countdown'
import elementUI from '@/whim/elementUI'

const route = [
  {
    path: '/',
    name: 'index',
    component: index,
    title: '蒋闻铭的主页',
  },
  // {
  //   path: '/map',
  //   name: 'map',
  //   component: map,
  //   title: '高德地图SDK测试',
  // },
  // {
  //   path: '/lifeGame',
  //   name: 'lifeGame',
  //   component: lifeGame,
  //   title: '生命游戏',
  // },
  {
    path: '/calculate',
    name: 'calculate',
    component: calculate,
    title: '哔哩哔哩',
  },
  {
    path: '/fakedata',
    name: 'fakedata',
    component: fakedata,
    title: '接口数据测试',
  },
  {
    path: '/weather',
    name: 'weather',
    component: weather,
    title: '天气',
  },
  // {
  //   path: '/getHtml',
  //   name: 'getHtml',
  //   component: getHtml,
  //   title: '目標網址',
  // },
  {
    path: '/whim',
    component: whim,
    title: '蒋闻铭的突发奇想',
    children: [
      {
        path: '/',
        name: 'menu',
        component: menu,
        title: '目录',
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: calendar,
        title: '蒋闻铭的日历',
      },
      {
        path: 'git',
        name: 'git',
        component: git,
        title: '蒋闻铭的git',
      },
      {
        path: 'countdown',
        name: 'countdown',
        component: countdown,
        title: '蒋闻铭的倒计时',
      },
      {
        path: 'elementUI',
        name: 'elementUI',
        component: elementUI,
        title: '蒋闻铭的ElementUI',
      },
    ]
  },
]
export default route;