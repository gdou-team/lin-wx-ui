const OpenTypeBehavior = Behavior({
  properties: {
    // 微信开放能力
    openType: String
  },

  methods: {
    // 用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo
    bindGetUserInfo(event: WechatMiniprogram.ButtonGetUserInfo) {
      this.triggerEvent("getuserinfo", event.detail);
    },
    // 客服消息回调
    bindContact(event: WechatMiniprogram.ButtonContact) {
      this.triggerEvent("contact", event.detail);
    },
    // 获取用户手机号回调
    bindGetPhoneNumber(event: WechatMiniprogram.ButtonGetPhoneNumber) {
      this.triggerEvent("getphonenumber", event.detail);
    },
    // 当使用开放能力时，发生错误的回调
    bindError(event: WechatMiniprogram.ButtonError) {
      this.triggerEvent("error", event.detail);
    },
    // 打开 APP 成功的回调
    bindLaunchApp(event: WechatMiniprogram.ButtonLaunchApp) {
      this.triggerEvent("launchapp", event.detail);
    },
    // 在打开授权设置页后回调
    bindOpenSetting(event: WechatMiniprogram.ButtonOpenSetting) {
      this.triggerEvent("opensetting", event.detail);
    }
  }
});

export default OpenTypeBehavior;