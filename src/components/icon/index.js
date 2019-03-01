import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Text, Image} from '@tarojs/components'
import BaseComponent from '../basic/index'

export default class TileIcon extends BaseComponent{
  name = 'icon'
  static defaultProps = {
    color: '',
    size: 24,
    prefix: 'tileicon'
  }

  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    prefix: PropTypes.string,
    name: PropTypes.string.isRequired
  }

  constructor(){
    super(...arguments)
  }

  handleClick(){
    const {onClick} = this.props
    onClick && onClick()
  }

  render(){
    const {color, size, prefix ,name} = this.props
    const style = {
      fontSize: Taro.pxTransform(parseInt(size) * 2),
      color
    }
    return (
      <Text 
        className={`${this.classnames()} ${prefix} ${prefix}-${name}`} 
        style={style}
        onClick={this.handleClick.bind(this)}
      ></Text>
    )
  }
}