Page({
  /**
   * 页面的初始数据
   */
  data: {
    items1: [
      {
        text: "浙江",
        children: [
          {
            text: "杭州",
            id: 1
          },
          {
            text: "温州",
            id: 2
          },
          {
            text: "宁波",
            id: 3,
            disabled: true
          },
          {
            text: "义乌",
            id: 4
          }
        ]
      },
      {
        text: "江苏",
        children: [
          {
            text: "南京",
            id: 5
          },
          {
            text: "无锡",
            id: 6
          },
          {
            text: "徐州",
            id: 7
          },
          {
            text: "苏州",
            id: 8
          }
        ]
      },
      {
        text: "福建",
        disabled: true,
        children: [
          {
            text: "泉州",
            id: 9
          },
          {
            text: "厦门",
            id: 10
          }
        ]
      }
    ],
    mainActiveIndex1: 0,
    activeId1: null,

    mainActiveIndex2: 1,
    activeId2: [],
    max: 2,

    mainActiveIndex3: 0,
    activeId3: null,
    items3: [
      {
        text: "分组1"
      },
      {
        text: "分组2"
      }
    ],

    mainActiveIndex4: 0,
    activeId4: null,
    items4: [
      {
        text: "浙江",
        badge: 3,
        children: [
          {
            text: "杭州",
            id: 1
          },
          {
            text: "温州",
            id: 2
          },
          {
            text: "宁波",
            id: 3
          },
          {
            text: "义乌",
            id: 4
          }
        ]
      },
      {
        text: "江苏",
        dot: true,
        children: [
          {
            text: "南京",
            id: 5
          },
          {
            text: "无锡",
            id: 6
          },
          {
            text: "徐州",
            id: 7
          },
          {
            text: "苏州",
            id: 8
          }
        ]
      },
      {
        text: "福建",
        children: [
          {
            text: "泉州",
            id: 9
          },
          {
            text: "厦门",
            id: 10
          }
        ]
      }
    ]
  },

  onClickNav1({ detail = {}, currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData({
      [index]: detail.index || 0
    });
  },

  onClickItem1({ detail = {}, currentTarget }) {
    const { key } = currentTarget.dataset;
    const activeId = this.data[key] === detail.id ? null : detail.id;
    this.setData({
      [key]: activeId
    });
  },
  onClickNav2({ detail = {} }) {
    this.setData({
      mainActiveIndex2: detail.index || 0
    });
  },

  onClickItem2({ detail = {} }) {
    const { activeId2 } = this.data;

    const index = activeId2.indexOf(detail.id);
    if (index > -1) {
      activeId2.splice(index, 1);
    } else {
      activeId2.push(detail.id);
    }

    this.setData({
      activeId2
    });
  }
});
