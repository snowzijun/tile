import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import BaseComponent from '../basic'
import { handleTouchScroll } from '../../utils/utils.js'

// 基础的zIndex
let zIndex = 1000

const isPromise = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Promise]'
}

export default class TilePopup extends BaseComponent{
  name = 'popup'
  static defaultProps = {
    overlay: true,
    show: false,
    position: 'center',
    customStyle: '',
    overlayStyle: '',
    closeOnClickOverlay: true,
    onBeforeClose:() => {return Promise.resolve()}
  }
  static propTypes = {
    overlay: PropTypes.bool,
    show: PropTypes.bool,
    position: PropTypes.oneOf(['top','bottom','left','right','center']),
    customStyle: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    overlayStyle:  PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    closeOnClickOverlay: PropTypes.bool,
    onClose: PropTypes.func,
    // 支持promise和普通函数
    onBeforeClose: PropTypes.func
  }
  constructor(props){
    super(...arguments)
    this.setState({
      open: props.show || false
    })
  }
  handleClick(){
    const { closeOnClickOverlay = false } = this.props
    if( closeOnClickOverlay){
      this.closePopup()
    }
  }

  closePopup(){
    const close = () => {
      const {onClose} = this.props
      this.setState({
        open: false
      })
      onClose && onClose()
    }
    const { onBeforeClose = () => Promise.resolve() } = this.props
    debugger
    const result = onBeforeClose()
    if(isPromise(result)){
      result.then(() => {
        close()
      }).catch(()=>{})
    }else{
      if(result){
        close()
      }
    }
    
  }

  componentWillReceiveProps(nextProps){
    const { show } = nextProps;
    // 如果显示状态与传入的状态不一致，需要控制body的滚动条
    if( show !== this.props.show) {
      handleTouchScroll(show)
    }
    if(show != this.state.open){
      if(!show){
        this.closePopup()
      }else{
        this.setState({
          open: show
        })
      }
      
    }
  }

  render(){
    const { overlay, position, customStyle, overlayStyle } = this.props
    const { open = false } = this.state
    return (
      <View className={
        this.classnames([open && 'active'])}
        style={{zIndex: zIndex++}}
      >
        {overlay && <View 
          className={
            this.classnames('overlay')
          }
          style={overlayStyle}
          onClick={this.handleClick.bind(this)}
        ></View>}
        <View className={
          this.classnames('content',[position])
        }
          style={customStyle}
        >
          {this.props.children}
        </View>
      </View> 
    )
  }
}