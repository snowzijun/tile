import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { TilePopup, TileButton, TileActionSheet, TileIcon , TileNotify, TileDialog} from 'tile-ui'
import './index.scss'


export default class Index extends Component {

  constructor(){
    super(...arguments)
    this.state={
      show: false,
      actions: [{
        text: '选项1',
        disabled: false
      },{
        text: '选项2'
      },{
        text: '选项3',
        disabled: true
      }]
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
   }
  
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick(e){
    // this.setState({
    //   show: true
    // })
    this.noticeInstance.show()
  }
  handleClose(){
    this.setState({
      show: false
    })
  }
  bindInstance(instance){
    this.noticeInstance = instance
  }
  handleSelect(index,action){
    console.log(index,action)
  }
  beforeClose(){
    console.log(11111111111)
    return Promise.reject()
  }
  render () {
    const { show, actions } = this.state
    return (
      <View className='index'>

        <TileButton text='按钮' type='primary' plain size='large' block onClick={this.handleClick.bind(this)}></TileButton>
        {/* <TilePopup position='bottom' show={show} overlay onClose={this.handleClose.bind(this)}>
          <Text>都是对的所多所多所</Text>
        </TilePopup> */}
        {/* <TileActionSheet actions={actions} show={show} title='选择' cancelText='取消'
          onClose={this.handleClose.bind(this)} 
          onSelect={this.handleSelect.bind(this)}
        ></TileActionSheet> */}
        <TileIcon name='baocun'></TileIcon>
        <TileNotify message='这是一个测试消息' getInstance={this.bindInstance.bind(this)}></TileNotify>
        <TileDialog show={show} title='标题' onBeforeClose={this.beforeClose.bind(this)} showCancelButton onCancel={this.handleClose.bind(this)}>
           <View>dsdsdsdsds</View>
           <View>dsdsdsdsds</View>
           <View>dsdsdsdsds</View>
           <View>dsdsdsdsds</View>
          
        </TileDialog>
        <View style='height:200vh'></View>
      </View>
    )
  }
}

