import * as React from 'react'
import intl from 'react-intl-universal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import styles from './index.less'

export interface IPaginationProps {
    pageCount: number;   //  总页数
    currentPage: number; // 从 1 开始
    pageChange: any;
    total: number;
    pageNumber: number; // 当前页，有多少条数据
}
interface IState {
    jump_page: number;
    currentIndex: number; // 从 1 开始
}

class Pagination extends React.Component<IPaginationProps, IState> {
    constructor(props: IPaginationProps) {
        super(props);
        this.state = { 
            jump_page: 1,
            currentIndex: props.currentPage ? props.currentPage : 1
        }
    }

    public static getDerivedStateFromProps(nextProps: IPaginationProps, prevState: IState) {
        return {
            currentIndex: nextProps.currentPage
        }
    }

    // 页码改变
    public jumPageChange = (e:any) => {
        if(e.target.value > this.props.pageCount){
            this.setState({ jump_page: this.props.pageCount })
        }else if(e.target.value < 1){
            this.setState({ jump_page: 1 })
        }else{
            this.setState({ jump_page: e.target.value })
        }
    }

    // 跳转至第一页
    public jumpToTop = ():void => {
        this.props.pageChange(0)
    }
    // 跳转至前一页
    public jumpBeforeOne = ():void => {
        if(this.props.currentPage-2 >= 0){
            this.props.pageChange(this.props.currentPage-2)
        }
    }
    // 跳转至后一页
    public jumpAfterOne = ():void => {
        if(this.props.currentPage < this.props.pageCount){
            this.props.pageChange(this.props.currentPage)
        }
    }
    // 跳转至最后一页
    public jumpToBottom = ():void => {
        this.props.pageChange(this.props.pageCount-1)
    }
    // 跳转按钮
    public jumpPage = ():void => {
        this.props.pageChange(this.state.jump_page-1)
    }

    public getPageNumberArray = () => {
        const currentPage = this.props.currentPage
        const pageCount = this.props.pageCount
        const arr = []

        let left = 1
        let right = pageCount
        

        if (pageCount >= 7) {
            if (currentPage > 5 && currentPage < pageCount - 4) {
                left = Number(currentPage) - 2;
                right = Number(currentPage) + 2;
            } else {
                if (currentPage <= 5) {
                    left = 1;
                    right = 7;
                } else {
                    right = pageCount;
                    left = pageCount - 6;
                }
            }
        }

        while (left <= right) {
            arr.push(left);
            left++;
        }
        return arr;
    }

    public eFont = () => {
        if(this.props.pageCount <= 7){
            return false;
        } 
        return this.props.currentPage > 5;
    }

    /**
     * @param count 从 0 开始，传递给父组件
     */
    public handlePageChange = (count: number) => {
        if(this.props.pageChange) {
            
            this.props.pageChange(count)
        }
        this.setState({
            currentIndex: count + 1
        })
    }

    
    public render() {
        return (
            <div className={styles.pagination}>
                <div>
                    <p>
                     {intl.get('COM0010000003000F2', { total: this.props.total, currentPage: this.props.currentPage,  pageCount: this.props.pageCount, pageNumber: this.props.pageNumber})}
                    </p>
                </div>

                <div>
                    <span onClick={this.jumpToTop}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                    </span>
                    <span onClick={this.jumpBeforeOne}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </span>

                    {
                        this.props.pageCount > 7 && this.props.currentPage >= 6 ? <span onClick={() => this.handlePageChange(0)}>1</span> : ''
                    }
                    {
                        this.eFont() ? <span>...</span> : ''
                    }
                    {
                        this.getPageNumberArray().map((curItem, index) =>
                            <span key={index} className={this.state.currentIndex === curItem ? styles.active : ''} onClick={() => this.handlePageChange(curItem - 1)}>{curItem}</span>
                        )
                    }
                    {
                        this.eFont() && this.props.currentPage < this.props.pageCount - 4 
                        ? <span title={'1'}>...</span>
                        : ''
                    }
                    {
                        this.props.currentPage < 6 && this.props.pageCount > 7
                        ? <span title={'2'}>...</span>
                        : ''
                    }
                    {
                        this.props.pageCount > 7 && this.props.currentPage < this.props.pageCount - 4 
                        ? <span className={this.state.currentIndex === this.props.pageCount ? styles.active : ''} onClick={() => this.handlePageChange(this.props.pageCount - 1)}>{this.props.pageCount}</span> 
                        : ''
                    }
                    
                    <span onClick={this.jumpAfterOne}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </span>
                    <span onClick={this.jumpToBottom}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </span> 
                    <input type="text" value={this.state.jump_page} onChange={this.jumPageChange} />
                    <button onClick={this.jumpPage}>{intl.get('COM0010000003000F1').d('跳转')}</button>
                </div>
            </div>
        )
    }
}

export default Pagination
