import * as React from 'react'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'
import $ from 'jquery'

// @ts-ignore
window.jQuery = $

require('ztree')

import 'ztree/css/zTreeStyle/zTreeStyle.css'

import Layout from '../../components/layout/index'
import { addDialogData, deleteDialogData } from '../../reducers/modalReducer'


class RolesManage extends React.Component<any, any> {

  public componentDidMount() {
    const setting = {
	    view: {
            showIcon: this.showIconForTree,
            showLine:true,
            fontCss : {color:"#666"}
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };

    const zNodes =[
      { id:1, pId:0, name:"父节点1 - 展开"},
      { id:11, pId:1, name:"父节点11 - 折叠"},
      { id:111, pId:11, name:"叶子节点111"},
      { id:112, pId:11, name:"叶子节点112"},
      { id:113, pId:11, name:"叶子节点113"},
    ];


    $.fn.zTree.init($("#tree"), setting, zNodes);
    
  }

  public showIconForTree(treeId: any, treeNode: any) {
    return !treeNode.isParent;
  }

  
  public render() {
    return (
      <Layout isShow={this.props.isShow}>
        <div>
          <div>角色管理页面</div>
          <div>语言包测试：{intl.get('GPGN9020201').d('登录选项')}</div>
          <div>
            <span> zTree: </span>
            <ul id='tree' className="ztree" />
          </div>
          
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => ({
  activeTabId: state.tabBoxState.activeTabId,
  modalState: state.modalState
})

const mapDispatchToProps = (dispatch: any) => ({
  addDialogData: (key: string) => dispatch(addDialogData(key)),
  deleteDialogData: (key: string) => dispatch(deleteDialogData(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(RolesManage)