# React-admin-ts-starter
React + Typescript 开发的后端多页脚手架
![react-admin-scaffold](https://github.com/Itroads/assets/blob/master/react-admin-scaffold/README/rast-show.png "react-admin-scaffold")

# 前言
关于这个脚手架项目：  
1. 为了公司多个产品模块能够统一，这样维护起来比较轻松  
2. 公司产品的上一个版本用 layui 开发，有 Tab 多页（所以...）  
3. 为了和市面上大众UI区分开（虽然可以用 Antd，然后覆盖样式，个人不喜欢），内置了需要的组件和部分特色功能  
4. 内置皮肤（与内置组件结合），继承原来产品的意志  
5. 顺便整理一下，拿出来骗星 :stuck_out_tongue_closed_eyes:  

由于代码比较简单，注释全面，同时使用了 TypeScript，新手拿来上手和参考，也是不错的。

# 如何使用？

`git clone https://github.com/Itroads/react-admin-ts-starter.git`

`cd react-admin-ts-starter`

`yarn`

`yarn start`

# 有哪些特别之处？
* 多 Tab 页，灵活切换
* 内置部分组件（其中 Modal 组件，可拖动，范围可设定）
* 内置皮肤，也可以自定义
* 可支持，左中右结构，就像 win 上的很多应用那样，当然这是可选项

# 内置组件说明
## Modal  
### Params 参数说明

| 参数名称 | 类型 | 说明 | 是否必须 |
|:----|:-----:|:-----:| :-------:|
| `Component` | `Component` | 弹窗显示的组件内容 | 必须 |
| `options` | `Object` | width?:string, height?:string, imgSrc:any, title:string |必须 |
| `ParentFn` | `Function` | 父组件传入的方法，如：点击确定，所触发的方法 | 必须 |
| `dataToChildren` | `Any` | 父组件传递给子组件的值 | 必须 |
| `localDialog` | `Object` | ref:React.RefObject<HTMLDivElement>, tabId:string, addFn:Fn, delFn:Fn。不传则为全局弹窗 | 可选 |


``` javascript
import React, { Component } from 'react'
import createModal from '../../components/modal'
import CreatNewRole from './creatNewRole'

class Demo extends Component {
	constructor(props: any) {
	    super(props)
	    this.container = React.createRef();
	}
	
    public container: React.RefObject<HTMLDivElement>;
   
	showNewModal () {
	    createModal(CreatNewRole,{
          width: '650px',
          height: '360px',
          imgSrc: require('../../assets/logo.png'),
          title: '添加角色'
        },this.creatRole, '',{
	      ref: this.container, 
	      tabId: this.props.activeTabId, // 来自 store
	      addFn: this.props.addDialogData, // 来自 store
	      delFn: this.props.deleteDialogData // 来自 store
    	 })
  	}
  	
  	render() {
	  	return (
	  		<div ref={this.container}>
	  		...
	  		</div>
	  	)
  }
}
```  

**注意**：包裹弹出组件的父节点，要设置 `position: relative;` ，因为遮罩层采用绝对定位。所以，遮罩范围，取决于设置了相对位置的父节点。  
**弹窗内部的组件，可通过调用 `this.props.close()` 来关闭弹窗**


## Alert

### Params

一共包含四个子组件：
`createConfirm` `createInfo` `createWarning` `createError`  
和一个供外部调用的关闭方法 `clearAlert`，直接调用即可 `clearAlert()`

| 属性名称 | 类型 | 说明 | 是否必须 | 范围 |
|:----|:-----:|:-----:| :-------:|:---:|
| `msg` | `String` | 弹窗的文字描述信息 | 必须 | 通用 |
| `cb` | `Function` | `Confirm` 弹窗，点击确定的回调方法 | 必须 | `Confirm` |

``` javascript
import React, { Component } from 'react'
import { createConfirm, createInfo, createWarning, createError, clearAllAlert } from '@components/alert/alert'

class Demo extends Component {

	/**
   * confirm 点击确认按钮的回调
   * @param {any} params 
   */
  confirmCallBack (params) {
    console.log('test', params)
    clearAllAlert()
  }

  showNewConfirm () {
    createConfirm('确定要删除xxx ？', this.confirmCallBack.bind(this, 123))
  }

  showNewInfo () {
    createInfo('确定要删除xxx ？')
  }

  showNewWarning () {
    createWarning('警告信息')
  }

  showNewError () {
    createError('错误信息')
  }
  
  render() {
  	return (
  		...
  	)
  }

}
```  

## Toast

### Params

| 属性名称 | 类型 | 说明 | 是否必须 |
|:----|:-----:|:-----:| :-------:|
| `text` | `String` | 弹窗的文字描述信息 | 必须 |
| `time` | `Number` | `Toast` 弹窗，指定时间后消失，默认1500毫秒 | 可选 |

### Demo

``` javascript
import React, { Component } from 'react'
import Modal from '@components/modal/modal'

class Demo extends Component {
	showToast () {
      createToast('账号或密码错误账号或密码错误', 2000)
  	}
  	
  	render() {
	  	return (
	  		...
	  	)
   }
}

```  

## Menu

### Params

| 属性名称 | 类型 | 说明 | 是否必须 |
|:----|:-----:|:-----:| :-------:|
| `data` | `Array` | 菜单数据 | 必须 |
| `activeTabId` | `String` | 当前页面的ID，来自 Store | 可选 |
| `openOrToggleTabBox` | `Function` | 左侧菜单导航，处理 tabBox 方法，来自 store | 可选 |
| `operateCallBack` | `Function ` | 右侧操作菜单回调函数 | 可选 |
| `tabModalCount` | `Number` | 当前 tab 页的弹窗数量 | 可选 |

### Demo

#### 左侧菜单

``` javascript
import * as React from 'react'
import { connect } from 'react-redux'
import { addTabBox, setDefaultTab } from '../../reducers/tabBoxReducer'

class Demo extends Component {
	
  	render() {
	  	return (
	  		<Menu 
	  		data={this.state.data} 
	  		activeTabId={this.props.activeTabId} 			openOrToggleTabBox={this.props.addTabBox}
	  		/>	  	
	  	)
   }
}

const mapStateToProps = (state: any) => ({
  activeTabId: state.tabBoxState.activeTabId
})

const mapDispatchToProps = (dispatch: any) => ({
  addTabBox: (tabItem: ITabItem) => dispatch(addTabBox(tabItem)),
  setDefaultTab: (tabItem: ITabItem) => dispatch(setDefaultTab(tabItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)


```  

#### 右侧菜单

``` javascript
import * as React from 'react'
import { connect } from 'react-redux'
import { addDialogData, deleteDialogData } from '../../../../reducers/modalReducer'

class Demo extends Component {
	
  	render() {
	  	return (
	  		<Menu 
	  		data={this.state.rightMenuData} 
	  		operateCallBack={(value: string) => this.menuOperate(value)} 			tabModalCount={this.props.modalState ? 				this.props.modalState[this.props.activeTabId] : null} 
	  		/>	
	  	)
   }
}

const mapStateToProps = (state: any) => ({
  activeTabId: state.adminTabBoxState.activeTabId,
  modalState: state.modalState
})

const mapDispatchToProps = (dispatch: any) => ({
  addDialogData: (key: string) => dispatch(addDialogData(key)),
  deleteDialogData: (key: string) => dispatch(deleteDialogData(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)


```  

# 你可能存在的疑惑？

## 皮肤太丑？:unamused:  
打开 `/src/utils`  

```  
-utils
	-skin-files
		-darkBlack.ts // 输出皮肤样式的对象
		-darkBlue.ts
		...
	-skin.ts // 输出全局的，皮肤样式

```

发挥你的设计灵感吧！:smiling_imp:  

## 哪里控制 Tab 页面？

打开 `/src/pages/home/pageBox.tsx` 我想，里面的注释，应该足够解释了

## 如何实现的多Tab页？
核心就是 redux 状态管理，尽在 `/src/reducers`，里面的注释可以帮你解惑


# 感谢
技术的道路总是崎岖，前行的路上获得了很多帮助，虽然我很渺小，但接受的帮助也会铭记。  
`爝神` `方少` `众'狼友'` 以及众多，在我问出小白的问题时，一样认真帮助解答的人。  

**特别报道：** 爝神的 Node 框架 [Daruk](https://github.com/darukjs/daruk) 震撼登场！

# 最后
每个成长起来的人，都是曾经的小白，虽然我也不是 `真·大佬` ，但我也希望，新人在求知的路上能够不被嘲笑，能够得到真诚的帮助。

可以加我的 WX ，一起学习探讨。  


<p align="center">
	<img src="https://github.com/Itroads/assets/blob/master/react-admin-scaffold/README/wechatqr.png"  width="200">
	<p align="center">
		<em>Itroad</em>
	</p>
</p>
