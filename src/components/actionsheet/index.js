import Taro from '@tarojs/taro'
import { TilePopup, TileButton, TileActionSheetItem } from 'tile'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import BaseComponent from '../basic/index'
import './index.scss'

export default class TileActionSheet extends BaseComponent{
  name='actionsheet'
  static defaultProps = {
    title: '',
    actions: [],
    cancelText: '',
    overlay: true,
    closeOnClickOverlay: true,
    show: false
  }
  /**
   * actions:[{
   *   text: '',
   *   disabled: boolean // 是否禁用
   * }]
   */
  static propTypes= {
    title: PropTypes.string,
    actions: PropTypes.array,
    cancelText: PropTypes.string,
    overlay: PropTypes.bool,
    closeOnClickOverlay: PropTypes.bool,
    show: PropTypes.bool
  }
  constructor(){
    super(...arguments)
    this.state = {
      open : this.props.show || false
    }
  }

  componentWillReceiveProps(nextProps) {
    const {show} = nextProps
    if(this.props.show !== show) {
      this.setState({
        open: show
      })
    }
  }

  handleClose(){
    const {onClose} = this.props
    onClose && onClose()
    this.setState({
      open: false
    })
  }
  
  handleSelectItem(index, action){
    const {onSelect} = this.props
    onSelect && onSelect(index,action)
    // 调用关闭函数，用于用户外部修改show 属性
    this.handleClose()
  }

  render() {
    const { title, actions, cancelText, overlay, closeOnClickOverlay } = this.props
    const { open } = this.state
    const hasActions = actions && actions.length > 0
    return (
      <TilePopup 
        overlay={overlay} 
        closeOnClickOverlay={closeOnClickOverlay} 
        onClose={this.handleClose.bind(this)}
        position='bottom'
        className={
          this.classnames()
        }
        show={open}
      >
      {/**标题部分 */}
      {title && 
        <View className={
          this.classnames('title')
        }
        >
          {title}
        </View>
      }
      {/**列表部分 */}
      {
        hasActions ?<View className={
          this.classnames('content')
        }
        >
       {actions.map((action, index)=>{
         return <TileActionSheetItem
           text={action.text} 
           disabled={action.disabled || false} 
           key={index}
           onSelect={this.handleSelectItem.bind(this,index)}
         ></TileActionSheetItem>
       })}
     </View>:<View className={
          this.classnames('content')
        }
     >
       {this.props.children}
     </View>
      }
       
      {/**取消按钮部分 */}
      {cancelText && 
        <View className={
          this.classnames('footer')
        }
        >
          <TileButton text='取消'
            block
            onClick={this.handleClose.bind(this)}
          ></TileButton>
        </View>
      }
      </TilePopup>
    )
  }

}


