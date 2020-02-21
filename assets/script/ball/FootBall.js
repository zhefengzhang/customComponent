cc.Class({
    extends: require("./Ball"),

    properties: {
        areYouJoin: {
            default: true,
            tooltip: "你要参加球类比赛么？",
            notify: function () {
                this.showLog();
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:
  
    // onLoad () {},

    showLog () {
        if  (this.areYouJoin) {
            cc.log(`我参加 ${this.node.name}。时间：${new Date()}`);
        }
        else {
            cc.log(`我不参加 ${this.node.name}。时间：${new Date()}`);
        }
    }

  });
  