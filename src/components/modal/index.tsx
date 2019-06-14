import * as React from 'react'
import * as ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import style from './modal.less'

interface IOption {
  width?: string | number;
  height?: string | number;
  imgSrc: any;
  title: string;
}

/**
 * 
 * @param Component 弹窗组件
 * @param options 尺寸，图标，标题
 * @param ParentFn 弹窗组件完成后，触发父组件的一个方法，达到父子组件通信，通常在点击确定按钮触发父组件的方法
 * @param dataToChildren 父组件传递给弹窗的数据
 * @param localDialog ILocalDialogOption 为了 tab 隔离
 */
const createModal = (Component: any, options: IOption, ParentFn: any, dataToChildren: any = null, localDialog?: ILocalDialogOption) => {
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
    if(localDialog) {
      localDialog.ref.current.removeChild(showDom)
      // 弹窗数 - 1
      localDialog.delFn(localDialog.tabId)
    } else {
      document.body.removeChild(showDom);
    }
  }



  // 尺寸参数处理
  if (!options.width || !options.height) {
      options.width = '400px'
      options.height = '500px'    
  }
  // 设置弹窗大小范围
  if (options) {
    if (parseInt(options.width as string, 10)) {
      options.width = parseInt(options.width as string, 10) > (window.innerWidth - 100) ? (window.innerWidth - 100) : options.width
    } else {
      options.width = '400px'
      console.error('createModal width 属性值输入错误, 已使用默认值')
    }

    if (parseInt(options.height as string, 10)) {
      options.height = parseInt(options.height as string, 10) > (window.innerHeight - 100) ? (window.innerHeight - 100) : options.height
    } else {
      options.height = '500px'
      console.error('createModal height 属性值输入错误, 已使用默认值')
    }
  }

  // 实现窗口拖动

  let ModalDom: any = null;

  let translateX = 0
  let translateY = 0
  let moving = false;
  let lastX: any = null; // 记录上次移动的位置，用来和下次做差值，得出 dx 和 dy ，计算出偏移量，方便设置 transform 做移动处理
  let lastY: any = null;

  
  
  ReactDom.render(
    <div className={`${style.container} sk-modal`}
      ref={(node) => ModalDom = node}
      style={{
        width: options.width,
        height: options.height
      }}
    >
      <div 
        className={style.head + ' sk-modal-header'}
        onMouseDown={(e) => {onMouseDown(e)}}
        onMouseMove={(e) => {onMouseMove(e)}}
        onMouseUp={(e) => {onMouseUp()}}
      >
        <div>
          <img src={options.imgSrc} alt="emp" />
          <p>{options.title}</p>
        </div>
        <span className={style.times} onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className={style.body}>
        <Component close={close} dataFromParent={dataToChildren} cbFnToParent={ParentFn} />
      </div>
      
    </div>,
    showDom
  );

  // 放在 render 方法下面，是因为，ref的回调函数，在组件挂在之后执行，在这之前，还没挂在到dom节点上，此时 ModalDom 还没有值
  const onMove = (e: any) => {

    // 通过获取遮罩层的大小和自身的大小，来计算出活动范围。进而限制弹框，不会移动出到可视区域外
    const containerHeight: number = ModalDom.parentElement.clientHeight;
    const containerWidth: number = ModalDom.parentElement.clientWidth;
    const rangeTranslateX = (containerWidth - parseInt(options.width as string, 10)) / 2
    const rangeTranslateY = (containerHeight - parseInt(options.height as string, 10)) / 2

    if(lastX && lastY) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        
        translateX = translateX + dx
        translateY = translateY + dy

        // 在已经获取到 偏移量的基础上，根据上面取得的范围值，进行限制
        translateX = translateX > -rangeTranslateX && translateX < rangeTranslateX ? translateX : 
                      translateX > 0 ? rangeTranslateX : -rangeTranslateX

        translateY = translateY > -rangeTranslateY && translateY < rangeTranslateY ? translateY : 
                      translateY > 0 ? rangeTranslateY : -rangeTranslateY

    }
    lastX = e.clientX;
    lastY = e.clientY;

    ModalDom.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
  }

  const onMouseDown = (e: any) => {
    console.dir(ModalDom)
    e.stopPropagation();
    moving = true;
  }

  const onMouseMove = (e: any) => {
    if(moving) {
      onMove(e)
    }
  }

  const onMouseUp = () => {
    moving = false;
    lastX = null;
    lastY = null;
  }

  // 挂在到 window 上,是因为挂在 div 上，在鼠标移动过快时，事件丢失
  window.onmouseup = e => onMouseUp();
  window.onmousemove = e => onMouseMove(e);
}

export default createModal