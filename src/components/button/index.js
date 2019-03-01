import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Button, View } from '@tarojs/components'
import BaseComponent from '../basic'



export default class TailButton extends BaseComponent{
  name = 'button'
  static defaultProps = {
    type: 'default',
    size: 'normal',
    text: '',
    plain: false,
    square: true,
    round: false,
    disabled: false,
    block: false
  }

  static propTypes = {
    type: PropTypes.oneOf(['primary','wraning','danger','default']),
    size: PropTypes.oneOf(['large','small','mini','normal']),
    text: PropTypes.string,
    // 是否为朴素按钮
    plain: PropTypes.bool,
    // 是否为方形按钮
    square: PropTypes.bool,
    //是否为圆角按钮
    round: PropTypes.bool,
    // 是否禁用按钮
    disabled: PropTypes.bool,
    // 是否为块按钮
    block: PropTypes.bool
  }

  handleClick(e){
    const { onClick } = this.props
    onClick && onClick(e)
  }

  render() {
    const {type,size,text,plain,square,round,disabled, block} = this.props
    return (
      <View className={
        this.classnames('warp')
        }
      >
        <Button className={
          this.classnames([size,type,{
            plain,
            square,
            round,
            disabled,
            block
          }])
        }
          disabled={disabled}
          onClick={
            this.handleClick.bind(this)
          }
        >{text}</Button>
      </View>
    )
  }
}