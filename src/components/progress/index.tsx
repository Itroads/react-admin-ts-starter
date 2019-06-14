import * as React from 'react'
import * as ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import style from './progress.less'

interface IDialogLoadingOption {
  ref?: React.RefObject<HTMLDivElement>; // 挂载的 dom 节点，如果不传这个参数，则挂载到全局
  tabId?: string; // 当前 tab 的 id
  addFn?: Fn; // 外部传入的，处理当前 tab 弹窗数的方法
  delFn?: Fn; // 外部传入的，处理当前 tab 弹窗数的方法
}

let globalDialogOption: IDialogLoadingOption;

/**
 * 
 * @param localDialog 做局部弹出
 * @param isTab 是否在tab页内，如果在，为 true 则有redux, 如果在弹出中，为 false 则没有redux
 */
const createProgress = (percent: number, localDialog: IDialogLoadingOption = null, isTab: boolean = true) => {
  let showDom: HTMLDivElement;
  if(document.getElementById('_process')) {
    // 说明已经创建完了,就不用再创建了, 直接修改数值
    const perDom = document.getElementById('percent')
    perDom.innerText = percent + ' %'
  } else {
    showDom = document.createElement("div");
    showDom.setAttribute('id', '_process')
    globalDialogOption = localDialog
  
    // 设置基本属性
    showDom.classList.add(style.toast)
    if(localDialog) {
      localDialog.ref.current.appendChild(showDom)
    } else {
      document.body.appendChild(showDom);
    }
    
    if(localDialog && isTab) {
      // 弹窗数 + 1
      localDialog.addFn(localDialog.tabId)
    }
    ReactDom.render(
      <div className={style.content}>
        <FontAwesomeIcon className={style.circle} icon={faCircleNotch} />
        {'Loading...'}
        <span id={'percent'}>{percent} %</span>
      </div>,
      showDom
    );
  }
}

const clearProgress = () => {
  const showDom = document.getElementById('_process');
  if(showDom) {
    ReactDom.unmountComponentAtNode(showDom);
    if(globalDialogOption) {
      globalDialogOption.ref.current.removeChild(showDom)
    } else {
      document.body.removeChild(showDom)
    }
  }
}

export { createProgress, clearProgress }