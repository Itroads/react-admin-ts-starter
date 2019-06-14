import * as React from 'react'
import { connect } from 'react-redux'
import { addDialogData, deleteDialogData } from '../../reducers/modalReducer'
import Layout from '../../components/layout/index'

class DomainManage extends React.Component<any, any> {

  public render() {
    return (
      <Layout isShow={this.props.isShow}>
        <div>
          域管理页面
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

export default connect(mapStateToProps, mapDispatchToProps)(DomainManage)