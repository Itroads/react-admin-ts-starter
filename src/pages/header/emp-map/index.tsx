import * as React from 'react'

import { modulesList } from '../../../http/api/index'

import logoImg from '../icon/logo.png'

import cmsImg from '../icon/cms.png'
import ictImg from '../icon/ict.png'
import settingImg from '../icon/setting.png'

import ikbmsImg from '../icon/ikbms.png'
// import recordImg from '../icon/record.png'

import icpcImg from '../icon/icpc.png'

import styles from './empMap.less'

export default class ChangeModal extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      modulesList: '',
    }
  }

  public ip = window.location.hostname

  public componentDidMount() {
    modulesList().then((res: any) => {
      const list = []
      if(res && res.data) {
        for(const item of res.data) {
          if(item.uri.indexOf('localhost')) {
            item.uri = item.uri.replace('localhost', this.ip)
          }
          list.push(item)
        }
        this.setState({
          modulesList: list
        })
      }
    })
  }

  public getModuleImg = (img: string): string => {
    let moluleImg: any;
    switch(img) {
      case 'cms.png':
        moluleImg = cmsImg;
      break;
      case 'ict.png':
        moluleImg = ictImg;
      break; 
      case 'dashboard.png':
        moluleImg = logoImg;
      break; 
      case 'data.png':
        moluleImg = logoImg;
      break; 
      case 'icpc.png':
        moluleImg = icpcImg;
      break; 
      case 'ikbms.png':
        moluleImg = ikbmsImg;
      break; 
      case 'setting.png':
        moluleImg = settingImg;
      break;
      default:
        moluleImg = logoImg;
    }

    return moluleImg
  }

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.body}>
        {
          this.state.modulesList 
          ?
          this.state.modulesList.map((currentItem: any, index: number) => 
            <div key={index} className={styles.form}>
              <a className='sk-txt' href={currentItem.uri} target="view_window">
                <img src={this.getModuleImg(currentItem.icon)} alt="eMP module" />
                <span>{currentItem.name}</span>
              </a>
            </div>
          )
          : null
        }
        </div>
      </div>
      
    )
  }
}