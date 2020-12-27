Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../GoodsActionButton/index": {
      type: "descendant",
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateChildren();
      },
    },
  },
  externalClasses: ["custom-class"],
  properties: {},
  data: {},
  methods: {
    updateChildren() {
      const children = this.children || [];
      const len = children.length;
      children.forEach((child, index) => {
        child.update(index, len);
      });
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
