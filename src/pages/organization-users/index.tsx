import * as React from 'react'
import Layout from '../../components/layout/index'
import { connect } from 'react-redux'
import { addDialogData, deleteDialogData } from '../../reducers/modalReducer'

class OrganizationUsers extends React.Component<any, any> {
  public render() {
    return (
      <Layout isShow={this.props.isShow}>
        <div>
          机构用户页面
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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationUsers)