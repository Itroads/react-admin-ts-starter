import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import intl from 'react-intl-universal';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-hk'
import 'moment/locale/en-nz'

import PrivateRoute from './pages/private_router/index'
import RouteData from './routerMap'
import './App.less'

import rootReducer from './reducers/index'

const store = createStore(rootReducer)
// locale data
const locales = {
  "zh-CN": require('./locales/2052.js').default,
  "en-US": require('./locales/1033.js').default,
  "zh-HK": require('./locales/1028.js').default,
};

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      initDone: false
    }
  }

  public componentDidMount() {
    this.loadLocales();
    this.dataTimeI18n(); // react-datetime 时间控件，多语言切换（全局）
  }

  // 获取当前语言，localStorage 如果没有，就根据浏览器的语言来
  public getLangs = () => {
    
    const currentLanges = window.localStorage.getItem('empBasicLang')
    const lang = currentLanges ? currentLanges : navigator.language

    return lang
  }

  public dataTimeI18n = () => {
    const lang = window.localStorage.getItem('empBasicLang');
    switch(lang) {
        case 'zh-CN':
            moment.locale('zh-cn');
            break;
        case 'zh-HK':
            moment.locale('zh-hk');
            break;
        case 'en-US':
            moment.locale('en-nz');
            break;
        default:
            moment.locale('zh-cn');
            return
    }
}

  public loadLocales() {
    const lang = this.getLangs()
    
    intl.init({
      currentLocale: lang, // TODO: determine locale here
      locales,
      commonLocaleDataUrls: {
        en: '/en.js', // the file
        zh: '/zh.js' // the file
      }
    })
    .then(() => {
      // After loading CLDR locale data, start to render
	    this.setState({initDone: true});
    });
  }


  private RouteDom = (routeArray: any[]) => {
    const routeMap: any[] = [];
    for (let i = 0; i < routeArray.length; i++) {
      routeArray[i].private
        ?
        routeMap.push(<PrivateRoute key={i} path={routeArray[i].path} component={routeArray[i].component} />)
        :
        routeMap.push(<Route key={i} path={routeArray[i].path} component={routeArray[i].component} />)
    }
    return routeMap
  }

  public render() {
    return (
      <Provider store={store}>
          { 
            this.state.initDone &&
            <Router>
              <div style={{ height: '100%' }}>
                <Switch>
                  {this.RouteDom(RouteData)}
                  <Redirect to='/' />
                </Switch>
              </div>
            </Router>
          }
      </Provider>
    )
  }
}

export default App as any;
