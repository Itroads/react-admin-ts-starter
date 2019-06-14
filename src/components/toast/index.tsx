import * as React from 'react'
import * as ReactDom from 'react-dom'
import style from './toast.less'

const createToast = (text: string, time?: number | string, localDialog?: ILocalDialogOption) => {
  const showDom = document.createElement("div");

  // 设置基本属性
  showDom.classList.add(style.toast)
  if(localDialog) {
    localDialog.ref.current.appendChild(showDom)
  } else {
    document.body.appendChild(showDom);
  }
  
  if(localDialog) {
    // 弹窗数 + 1
    localDialog.addFn(localDialog.tabId)
  }

  // 自我删除的方法
  const close = (): void => {
    ReactDom.unmountComponentAtNode(showDom);
    localDialog ? localDialog.ref.current.removeChild(showDom) : document.body.removeChild(showDom);
    if(localDialog) {
      // 弹窗数 - 1
      localDialog.delFn(localDialog.tabId)
    }
  }

  if (!parseInt(time as string, 10)) {
    time = 2000
  }
  setTimeout(close, time as number)
  ReactDom.render(
    <div className={style.content}>
      {text}
    </div>,
    showDom
  );
}

export default createToast