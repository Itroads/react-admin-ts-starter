// import * as Loadable from 'react-loadable'
// import Loading from './components/loading'

import Home from './pages/home'
import Login from './pages/login'

// const Admin = Loadable({
//   loader: () => import('./pages/admin/index'),
//   loading: Loading,
//   delay: 300
// })

export default [
  { path: '/login', component: Login },
  { path: '/', component: Home, private: true }
]