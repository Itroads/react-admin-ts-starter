import * as React from 'react'
import style from './table.less'

interface IProps {
  cols: any;                                   // 表头数据
  list: any;                                   // 表体数据
  clickTr: (index: number, value: any) => void;     // 点击表格行触发选中事件
  activeTr: number;                               // 选中表格行索引
  formatList?: (value: any, name: string) => void; // 表格显示数据格式化，可不需要
  checkedList?: string[];                           // checked列表
  onCheck?: (value: any, e: any) => void;    // checkbox功能
}

class Table extends React.Component<IProps, any> {
  // 获取宽度
  public getWidth(): number {
    let width: number = 0
    for (const col of this.props.cols) {
      width += col.view_width
    }
    return width
  }

  // 加载列表
  public loadKdgList(item: any): any {
    const list: any[] = [];
    if (this.props.onCheck) {
      list.push(
        <td key={-1} style={{ width: "60px" }}>
          <input type="checkbox" readOnly={true} onClick={this.props.onCheck.bind(this, item)} checked={this.props.checkedList.includes(item.id) ? true : false} />
        </td>
      )
    }
    this.props.cols.map((col: any, i: number) => {
      list.push(
        <td key={i} title={this.props.formatList ? this.props.formatList(item, col.col_name) : item[col.col_name]} style={{ width: `${col.view_width}px` }}>
          <span>{this.props.formatList ? this.props.formatList(item, col.col_name) : item[col.col_name]}</span>
        </td>
      )
    })
    return list
  }

  public render() {
    return (
      <table style={{ minWidth: `${this.getWidth()}px` }} className={`${style.table} sk-table`}>
        <thead className={'sk-table-header'}><tr>
          {
            this.props.onCheck && <th key={-1} style={{ width: "60px" }}>
              <span>选择</span><i />
            </th>
          }
          {(this.props.cols && this.props.cols.length > 0) ?
            this.props.cols.map((col: any) => {
              return (
                <th key={col.col_id} style={{ width: `${col.view_width}px` }}>
                  <span>{col.display}</span><i />
                </th>
              )
            }) : null}
        </tr></thead>
        <tbody className={'sk-table-body'}>
          {(this.props.list && this.props.list.length > 0) ?
            this.props.list.map((item: any, index: number) => {
              return (
                <tr key={index} className={this.props.activeTr === index ? 'sk-table-active' : ""} onClick={this.props.clickTr.bind(this, index, item)} >
                  {this.loadKdgList(item)}
                </tr>
              )
            }) : <tr><td><span>暂无相关知识</span></td></tr>}
        </tbody>
      </table>
    )
  }
}

export default Table
