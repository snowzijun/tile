import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { TilePopup, TileButton, TileActionSheet } from 'tile'
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
    this.setState({
      show: true
    })
  }
  handleClose(){
    this.setState({
      show: false
    })
  }
  handleSelect(index,action){
    console.log(index,action)
  }
  render () {
    const { show, actions } = this.state
    return (
      <View className='index'>

        <TileButton text='按钮' type='primary' plain size='large' block onClick={this.handleClick.bind(this)}></TileButton>
        <Text className='tile-icon tile-icon-tishi'></Text>
        {/* <TilePopup position='bottom' show={show} overlay onClose={this.handleClose.bind(this)}>
          <Text>都是对的所多所多所</Text>
        </TilePopup> */}
        <TileActionSheet actions={actions} show={show} title='选择' cancelText='取消'
          onClose={this.handleClose.bind(this)} 
          onSelect={this.handleSelect.bind(this)}
        ></TileActionSheet>
        <View style='height:200vh'></View>
      </View>
    )
  }
}

