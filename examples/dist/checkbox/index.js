import { LinComponent } from "../common/component";
const shapeValue = "round";
LinComponent({
  field: true,
  classes: ["icon-class", "label-class"],
  relation: {
    type: "ancestor",
    name: "checkbox-group"
  },
  props: {
    // 是否为选中状态
    value: Boolean,
    // 是否禁用单选框
    disabled: Boolean,
    // 形状
    shape: {
      type: String,
      options: ["round", "square"],
      value: shapeValue
    },
    // 选中状态颜色
    checkedColor: String,
    // icon 图标大小
    iconSize: {
      type: [String, Number],
      value: "40rpx"
    },
    // 是否使用 icon slot
    useIconSlot: Boolean,
    // 是否禁用单选框内容点击
    labelDisabled: Boolean,
    // 标识 Checkbox 名称
    name: {
      type: null
    }
  },
  watch: {
    // 监听数据变化
    "value,shape": function (value, shape) {
      let iconName = shape;
      if (value) {
        // 选中状态的图标需要加个active
        iconName = `${iconName}-active`;
      }
      this.setData({
        iconName
      });
    }
  },
  data: {
    // 图标名称
    iconName: shapeValue,
    // 记录CheckboxGroup的disabled属性
    parentDisabled: false
  },
  methods: {
    // 切换状态
    toggle() {
      if (this.data.disabled || this.data.parentDisabled) {
        return;
      }
      // 发射事件
      this.emitChange();
    },
    // 点击文本
    onLabelClick() {
      if (
        this.data.disabled ||
        this.data.parentDisabled ||
        this.data.labelDisabled
      ) {
        return;
      }
      this.emitChange();
    },
    // 发射change事件
    emitChange() {
      if (this.parent) {
        // 存在CheckboxGroup父元素，则由父元素发射事件
        this.setParentValue(!this.data.value);
      } else {
        this.triggerEvent("change", !this.data.value);
      }
    },
    // 设置父元素的值
    setParentValue(value) {
      // 获取父元素的绑定值
      let { value: parentValue } = this.parent.data;
      const { max } = this.parent.data;
      // 浅拷贝一份
      parentValue = parentValue.slice();
      const { name } = this.data;
      if (value) {
        // 选中状态
        if (max && parentValue.length >= max) {
          // 超出最大可选数量
          return;
        }
        if (parentValue.indexOf(name) === -1) {
          // 父亲绑定值没有包含当前的name值，则需要push进去
          parentValue.push(name);
          // 父元素发射事件
          this.parent.emitChange(parentValue);
        }
      } else {
        // 没有选择中状态
        const index = parentValue.findIndex((item) => item === name);
        if (index > -1) {
          // 删除对应的值
          parentValue.splice(index, 1);
          this.parent.emitChange(parentValue);
        }
      }
    }
  }
});
