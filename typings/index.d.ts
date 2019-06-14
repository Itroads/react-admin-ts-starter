declare module '*.less' {
  const styles: {
    [key: string]: string
  };
  export default styles;
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'


// 全局参数定义
declare interface Window {
  basicConfig: any; // 项目配置
}

// tabBox 
declare interface ITabItem {
  id: string; // tab的id
  name: string; // tab的标题
  tabIcon: string; // tab 前面的小图标
}

// 放在 redux 里的，关于 tabBox 的数据格式
declare interface IDefaultState {
  tabData: ITabItem[]; // 用来生成 tabBox
  activeTabId: string; // 当前显示的 tab
}

// modal 弹窗组件的属性
declare interface IModalProps {
  close: any; // 弹窗关闭方法
  cbFnToParent: any; // 来自父组件的方法，用来通过参数，将子组件的数据，传递给父组件
  dataFromParent?: any; // 父组件，给子组件传递的数据
}

type Fn = (key: string) => void;

// 如果需要 tab 局部弹窗，添加这个属性
declare interface ILocalDialogOption {
  ref: React.RefObject<HTMLDivElement>; // 挂载的 dom 节点，如果不传这个参数，则挂载到全局
  tabId: string; // 当前 tab 的 id
  addFn: Fn; // 外部传入的，处理当前 tab 弹窗数的方法
  delFn: Fn; // 外部传入的，处理当前 tab 弹窗数的方法
}

declare interface ITabModalController {
  addDialogData?: (key: string) => void;
  deleteDialogData?: (key: string) => void;
  activeTabId?: string;
  modalState?: {
    [key: string]: number
  }
}
