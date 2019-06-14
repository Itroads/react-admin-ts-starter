import * as React from 'react'
import * as ReactDom from 'react-dom'
import intl from 'react-intl-universal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './alert.less'

import info from './icon/tips.png'
import warning from './icon/warning.png'
import error from './icon/fail.png'
import confirm from './icon/confirm.png'

// let showDom: any;
/**
 * 这里没有用唯一的dom，就是允许了，多个 alert 同时出现。但是，在modal 的时候，是不允许多个的。一次只能有一个。
 * 在有 alert 的时候，和其他 Modal 的时候，右侧操作菜单，都将失效。
 * 建一个 store 里面，放一个对象，每个页面的id为key， 只要这个key有值，那么右侧菜单就不能点击
 * 意思就是，只要中间弹窗有 alert 或者 modal ,右侧都不可点，就可以防止，alert 和 modal 之间的冲突了。
 * 但是，不同的tab，之间的控制，是互不影响的。
 */

/**
 * 
 * @param msg 询问信息
 * @param cb 点击确定的回调函数
 * @param localDialog 局部弹窗，所需参数
 */
const createConfirm = (msg: string, cb: any, localDialog?: ILocalDialogOption) => {
  const showDom = document.createElement("div");

  // 设置基本属性
  showDom.classList.add(styles.toast)
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

  const ModalStyle = {
    width: '300px',
    height: '165px'
  }

  ReactDom.render(
    <div className='sk-alert' style={ModalStyle}>
      <div className={`${styles.head} sk-alert-header`}>
        <div>
          <img src={confirm} alt="emp" />
          <p>确认</p>
        </div>
        <span onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className={styles.confirmContent}>
        <p className={styles.msg}>
          {msg}
        </p>
      </div>
      <div className={`${styles.footer} sk-alert-footer`}>
        <div onClick={close}>
          {intl.get('COM00100000010003').d('取消')}
        </div>
        <div onClick={() => { cb(); close(); }}>
          {intl.get('COM00100000010001').d('确定')}
        </div>
      </div>
    </div>,
    showDom
  );
}

/**
 * 
 * @param msg 弹窗信息
 * @param ref 挂载的 dom 节点，如果不传这个参数，则挂载到全局
 * @param tabId 当前 tab 的 id
 * @param addFn 外部传入的，处理当前 tab 弹窗数的方法
 * @param delFn 外部传入的，处理当前 tab 弹窗数的方法
 */
const createInfo = (msg: string, localDialog?: ILocalDialogOption) => {
  const showDom = document.createElement("div");

  // 设置基本属性
  showDom.classList.add(styles.toast)
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

  const ModalStyle = {
    width: '300px',
    height: '165px'
  }

  ReactDom.render(
    <div className='sk-alert' style={ModalStyle}>
      <div className={`${styles.head} sk-alert-header`}>
        <div>
          <img src={info} alt="emp" />
          <p>{intl.get('BDN00100000100001').d('信息')}</p>
        </div>
        <span onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.msg}>
          {msg}
        </p>
      </div>
    </div>,
    showDom
  );
}

const createWarning = (msg: string, localDialog?: ILocalDialogOption) => {
  const showDom = document.createElement("div");

  // 设置基本属性
  showDom.classList.add(styles.toast)
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

  const ModalStyle = {
    width: '300px',
    height: '165px'
  }

  ReactDom.render(
    <div className='sk-alert' style={ModalStyle}>
      <div className={`${styles.head} sk-alert-header`}>
        <div>
          <img src={warning} alt="emp" />
          <p>{intl.get('BDN00100000100002').d('警告')}</p>
        </div>
        <span onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.msg}>
          {msg}
        </p>
      </div>
    </div>,
    showDom
  );
}

const createError = (msg: string, localDialog?: ILocalDialogOption) => {
  const showDom = document.createElement("div");

  // 设置基本属性
  showDom.classList.add(styles.toast)
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

  const ModalStyle = {
    width: '300px',
    height: '165px'
  }

  ReactDom.render(
    <div className='sk-alert' style={ModalStyle}>
      <div className={`${styles.head} sk-alert-header`}>
        <div>
          <img src={error} alt="emp" />
          <p>{intl.get('COM00100000010012').d('错误')}</p>
        </div>
        <span onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.msg}>
          {msg}
        </p>
      </div>
    </div>,
    showDom
  );
}

export { createConfirm, createInfo, createWarning, createError }