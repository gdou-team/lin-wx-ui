import Request from "./core/Request";

import defaultConfig from "./default";

import CancelToken from "./cancel/CancelToken";

import Cancel, { isCancel } from "./cancel/Cancel";

import { extend, deepMerge } from "./helpers/utils";
import { RequestConfig } from "./types";

// 创建实例
function createInstance(config: RequestConfig) {
  const context = new Request(config);

  const instance = Request.prototype.request.bind(context);

  // es6中class的方法是不能被遍历的
  extend(instance, context);

  return instance;
}

const request = createInstance(defaultConfig as any);

// 创建一个新的实例
request.create = function (config: RequestConfig) {
  return createInstance(deepMerge(defaultConfig, config));
};

// 取消请求使用到的类
request.CancelToken = CancelToken;

request.Cancel = Cancel;

request.isCancel = isCancel;

request.all = function (promises) {
  return Promise.all(promises);
};

request.spread = function (callback) {
  return function (arr) {
    return callback(...arr);
  };
};

request.Request = Request;

export default request;
