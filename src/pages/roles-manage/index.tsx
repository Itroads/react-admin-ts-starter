import * as React from 'react'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'

import Layout from '../../components/layout/index'
import { addDialogData, deleteDialogData } from '../../reducers/modalReducer'

class RolesManage extends React.Component<any, any> {

  
  public render() {
    return (
      <Layout isShow={this.props.isShow}>
        <div>
          <div>角色管理页面</div>
          <div>语言包测试：{intl.get('GPGN9020201').d('登录选项')}</div>
          
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