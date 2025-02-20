import { LinComponent } from "../common/component";

import { BLUE, WHITE } from "../common/color";

LinComponent({
  field: true,
  classes: ["node-class"],
  props: {
    // 开关选中状态
    checked: {
      type: Boolean,
      value: false,
      observer: "updateValue"
    },
    // 在表单内提交时的标识符
    name: String,
    // 打开时的背景色
    activeColor: {
      type: String,
      value: BLUE
    },
    // 关闭时的背景色
    inactiveColor: {
      type: String,
      value: WHITE
    },
    // 打开时的值
    activeValue: {
      type: null,
      value: true
    },
    // 关闭时的值
    inactiveValue: {
      type: null,
      value: false
    },
    // 是否禁用
    disabled: Boolean,
    // 是否为加载状态
    loading: Boolean,
    // 开关尺寸
    size: {
      type: [String, Number]
    }
  },
  data: {
    // form表单提交的时候的value值
    value: false
  },
  methods: {
    // 点击组件
    onClick() {
      const { disabled, checked } = this.data;
      if (disabled) {
        return;
      }
      this.triggerEvent("change", !checked);
    },
    // 更新value值
    updateValue() {
      const { checked, activeValue, inactiveValue } = this.data;
      if (checked) {
        this.setData({
          value: activeValue
        });
      } else {
        this.setData({
          value: inactiveValue
        });
      }
    }
  },
  mounted() {
    this.updateValue();
  }
});
