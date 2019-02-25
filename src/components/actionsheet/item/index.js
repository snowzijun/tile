import Taro  from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import BaseComponent from '../../basic/index'
import './index.scss'

export default class TileActionSheetItem extends BaseComponent{
  name='actionsheetitem'
  static defaultProps = {
    text: '',
    disabled: false
  }

  static propTypes = {
    text: PropTypes.string,
    disabled: PropTypes.bool
  }

  constructor(){
    super(...arguments)
  }
  handleClick(){
    const {disabled = false, onSelect,text} = this.props
    if(!disabled && onSelect){
      onSelect({
        text,
        disabled
      })
    }
  }
  render(){
    const {text, disabled} = this.props
    return (
      <View className={
        this.classnames({
          disabled
        })
      }
        onClick={this.handleClick.bind(this)}
      >
        {text ?<View className={
          this.classnames('content')
        }  
        >{text}</View> : <View className={
          this.classnames('content')
        }
        >
          {this.props.children}
        </View>}
        
      </View>
    )
  }
}

