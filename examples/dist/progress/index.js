var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { LinComponent } from "../common/component";
import { getRect } from "../common/utils";
LinComponent({
  classes: ["portion-class", "pivot-class"],
  props: {
    // 是否置灰
    inactive: {
      type: Boolean,
      value: false
    },
    // 进度百分比
    percentage: {
      type: Number,
      value: 0,
      observer: "setProgressWidth"
    },
    // 进度条粗细，默认单位为 px
    strokeWidth: {
      type: [String, Number]
    },
    // 是否显示进度文字
    showPivot: {
      type: Boolean,
      value: true
    },
    // 进度条颜色
    color: String,
    // 进度文字颜色
    textColor: String,
    // 轨道颜色
    trackColor: String,
    // 文字显示
    pivotText: {
      type: String,
      value: "",
      observer: "setProgressWidth"
    },
    // 文字背景色
    pivotColor: String
  },
  data: {
    // 进度条长度
    progressWidth: "0px",
    // 进度条文字位置
    pivotRight: "0px",
    // 置灰后的颜色
    grayColor: "rgb(202, 202, 202)"
  },
  methods: {
    // 设置进度条长度
    setProgressWidth() {
      let { percentage } = this.data;
      // 处理临界值
      if (percentage <= 0) {
        percentage = 0;
      } else if (percentage >= 100) {
        percentage = 100;
      }
      // 计算进度条长度
      const offsetWidth = this.progressWidth * (percentage / 100);
      this.setData({ progressWidth: `${offsetWidth}px` });
      wx.nextTick(() =>
        __awaiter(this, void 0, void 0, function* () {
          // 获取文字宽度
          const { width: pivotWidth } = yield getRect(
            this,
            ".lin-progress-pivot"
          );
          let pivotRight = 0;
          // 调整文字的位置
          if (offsetWidth + pivotWidth / 2 >= this.progressWidth) {
            // 超过进度条最长长度
            // 靠右放
            pivotRight = 0;
          } else if (offsetWidth <= pivotWidth / 2) {
            // 在开始的位置
            // 靠左显示
            pivotRight = offsetWidth - pivotWidth;
          } else {
            // 居中显示
            pivotRight = -(pivotWidth / 2);
          }
          this.setData({
            pivotRight: `${pivotRight}px`
          });
        })
      );
    }
  },
  beforeCreate() {
    this.progressWidth = 0;
  },
  mounted() {
    getRect(this, ".lin-progress").then((res) => {
      // 获取进度条整体宽度
      this.progressWidth = res.width;
      // 设置进度条宽度
      this.setProgressWidth();
    });
  }
});
