import Taro from '@tarojs/taro'
import './styles/index.scss'

Taro.initPxTransform({ designWidth: 750 })

export { default as TileButton } from './components/button/index'
export { default as TilePopup } from './components/popup/index'
export { default as TileActionSheet } from './components/actionsheet/index'
export { default as TileActionSheetItem} from './components/actionsheet/item/index'
export { default as TileIcon } from './components/icon/index'
export { default as TileNotify } from './components/notify/index'
export { default as TileDialog } from './components/dialog/index'