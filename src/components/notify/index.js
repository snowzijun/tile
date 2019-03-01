import Taro from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import BaseComponent from '../basic/index'

export default class TileNotify extends BaseComponent{
  name='notify'
  static defaultProps = {
    message: '',
    duration: 2000,
    color: null,
    background: null,
    type: 'normal'
  }
  static propTypes = {
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    color: PropTypes.string,
    background: PropTypes.string,
    type: PropTypes.oneOf(['normal','info','warning','success','error']),
    //关闭事件
    onClose: PropTypes.func,
    // 获取组件的对外暴露的实例
    getInstance: PropTypes.func,
    onClick: PropTypes.func
  }

  constructor(){
    super(...arguments)
    this.state = {
      show: false
    }
    this._createInstance()
  }
  
  componentWillMount() {
    
  }

  componentWillReceiveProps(nextProps){
    // 如果getInstance 和 duration变化了，需要更新内容
    const {getInstance, duration} = nextProps
    if(getInstance !== this.props.getInstance || duration !== this.props.duration){
      this._createInstance(nextProps)
    }
  }

  _createInstance(props) {
    const { getInstance, duration ,onClose} = props || this.props
    if(getInstance && typeof getInstance === 'function') {
      let timer = null
      //关闭
      const close = () => {
        that.setState({
          show: false
        })
        if(timer !== null) {
          clearTimeout(timer)
          timer = null
        }
        onClose && onClose()
      }
      const that = this
      getInstance({
        show:() => {
          that.setState({
            show: true
          })
          timer = setTimeout(() => {
            close()
          },duration)
        },
        hide:() => {
         close()
        }
      })
    }
  }

  handleClick(){
    const { onClick } = this.props
    onClick && onClick()
  }

  render(){
    const {message,  color, background, type} = this.props
    const { show } = this.state
    return (
      <View className={this.classnames([type,{ show }])} style={{color,background}} onClick={this.handleClick.bind(this)}>
        <Text className={this.classnames('text')}>{message}</Text>
      </View>
    )
  }
}
