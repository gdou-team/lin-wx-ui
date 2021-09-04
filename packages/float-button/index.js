import { BLUE, WHITE } from '../common/color';
import { addUnit } from '../common/utils';
const defaultStyle = {
  bgColor: BLUE,
  iconSize: '60rpx',
  fontSize: '34rpx',
  color: WHITE
};

Component({
  name: 'FloatButton',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'group-class',
    'item-class',
    'button-class',
    'text-class'
  ],
  properties: {
    // 悬浮按钮列表
    btnList: {
      type: Array,
      default: [],
      observer: 'onListChange'
    },
    // 是否在点击选项后关闭
    closeOnClickMask: {
      type: Boolean,
      value: false
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true
    },
    // 悬浮按钮距离底部距离
    bottom: {
      type: [String, Number],
      value: '80rpx'
    },
    // 悬浮按钮距离右边距离
    right: {
      type: [String, Number],
      value: '80rpx'
    },
    // 层级
    zIndex: {
      type: Number,
      value: 100
    },
    // 背景色
    bgColor: {
      type: String
    },
    // 是否使用自定义插槽
    useSlot: {
      type: Boolean,
      default: false
    }
  },
  data: {
    list: [],
    // 是否显示按钮列表
    show: false
  },
  methods: {
    onListChange() {
      // 构建按钮列表数据，跟默认配置进行合并
      const { btnList = [] } = this.properties;
      const list = [];
      btnList.forEach((item) => {
        const obj = {
          ...defaultStyle,
          ...item
        };
        obj.iconSize = addUnit(obj.iconSize);
        obj.fontSize = addUnit(obj.fontSize);
        list.push(obj);
      });
      this.setData({ list });
    },
    // 点击悬浮按钮，切换按钮列表是否显示
    switchStatus() {
      const { show } = this.data;
      this.setData({ show: !show });
      if (show) {
        this.triggerEvent('hide');
      } else {
        this.triggerEvent('show');
      }
    },
    // 点击按钮列表中的按钮
    onItemClick(event) {
      const { item } = event.currentTarget.dataset;
      this.triggerEvent('click', item);
      this.switchStatus();
    },
    // 点击遮罩层
    onMaskClick() {
      const { closeOnClickMask } = this.properties;
      if (closeOnClickMask) {
        this.switchStatus();
      }
    }
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {}
});