import * as React from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import Loading from '../../components/loadable-loading/index'

const RolesManage = Loadable({loader: () => import('../roles-manage/index'), loading: Loading})
const OrganizationUsers = Loadable({loader: () => import('../organization-users/index'), loading: Loading})
const DomainManage = Loadable({loader: () => import('../domain-manage/index'), loading: Loading})
const InteractiveLogin = Loadable({loader: () => import('../security-policy/interactive-login/index'), loading: Loading})
const LockPolicy = Loadable({loader: () => import('../security-policy/lock-policy/index'), loading: Loading})
const PasswordPolicy = Loadable({loader: () => import('../security-policy/password-policy/index'), loading: Loading})

class PageBox extends React.Component<any, any> {
    
    public render() {
      const tabIdArray = this.props.tabData.map((curVal: ITabItem) => curVal.id)
        return (
            <React.Fragment>
                { tabIdArray.indexOf('1021110110100000000') !== -1 ? <RolesManage isShow={ this.props.activeTabId === '1021110110100000000' } /> : null }
                { tabIdArray.indexOf('1021110110200000000') !== -1 ? <OrganizationUsers isShow={ this.props.activeTabId === '1021110110200000000' } /> : null }
                { tabIdArray.indexOf('1021110111100000000') !== -1 ? <DomainManage isShow={ this.props.activeTabId === '1021110111100000000' } /> : null }
                { tabIdArray.indexOf('1021110110301000000') !== -1 ? <PasswordPolicy isShow={ this.props.activeTabId === '1021110110301000000' } /> : null }
                { tabIdArray.indexOf('1021110110302000000') !== -1 ? <InteractiveLogin isShow={ this.props.activeTabId === '1021110110302000000' } /> : null }
                { tabIdArray.indexOf('1021110110303000000') !== -1 ? <LockPolicy isShow={ this.props.activeTabId === '1021110110303000000' } /> : null }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({
  tabData: state.tabBoxState.tabData,
  activeTabId: state.tabBoxState.activeTabId
})


export default connect(mapStateToProps, null)(PageBox as any)