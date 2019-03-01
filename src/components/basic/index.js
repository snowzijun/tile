import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames'
import bem from '../../utils/bem'

export default class BaseComponent extends Component{
  name = 'base'
  static options = {
    addGlobalClass: true
  }
  constructor(){
    super(...arguments)
    this.classnames = this.classnames.bind(this)
  }
  // 生成类名
  classnames = function(){
    if(!this.__bem){
      this.__bem = bem('tile-'+this.name)
    }
    return classnames(this.__bem(...arguments))
  }
}