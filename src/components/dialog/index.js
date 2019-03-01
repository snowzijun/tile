import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Text, ScrollView } from '@tarojs/components'
import { TilePopup, TileButton } from 'tile-ui' 
import BaseComponent from '../basic/index'


export default class TileDialog extends BaseComponent{
  name = 'dialog'
  static defaultProps = {
    show: false,
    title: null,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    overlay: true,
    closeOnclickOverlay: false,
    onBeforeClose:() => {return Promise.resolve()}
  }
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    showConfirmButton: PropTypes.bool,
    showCancelButton:PropTypes.bool,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    overlay: PropTypes.bool,
    closeOnclickOverlay: PropTypes.bool,
    beforeClose: PropTypes.func,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
  }
  constructor(){
    super(...arguments)
    this.state = {
      open: this.props.show
    }
  }

  componentWillReceiveProps(nextProps){
    const { show } = nextProps;
    if(show != this.state.open){
      this.setState({
        open: show
      })
    }
  }

  handleConfirm(){
    const { onConfirm } = this.props
    onConfirm && onConfirm()
  }
  handleCancel(){
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render(){
    const { title,
      showCancelButton,
      showConfirmButton,
      confirmButtonText,
      cancelButtonText,
      overlay,
      closeOnclickOverlay,
      onBeforeClose,
      onClose } = this.props
      const { open } = this.state
      const titleView = title && (
        <View className={this.classnames('title')}>
          <Text className={this.classnames('title-text')}>{title}</Text>
        </View>
      )
      const confirmButton = showConfirmButton &&
       <View className={
        this.classnames('button',['confirm'])
      }>
        <TileButton text={confirmButtonText} type='primary' block size='large' onClick={this.handleConfirm.bind(this)}></TileButton>
      </View>  
      const cancelButton = showCancelButton &&  
        <View className={
        this.classnames('button',['cancel'])
      } >
          <TileButton
            text={cancelButtonText} 
            block 
            size='large' 
            onClick={this.handleCancel.bind(this)}
          ></TileButton>
        </View>  


    return (
      <TilePopup 
        show={open} 
        overlay={overlay} 
        closeOnclickOverlay={closeOnclickOverlay} 
        onBeforeClose={onBeforeClose}
        onClose={onClose} 
      >
        <View className={this.classnames()}>
          {titleView}
          <ScrollView className={this.classnames('content')} scrollY>
            {this.props.children}
          </ScrollView> 
          {(showCancelButton|| showConfirmButton) && 
             <View className={this.classnames('buttons')}>
              {cancelButton}
              {confirmButton}
            </View> 
          }
        </View>
      </TilePopup>
    )
  }
}