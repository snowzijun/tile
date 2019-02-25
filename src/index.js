import Taro from '@tarojs/taro'

Taro.initPxTransform({ designWidth: 750 })

export { default as TileButton } from './components/button/index'
export { default as TilePopup } from './components/popup/index'
export { default as TileActionSheet } from './components/actionsheet/index'
export { default as TileActionSheetItem} from './components/actionsheet/item/index'