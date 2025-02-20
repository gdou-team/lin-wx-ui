import { getSystemInfoSync } from "./utils";

// 对比版本号
// https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html
function compareVersion(v1: string, v2: string) {
  const v1Arr = v1.split(".");
  const v2Arr = v2.split(".");
  const len = Math.max(v1Arr.length, v2Arr.length);

  while (v1Arr.length < len) {
    v1Arr.push("0");
  }
  while (v2Arr.length < len) {
    v2Arr.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1Arr[i], 10);
    const num2 = parseInt(v2Arr[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

// 能否使用双向数据绑定
export function canIUseModel() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, "2.9.3") >= 0;
}

// 能否使用内置的表单行为
export function canIUseFormFieldButton() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, "2.10.3") >= 0;
}

// 能否全屏预览视频
export function canIUsePreviewMedia() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, "2.12.0") >= 0;
}
