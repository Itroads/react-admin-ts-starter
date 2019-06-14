import * as React from 'react'
import styles from './vitalityCapsule.less';

interface ICapsule {
  term: string;
  number: number;
  [key: string]: any;
}

interface IProps {
  data: ICapsule[];
  max?: number; // 最大宽度，系统最小 100
  min?: number; // 最小宽度，系统最小 100
  dec?: number; // 每次递减的差值
  fontSize?: number | string; // 数字代表字体大小，'auto' 代表随胶囊大小变化 高度 * 0.3
  clickFn?: any; // 父页面的方法
}

interface IRgb {
  r: number;
  g: number;
  b: number;
}

interface ISize {
  width: number;
  height: number;
}

class VitalityCapsule extends React.Component<IProps, any> {

  // 默认值
  private MaxWidth = 200;
  private MinWidth = 100;
  private Dec = 10;

  // 生成背景色和前景色
  // 根据点击数量 number 生成每个胶囊的：宽，高，字体大小
  // 最小尺寸：宽：100px， 高：25px
  public getRandomStyle = (currentItem: ICapsule, data: ICapsule[]) => {

    // 默认最大宽度 200px ，逐级缩小 10px, 高度缩小 3
    // 可以配置，胶囊的宽度范围，每级递减的数量
    // 当递减到最小宽度附近，之后的全部以最小尺寸显示
    // 系统限制，最小为 100px

    const randomRgb = this.getRandomColor();
    const grayLevel = this.getGrayLevel(randomRgb);
    const size = this.getCapsuleSize(currentItem, data)

    return {
      background: `rgb(${randomRgb.r},${randomRgb.g},${randomRgb.b})`,
      color:  grayLevel > 0.5 ? 'black' : 'white',
      width: size.width + 'px',
      height: size.height + 'px',
      fontSize: this.props.fontSize && this.props.fontSize !== 'auto' ? this.props.fontSize + 'px' : this.props.fontSize && this.props.fontSize === 'auto' ? Math.round(size.height*0.3) + 'px' : '13px'
    }
  }

  public getCapsuleSize = (currentItem: ICapsule, data: ICapsule[]): ISize => {
    let width = 0;
    let height = 0;

    // 需要 输入当前数据，获取到，这个数据在所有数据中的级别
    const {level, arrSorted} = this.getCurrentLevel(currentItem, data)

    // 需要 通过热词数组，来生成一个数组，不同级别的对应尺寸
    const sizeLevelArray = this.getLevelSizeArray(arrSorted.length)

    const currentWidth = sizeLevelArray[level]

    width = currentWidth;
    height = Math.round(currentWidth/4)

    return {
      width, height
    }
  }

  // 返回一个当前项，在整个数组中的级别，下标代表级别
  public getCurrentLevel = (currentItem: ICapsule, data: ICapsule[]) => {
    let level = 0;
    let arrSorted = []

    // 提取对象数组中的数字
    for(const item of data) {
      arrSorted.push(item.number)
    }

    function sortNumber(a: number, b: number){
      return b - a
    }

    // 去重
    arrSorted = this.uniq(arrSorted)
    
    // 排序，从大到小
    arrSorted.sort(sortNumber)

    level = arrSorted.indexOf(currentItem.number)
    
    return {level, arrSorted}
  }

  public getLevelSizeArray = (levelCount: number): number[] => {
    const levelSizeArray: number[] = []
    const maxWidth = this.props.max && this.props.max >= this.MinWidth ? this.props.max : this.MaxWidth
    const minWidth = this.props.min && this.props.min >= this.MinWidth ? this.props.min : this.MinWidth
    const dec = this.props.dec ? this.props.dec : this.Dec

    // 最大值不够做一次差值运算，所有尺寸均为最大值
    if(maxWidth < minWidth + dec && maxWidth > minWidth) {
      for(let i = 0; i < levelCount; i++) {
        levelSizeArray.push(maxWidth)
      }
    } else {
      // 每次做差值，当小于最小值时，以最小值存入数组
      for(let i = 0; i < levelCount; i++) {
        const levelSize = maxWidth - (i * dec)
        if(levelSize >= minWidth) {
          levelSizeArray.push(levelSize)
        } else {
          levelSizeArray.push(minWidth)
        }
      }
    }

    return levelSizeArray
  }

  // 数组去重
  public uniq = (array: any) => {
    const temp = []; // 一个新的临时数组
    for(const item of array){
        if(temp.indexOf(item) === -1){
            temp.push(item);
        }
    }
    return temp;
  }

  // 生成随机 rgb 颜色
  public getRandomColor = () => {

    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);

    return {
      r,g,b
    }
  }

  // 根据rgb，计算灰度
  public getGrayLevel = (color: IRgb) => {
    return (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
  }

  // 触发父页面的方法
  public toParentFn = () => {
    if(this.props.clickFn) {
      this.props.clickFn()
    }
  }

  public render() {
    return(
      <div className={styles.container}>
        {
          this.props.data.map((currentItem, index, data) => 
            <div key={index} className={styles.capsule} style={this.getRandomStyle(currentItem, data)} onClick={this.toParentFn}>
              <span className={styles.term} title={currentItem.term}>
                {currentItem.term}
              </span>
             （
                <span className={styles.term} title={currentItem.number+""}>
                  {currentItem.number + ''}
                </span>
              ）
            
            </div>
          )
        }
      </div>
    )
  }
}

export default VitalityCapsule